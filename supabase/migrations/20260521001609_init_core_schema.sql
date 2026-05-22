-- =====================================================
-- EXTENSIONS
-- =====================================================

create extension if not exists "pgcrypto";

-- =====================================================
-- ORGANIZATIONS (ROOT TENANT)
-- =====================================================

create table organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  owner_id uuid references auth.users(id) on delete cascade,
  created_at timestamptz default now()
);

create index idx_organizations_owner on organizations(owner_id);

-- =====================================================
-- ORGANIZATION MEMBERS
-- =====================================================

create table organization_members (
  id uuid primary key default gen_random_uuid(),

  organization_id uuid references organizations(id) on delete cascade,

  user_id uuid references auth.users(id) on delete cascade,

  role text not null default 'MEMBER',

  created_at timestamptz default now(),

  unique (organization_id, user_id)
);

create index idx_org_members_org on organization_members(organization_id);
create index idx_org_members_user on organization_members(user_id);

-- =====================================================
-- WORKSPACES
-- =====================================================

create table workspaces (
  id uuid primary key default gen_random_uuid(),

  organization_id uuid references organizations(id) on delete cascade,

  name text not null,

  created_at timestamptz default now()
);

create index idx_workspaces_org on workspaces(organization_id);

-- =====================================================
-- WORKSPACE MEMBERS
-- =====================================================

create table workspace_members (
  id uuid primary key default gen_random_uuid(),

  workspace_id uuid references workspaces(id) on delete cascade,

  user_id uuid references auth.users(id) on delete cascade,

  role text not null default 'EDITOR',

  created_at timestamptz default now(),

  unique (workspace_id, user_id)
);

create index idx_workspace_members_ws on workspace_members(workspace_id);
create index idx_workspace_members_user on workspace_members(user_id);

-- =====================================================
-- PROJECTS
-- =====================================================

create table projects (
  id uuid primary key default gen_random_uuid(),

  organization_id uuid references organizations(id) on delete cascade,

  workspace_id uuid references workspaces(id) on delete cascade,

  created_by uuid references auth.users(id),

  name text not null,

  status text not null default 'ACTIVE',

  created_at timestamptz default now()
);

create index idx_projects_org on projects(organization_id);
create index idx_projects_ws on projects(workspace_id);
create index idx_projects_created_by on projects(created_by);
create index idx_projects_status on projects(status);

-- =====================================================
-- ENABLE ROW LEVEL SECURITY
-- =====================================================

alter table organizations enable row level security;
alter table organization_members enable row level security;
alter table workspaces enable row level security;
alter table workspace_members enable row level security;
alter table projects enable row level security;
