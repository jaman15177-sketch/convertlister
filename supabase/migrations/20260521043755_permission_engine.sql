-- =====================================================
-- EXTENSION
-- =====================================================

create extension if not exists "pgcrypto";

-- =====================================================
-- ROLES
-- =====================================================

create table if not exists roles (
  id uuid primary key default gen_random_uuid(),

  name text unique not null,

  created_at timestamptz default now()
);

-- =====================================================
-- PERMISSIONS
-- =====================================================

create table if not exists permissions (
  id uuid primary key default gen_random_uuid(),

  action text unique not null,

  created_at timestamptz default now()
);

-- =====================================================
-- ROLE → PERMISSION MAP
-- =====================================================

create table if not exists role_permissions (
  role_id uuid references roles(id) on delete cascade,

  permission_id uuid references permissions(id) on delete cascade,

  created_at timestamptz default now(),

  primary key (role_id, permission_id)
);

-- =====================================================
-- ORGANIZATION ROLE ASSIGNMENTS
-- =====================================================

create table if not exists organization_roles (
  id uuid primary key default gen_random_uuid(),

  organization_id uuid references organizations(id) on delete cascade,

  user_id uuid references auth.users(id) on delete cascade,

  role_id uuid references roles(id) on delete cascade,

  created_at timestamptz default now(),

  unique (organization_id, user_id)
);

-- =====================================================
-- WORKSPACE ROLE ASSIGNMENTS
-- =====================================================

create table if not exists workspace_roles (
  id uuid primary key default gen_random_uuid(),

  workspace_id uuid references workspaces(id) on delete cascade,

  user_id uuid references auth.users(id) on delete cascade,

  role_id uuid references roles(id) on delete cascade,

  created_at timestamptz default now(),

  unique (workspace_id, user_id)
);

-- =====================================================
-- INDEXES
-- =====================================================

create index if not exists idx_org_roles_org
on organization_roles(organization_id);

create index if not exists idx_org_roles_user
on organization_roles(user_id);

create index if not exists idx_workspace_roles_ws
on workspace_roles(workspace_id);

create index if not exists idx_workspace_roles_user
on workspace_roles(user_id);

-- =====================================================
-- ENABLE RLS
-- =====================================================

alter table roles enable row level security;

alter table permissions enable row level security;

alter table role_permissions enable row level security;

alter table organization_roles enable row level security;

alter table workspace_roles enable row level security;

-- =====================================================
-- SEED ROLES
-- =====================================================

insert into roles (name)
values
  ('OWNER'),
  ('ADMIN'),
  ('EDITOR'),
  ('VIEWER')
on conflict (name) do nothing;

-- =====================================================
-- SEED PERMISSIONS
-- =====================================================

insert into permissions (action)
values
  ('organization.read'),
  ('organization.manage'),

  ('workspace.read'),
  ('workspace.manage'),

  ('project.read'),
  ('project.create'),
  ('project.update'),
  ('project.delete')
on conflict (action) do nothing;

-- =====================================================
-- OWNER → ALL PERMISSIONS
-- =====================================================

insert into role_permissions (role_id, permission_id)

select
  r.id,
  p.id

from roles r
cross join permissions p

where r.name = 'OWNER'

on conflict do nothing;

-- =====================================================
-- ADMIN PERMISSIONS
-- =====================================================

insert into role_permissions (role_id, permission_id)

select
  r.id,
  p.id

from roles r
join permissions p
on true

where r.name = 'ADMIN'

and p.action in (
  'organization.read',
  'workspace.read',
  'workspace.manage',
  'project.read',
  'project.create',
  'project.update',
  'project.delete'
)

on conflict do nothing;

-- =====================================================
-- EDITOR PERMISSIONS
-- =====================================================

insert into role_permissions (role_id, permission_id)

select
  r.id,
  p.id

from roles r
join permissions p
on true

where r.name = 'EDITOR'

and p.action in (
  'workspace.read',
  'project.read',
  'project.create',
  'project.update'
)

on conflict do nothing;

-- =====================================================
-- VIEWER PERMISSIONS
-- =====================================================

insert into role_permissions (role_id, permission_id)

select
  r.id,
  p.id

from roles r
join permissions p
on true

where r.name = 'VIEWER'

and p.action in (
  'workspace.read',
  'project.read'
)

on conflict do nothing;
