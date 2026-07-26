-- =====================================================
-- GOVERNANCE ENGINE SEED
-- =====================================================

-- =====================================================
-- ROLES
-- =====================================================

INSERT INTO roles (name)
VALUES
  ('OWNER'),
  ('ADMIN'),
  ('EDITOR'),
  ('VIEWER'),
  ('BILLING_ADMIN')
ON CONFLICT (name) DO NOTHING;

-- =====================================================
-- PERMISSIONS
-- =====================================================

INSERT INTO permissions (
    action,
    name
)
VALUES

('org.read', 'org.read'),
('org.update', 'org.update'),
('org.delete', 'org.delete'),
('org.manage_members', 'org.manage_members'),

('workspace.read', 'workspace.read'),
('workspace.create', 'workspace.create'),
('workspace.update', 'workspace.update'),
('workspace.delete', 'workspace.delete'),

('project.read', 'project.read'),
('project.create', 'project.create'),
('project.update', 'project.update'),
('project.delete', 'project.delete'),

('analytics.read', 'analytics.read'),

('billing.read', 'billing.read'),
('billing.manage', 'billing.manage'),

('ai.generate', 'ai.generate'),

('audit.read', 'audit.read'),

('system.admin', 'system.admin')

ON CONFLICT (action) DO NOTHING;
-- =====================================================
-- OWNER → ALL PERMISSIONS
-- =====================================================

INSERT INTO role_permissions (
    role_id,
    permission_id
)
SELECT
    r.id,
    p.id
FROM roles r
CROSS JOIN permissions p
WHERE r.name = 'OWNER'
ON CONFLICT DO NOTHING;

-- =====================================================
-- ADMIN PERMISSIONS
-- =====================================================

INSERT INTO role_permissions (
    role_id,
    permission_id
)
SELECT
    r.id,
    p.id
FROM roles r
JOIN permissions p
ON p.action IN (

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
WHERE r.name = 'ADMIN'
ON CONFLICT DO NOTHING;
-- =====================================================
-- EDITOR PERMISSIONS
-- =====================================================

INSERT INTO role_permissions (
    role_id,
    permission_id
)
SELECT
    r.id,
    p.id
FROM roles r
JOIN permissions p
ON p.action IN (

    'workspace.read',

    'project.read',
    'project.create',
    'project.update',

    'analytics.read',

    'ai.generate'

)
WHERE r.name = 'EDITOR'
ON CONFLICT DO NOTHING;

-- =====================================================
-- VIEWER PERMISSIONS
-- =====================================================

INSERT INTO role_permissions (
    role_id,
    permission_id
)
SELECT
    r.id,
    p.id
FROM roles r
JOIN permissions p
ON p.action IN (

    'workspace.read',

    'project.read',

    'analytics.read'

)
WHERE r.name = 'VIEWER'
ON CONFLICT DO NOTHING;
-- =====================================================
-- BILLING ADMIN
-- =====================================================

INSERT INTO role_permissions (
    role_id,
    permission_id
)
SELECT
    r.id,
    p.id
FROM roles r
JOIN permissions p
ON p.action IN (

    'billing.read',
    'billing.manage',

    'org.read'

)
WHERE r.name = 'BILLING_ADMIN'
ON CONFLICT DO NOTHING;

-- =====================================================
-- GOVERNANCE INDEXES
-- =====================================================

CREATE INDEX IF NOT EXISTS idx_roles_name
ON roles(name);

CREATE INDEX IF NOT EXISTS idx_org_members_user
ON organization_members(user_id);

CREATE INDEX IF NOT EXISTS idx_org_members_org
ON organization_members(organization_id);

CREATE INDEX IF NOT EXISTS idx_role_permissions_role
ON role_permissions(role_id);

CREATE INDEX IF NOT EXISTS idx_role_permissions_permission
ON role_permissions(permission_id);
