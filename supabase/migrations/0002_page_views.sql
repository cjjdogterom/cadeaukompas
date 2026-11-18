-- Bezoeken (zonder persoonsgegevens): geen IP, geen cookies. `visitor` is een dagelijks wisselende hash.
create table if not exists page_views (
  id bigint generated always as identity primary key,
  ts timestamptz not null default now(),
  day date not null default (now() at time zone 'Europe/Amsterdam')::date,
  path text not null,
  ref_host text,
  visitor text not null,
  device text
);
create index if not exists page_views_day_idx on page_views (day);
alter table page_views enable row level security; -- alleen de service-role (server) mag lezen en schrijven
