-- Polynovea / Infrakinetic shared Early Access datastore
-- Apply this to the existing Supabase Postgres project once credentials are confirmed.
-- Public websites never receive the service-role key; both sites call server-side API routes.

create extension if not exists pgcrypto;

create table if not exists public.early_access_waitlist (
  id uuid primary key default gen_random_uuid(),
  product text not null,
  full_name text not null,
  email text not null,
  email_normalized text not null,
  company text not null,
  company_normalized text not null,
  role text,
  company_size text not null,
  timeline text not null,
  engines text[] not null default '{}',
  current_stack text,
  problem_statement text not null,
  source_site text not null check (source_site in ('polynovea', 'infrakinetic')),
  status text not null default 'waitlisted' check (
    status in ('waitlisted', 'reviewing', 'qualified', 'invited', 'onboarding', 'active', 'deferred', 'declined', 'duplicate', 'spam', 'withdrawn')
  ),
  explicit_opt_in boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists early_access_product_email_unique
  on public.early_access_waitlist (product, email_normalized);

create index if not exists early_access_product_status_idx
  on public.early_access_waitlist (product, status);

create index if not exists early_access_company_idx
  on public.early_access_waitlist (product, company_normalized);

alter table public.early_access_waitlist enable row level security;

-- No anon/authenticated policies are intentionally created. The website API uses the
-- Supabase service role server-side, so direct browser reads/writes remain closed.

create or replace view public.early_access_public_counts as
select
  product,
  count(distinct company_normalized)::bigint as count
from public.early_access_waitlist
where explicit_opt_in = true
  and status in ('waitlisted', 'reviewing', 'qualified', 'invited', 'onboarding', 'active')
group by product;

comment on table public.early_access_waitlist is
  'Explicit Early Access signups only. Briefing/contact leads must never be inserted into this table.';

comment on view public.early_access_public_counts is
  'Public-safe aggregate used by Polynovea and Infrakinetic counters. Counts distinct organisations, not raw form submissions.';
