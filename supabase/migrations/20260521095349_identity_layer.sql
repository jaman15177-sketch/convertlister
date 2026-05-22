-- =====================================================
-- EXTENSIONS
-- =====================================================

create extension if not exists "pgcrypto";

-- =====================================================
-- PROFILES
-- =====================================================

create table if not exists profiles (

  id uuid primary key
  references auth.users(id)
  on delete cascade,

  email text unique,

  full_name text,

  avatar_url text,

  created_at timestamptz default now(),

  updated_at timestamptz default now()
);

-- =====================================================
-- ROLES
-- =====================================================

create table if not exists roles (

  id uuid primary key default gen_random_uuid(),

  name text unique not null,

  description text,

  created_at timestamptz default now()
);

-- =====================================================
-- PERMISSIONS
-- =====================================================

create table if not exists permissions (

  id uuid primary key default gen_random_uuid(),

  name text unique not null,

  description text,

  created_at timestamptz default now()
);

-- =====================================================
-- ROLE PERMISSIONS
-- =====================================================

create table if not exists role_permissions (

  id uuid primary key default gen_random_uuid(),

  role_id uuid
  references roles(id)
  on delete cascade,

  permission_id uuid
  references permissions(id)
  on delete cascade,

  created_at timestamptz default now(),

  unique(role_id, permission_id)
);

-- =====================================================
-- ORGANIZATION MEMBERS
-- =====================================================

create table if not exists organization_members (

  id uuid primary key default gen_random_uuid(),

  organization_id uuid
  references organizations(id)
  on delete cascade,

  user_id uuid
  references auth.users(id)
  on delete cascade,

  role_id uuid
  references roles(id)
  on delete set null,

  created_at timestamptz default now(),

  unique(organization_id, user_id)
);

-- =====================================================
-- AUTO PROFILE CREATION
-- =====================================================

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin

  insert into public.profiles (
    id,
    email,
    full_name,
    avatar_url
  )
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );

  return new;

end;
$$;

-- =====================================================
-- TRIGGER
-- =====================================================

drop trigger if exists on_auth_user_created
on auth.users;

create trigger on_auth_user_created

after insert on auth.users

for each row

execute function public.handle_new_user();

-- =====================================================
-- ENABLE RLS
-- =====================================================

alter table profiles enable row level security;

alter table roles enable row level security;

alter table permissions enable row level security;

alter table role_permissions enable row level security;

alter table organization_members enable row level security;

-- =====================================================
-- PROFILE POLICIES
-- =====================================================

create policy profiles_select
on profiles
for select
using (
  auth.uid() = id
);

create policy profiles_update
on profiles
for update
using (
  auth.uid() = id
);

-- =====================================================
-- ROLE POLICIES
-- =====================================================

create policy roles_select
on roles
for select
using (true);

create policy permissions_select
on permissions
for select
using (true);

create policy role_permissions_select
on role_permissions
for select
using (true);

-- =====================================================
-- MEMBERSHIP POLICY
-- =====================================================

create policy organization_members_select
on organization_members
for select
using (
  auth.uid() = user_id
);
