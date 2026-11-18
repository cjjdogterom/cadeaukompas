-- Bezoekteller: dagelijks wisselende, willekeurige salt voor de bezoekers-hash en opschoning na 12 maanden.
-- Compliance-hertoets 18-11, punt 18a/b. De salt van gisteren wordt bij de eerste aanroep van een nieuwe dag
-- verwijderd; daarna is de hash van gisteren niet meer terug te rekenen naar een IP-adres.

create table if not exists visitor_salts (
  day date primary key,
  -- 2 x uuid v4 = 244 bits toeval; gen_random_uuid() zit in Postgres zelf (geen extensie nodig).
  salt text not null default replace(gen_random_uuid()::text || gen_random_uuid()::text, '-', ''),
  created_at timestamptz not null default now()
);
alter table visitor_salts enable row level security; -- geen policies: alleen de service-role (server)

-- Geeft de salt van vandaag (Europe/Amsterdam). Maakt hem aan als hij nog niet bestaat en ruimt dan meteen op:
-- oudere salts weg, en bezoeken ouder dan 12 maanden weg (bewaartermijn privacyverklaring).
create or replace function page_view_salt()
returns table (salt_day date, salt_value text)
language plpgsql
security definer
set search_path = public
as $$
#variable_conflict use_column
declare
  today date := (now() at time zone 'Europe/Amsterdam')::date;
  inserted int;
begin
  insert into visitor_salts as v (day) values (today) on conflict (day) do nothing;
  get diagnostics inserted = row_count;
  if inserted > 0 then
    delete from visitor_salts v where v.day < today;
    delete from page_views p where p.day < (today - interval '12 months')::date;
  end if;
  return query select v.day, v.salt from visitor_salts v where v.day = today;
end;
$$;

revoke all on function page_view_salt() from public;
revoke all on function page_view_salt() from anon, authenticated;
grant execute on function page_view_salt() to service_role;
