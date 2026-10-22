-- Batch 2 enquiry storage for the Next.js site.
--
-- Safe to run more than once. corporate_enquiries and its bucket were created
-- for the Lovable site in the same Supabase project; they are only created
-- here if missing. gift_card_enquiries is new.
--
-- Writes happen server-side with the service role key (Next.js API routes),
-- so RLS is enabled with no public policies: visitors cannot read or write
-- these tables directly.

create table if not exists public.corporate_enquiries (
  id uuid primary key default gen_random_uuid(),
  company text not null,
  contact_name text not null,
  email text not null,
  phone text,
  employees integer,
  move_in date,
  length_of_stay text,
  requirements text,
  pdf_path text,
  created_at timestamptz not null default now()
);

create index if not exists corporate_enquiries_email_created_idx
  on public.corporate_enquiries (email, created_at);

alter table public.corporate_enquiries enable row level security;

create table if not exists public.gift_card_enquiries (
  id uuid primary key default gen_random_uuid(),
  first_name text not null,
  surname text not null,
  phone text not null,
  email text not null,
  gift_for text,
  extras text[] not null default '{}',
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists gift_card_enquiries_email_created_idx
  on public.gift_card_enquiries (email, created_at);

alter table public.gift_card_enquiries enable row level security;

-- Private bucket for the optional requirements PDF (10 MB, PDF only).
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('corporate-requirements', 'corporate-requirements', false, 10485760, array['application/pdf'])
on conflict (id) do nothing;
