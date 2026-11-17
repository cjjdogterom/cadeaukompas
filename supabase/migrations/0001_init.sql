-- OpTijdCadeau — initieel datamodel (17 nov 2026)
-- Uitvoeren in Supabase SQL editor of via `supabase db push`.
-- RLS staat aan; de site leest publiek alleen actieve producten. Schrijven gebeurt met de service-role-key (server/agents).

create extension if not exists "pgcrypto";

-- Leveranciers (dropship)
create table if not exists suppliers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  website text,
  country text not null default 'NL',
  delivery_days_min int not null default 1,
  delivery_days_max int not null default 3,
  integration text not null check (integration in ('api','feed','portal','email')),
  return_policy text,
  contract_status text not null default 'onderzoek' check (contract_status in ('onderzoek','aangemeld','actief','gestopt')),
  notes text,
  created_at timestamptz not null default now()
);

-- Producten (affiliate + dropship)
create table if not exists products (
  slug text primary key,
  title text not null,
  brand text,
  ean text,
  short text not null,
  description text not null,
  type text not null check (type in ('affiliate','dropship')),
  merchant text not null,
  merchant_url text not null,
  price_cents int not null check (price_cents >= 0),
  price_checked_at timestamptz,
  cost_cents int, -- inkoopprijs (alleen dropship)
  delivery_days_min int not null default 1,
  delivery_days_max int not null default 3,
  recipients text[] not null default '{}',
  age_groups text[] not null default '{}',
  interests text[] not null default '{}',
  occasions text[] not null default '{sinterklaas,kerst}',
  rating jsonb,
  image_url text,
  image_license text,
  sources text[] not null default '{}',
  status text not null default 'concept' check (status in ('concept','actief','gepauzeerd')),
  scout jsonb,
  supplier_id uuid references suppliers(id),
  link_last_checked_at timestamptz,
  link_last_status int,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists products_status_idx on products(status);
create index if not exists products_recipients_idx on products using gin(recipients);
create index if not exists products_interests_idx on products using gin(interests);

-- Uitgaande affiliate-klikken (geen persoonsgegevens; alleen na consent client-id)
create table if not exists outbound_clicks (
  id bigint generated always as identity primary key,
  product_slug text not null references products(slug),
  merchant text not null,
  source_path text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  experiment_id uuid,
  created_at timestamptz not null default now()
);
create index if not exists outbound_clicks_created_idx on outbound_clicks(created_at);

-- Orders (dropship)
create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  order_number text unique not null,
  status text not null default 'open' check (status in ('open','paid','failed','canceled','expired','forwarded','shipped','delivered','refund_requested','refunded')),
  mollie_payment_id text unique,
  email text not null,
  name text not null,
  phone text,
  street text not null,
  postal_code text not null,
  city text not null,
  country text not null default 'NL',
  subtotal_cents int not null,
  shipping_cents int not null default 0,
  total_cents int not null,
  vat_cents int not null,
  promised_delivery_date date,
  deadline_occasion text check (deadline_occasion in ('sinterklaas','kerst')),
  forwarded_at timestamptz,
  supplier_order_ref text,
  tracking_url text,
  shipped_at timestamptz,
  utm jsonb,
  experiment_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists order_items (
  id bigint generated always as identity primary key,
  order_id uuid not null references orders(id) on delete cascade,
  product_slug text not null references products(slug),
  supplier_id uuid references suppliers(id),
  quantity int not null check (quantity > 0),
  unit_price_cents int not null,
  unit_cost_cents int,
  vat_rate numeric(4,2) not null default 21.00
);

-- Advertenties
create table if not exists campaigns (
  id uuid primary key default gen_random_uuid(),
  channel text not null check (channel in ('google','meta','pinterest','tiktok','organic')),
  name text not null,
  budget_cents int not null default 0,
  status text not null default 'concept' check (status in ('concept','wacht_akkoord','live','gepauzeerd','gestopt')),
  owner_approved_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists experiments (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid references campaigns(id),
  hypothesis text not null,
  variant text not null,
  audience text,
  landing_path text,
  budget_cents int not null,
  starts_on date,
  ends_on date,
  success_criterion text not null,
  expected_margin_cents int, -- dropship: verwachte marge per order
  expected_commission_per_click_cents int, -- affiliate
  status text not null default 'concept' check (status in ('concept','wacht_akkoord','live','gestopt','opgeschaald','afgerond')),
  verdict text,
  verdict_reason text,
  created_at timestamptz not null default now()
);

create table if not exists experiment_metrics (
  experiment_id uuid not null references experiments(id) on delete cascade,
  day date not null,
  spend_cents int not null default 0,
  impressions int not null default 0,
  clicks int not null default 0,
  conversions int not null default 0,
  revenue_cents int not null default 0,
  commission_cents int not null default 0,
  primary key (experiment_id, day)
);

-- Beslissingslog (spiegel van ops/decisions.md)
create table if not exists decisions (
  id bigint generated always as identity primary key,
  decided_on date not null default current_date,
  decision text not null,
  reason text not null,
  owner_approved boolean,
  agent text,
  created_at timestamptz not null default now()
);

-- Klantenservice
create table if not exists support_tickets (
  id uuid primary key default gen_random_uuid(),
  channel text not null default 'email',
  email text,
  subject text,
  body text not null,
  order_id uuid references orders(id),
  status text not null default 'nieuw' check (status in ('nieuw','concept_klaar','wacht_akkoord','beantwoord','gesloten')),
  draft_reply text,
  created_at timestamptz not null default now()
);

-- RLS
alter table products enable row level security;
alter table suppliers enable row level security;
alter table outbound_clicks enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table campaigns enable row level security;
alter table experiments enable row level security;
alter table experiment_metrics enable row level security;
alter table decisions enable row level security;
alter table support_tickets enable row level security;

create policy "publiek leest actieve producten" on products for select using (status = 'actief');
-- Alle andere tabellen: geen publieke policies => alleen service-role.
