-- Run in Supabase SQL Editor or via Supabase CLI migrations.
create table if not exists public.ai_readiness_results (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  submitted_at timestamptz not null,
  overall_score smallint not null check (overall_score between 0 and 100),
  readiness_level text not null,
  strategy_score smallint not null check (strategy_score between 0 and 100),
  people_score smallint not null check (people_score between 0 and 100),
  process_score smallint not null check (process_score between 0 and 100),
  governance_score smallint not null check (governance_score between 0 and 100),
  technology_score smallint not null check (technology_score between 0 and 100),
  answers jsonb not null default '{}'::jsonb,
  results jsonb not null,
  contact_email text,
  contact_first_name text,
  contact_last_name text,
  organization text,
  organization_size text,
  title text,
  phone text
);

create index if not exists ai_readiness_results_created_at_idx
  on public.ai_readiness_results (created_at desc);

create index if not exists ai_readiness_results_readiness_level_idx
  on public.ai_readiness_results (readiness_level);

alter table public.ai_readiness_results enable row level security;
