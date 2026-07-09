create extension if not exists pgcrypto;

create table if not exists jobs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  company text not null,
  location text,
  status text not null default 'saved',
  fit_score integer check (fit_score between 0 and 100),
  source_url text,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists applications (
  id uuid primary key default gen_random_uuid(),
  job_id uuid not null references jobs(id) on delete cascade,
  stage text not null default 'draft',
  cv_text text,
  cover_letter_text text,
  reviewer_notes text,
  submitted_at timestamptz,
  outcome text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists jobs_status_created_at_idx on jobs(status, created_at desc);
create index if not exists applications_job_id_idx on applications(job_id);
