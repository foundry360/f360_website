-- Remove duplicate assessment submissions, then enforce uniqueness.
-- Keeps the earliest row (by created_at, then id) for each email + submitted_at pair.

delete from public.ai_readiness_results
where id in (
  select id
  from (
    select
      id,
      row_number() over (
        partition by contact_email, submitted_at
        order by created_at asc, id asc
      ) as row_num
    from public.ai_readiness_results
    where contact_email is not null
  ) ranked
  where row_num > 1
);

create unique index if not exists ai_readiness_results_email_submitted_at_uidx
  on public.ai_readiness_results (contact_email, submitted_at)
  where contact_email is not null;
