-- =====================================================
-- GOVERNANCE ENGINE SEED
-- =====================================================

-- =====================================================
-- ROLES
-- =====================================================

insert into roles (name)
values
  ('OWNER'),
  ('ADMIN'),
  ('EDITOR'),
  ('VIEWER'),
  ('BILLING_ADMIN')
on conflict (name) do nothing;

-- =====================================================
-- PERMISSIONS
-- =====================================================

insert into permissions (name)
values

('org.read'),
('org.update'),
('org.delete'),
('org.manage_members'),

('workspace.read'),
('workspace.create'),
('workspace.update'),
('workspace.delete'),

('project.read'),
('project.create'),
('project.update'),
('project.delete'),

('analytics.read'),

('billing.read'),
('billing.manage'),

('ai.generate'),

('audit.read'),

('system.admin')

on conflict (name) do nothing;

-- =====================================================
-- OWNER → ALL PERMISSIONS
-- =====================================================

insert into role_permissions (
  role_id,
  permission_id
)

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

insert into role_permissions (
  role_id,
  permission_id
)

select
  r.id,
  p.id

from roles r
join permissions p
on p.name in (

  'org.read',
  'org.update',
  'org.manage_members',

  'workspace.read',
  'workspace.create',
  'workspace.update',

  'project.read',
  'project.create',
  'project.update',
  'project.delete',

  'analytics.read',

  'billing.read',

  'ai.generate',

  'audit.read'

)

where r.name = 'ADMIN'

on conflict do nothing;

-- =====================================================
-- EDITOR PERMISSIONS
-- =====================================================

insert into role_permissions (
  role_id,
  permission_id
)

select
  r.id,
  p.id

from roles r
join permissions p
on p.name in (

  'workspace.read',

  'project.read',
  'project.create',
  'project.update',

  'analytics.read',

  'ai.generate'

)

where r.name = 'EDITOR'

on conflict do nothing;

-- =====================================================
-- VIEWER PERMISSIONS
-- =====================================================

insert into role_permissions (
  role_id,
  permission_id
)

select
  r.id,
  p.id

from roles r
join permissions p
on p.name in (

  'workspace.read',

  'project.read',

  'analytics.read'

)

where r.name = 'VIEWER'

on conflict do nothing;

-- =====================================================
-- BILLING ADMIN
-- =====================================================

insert into role_permissions (
  role_id,
  permission_id
)

select
  r.id,
  p.id

from roles r
join permissions p
on p.name in (

  'billing.read',
  'billing.manage',

  'org.read'

)

where r.name = 'BILLING_ADMIN'

on conflict do nothing;

-- =====================================================
-- GOVERNANCE INDEXES
-- =====================================================

create index if not exists idx_roles_name
on roles(name);

create index if not exists idx_permissions_name
on permissions(name);

create index if not exists idx_org_members_user
on organization_members(user_id);

create index if not exists idx_org_members_org
on organization_members(organization_id);

create index if not exists idx_role_permissions_role
on role_permissions(role_id);

create index if not exists idx_role_permissions_permission
on role_permissions(permission_id);
