-- ALN — Supabase (Postgres) schema.
-- Run this once in the Supabase SQL Editor (Dashboard → SQL Editor → New
-- query → paste → Run) against a fresh project. See AUTH.md for the full
-- setup walkthrough, including how to create member accounts afterwards.

-- ---------------------------------------------------------------------------
-- profiles — one row per member, linked 1:1 to a Supabase Auth user.
-- Login is by username in the UI, but Supabase Auth itself only knows email
-- addresses, so this table maps a username to an auth.users row and carries
-- the role. There's no self-service signup (same as the old PHP setup), so
-- there are no INSERT/UPDATE policies here — rows are added by hand in the
-- SQL Editor after creating the matching auth user (see AUTH.md).
-- ---------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  username text not null unique,
  role text not null default 'User' check (role in ('Admin', 'User')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can read their own profile"
  on public.profiles for select
  to authenticated
  using (auth.uid() = id);

-- Looks up the email for a username so the login form can accept a username
-- while still calling supabase.auth.signInWithPassword(), which needs an
-- email. security definer + a locked-down search_path let this read
-- auth.users (normally not queryable by anon/authenticated roles) without
-- exposing anything beyond the single matching email address.
create or replace function public.get_email_for_username(p_username text)
returns text
language sql
security definer
set search_path = public, auth
as $$
  select u.email
  from auth.users u
  join public.profiles p on p.id = u.id
  where p.username = p_username
  limit 1;
$$;

revoke all on function public.get_email_for_username(text) from public;
grant execute on function public.get_email_for_username(text) to anon, authenticated;

-- Used by network_members' write policies below. security definer so the
-- policy check doesn't re-trigger profiles' own RLS recursively.
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'Admin'
  );
$$;

-- ---------------------------------------------------------------------------
-- network_members — the Admin dashboard's network directory
-- (src/components/admin/network-members-table.tsx). Any authenticated
-- member can read it; only Admins can write. Matches the old
-- public/api/network-members.php behavior, now enforced by RLS instead of
-- PHP session checks.
-- ---------------------------------------------------------------------------
create table public.network_members (
  id bigint generated always as identity primary key,
  member text not null default '',
  country text not null,
  country_code char(2) not null,
  company text not null,
  url text not null default '',
  email text not null default '',
  phone text not null default '',
  logo_url text,
  image_url text,
  created_at timestamptz not null default now()
);

alter table public.network_members enable row level security;

create policy "Authenticated users can read network members"
  on public.network_members for select
  to authenticated
  using (true);

create policy "Admins can insert network members"
  on public.network_members for insert
  to authenticated
  with check (public.is_admin());

create policy "Admins can update network members"
  on public.network_members for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "Admins can delete network members"
  on public.network_members for delete
  to authenticated
  using (public.is_admin());

-- After creating this table, run database/seed-network-members.sql once to
-- load the existing directory (89 rows) into it.
