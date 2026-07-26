-- =====================================================
-- ENABLE RLS (SAFETY LAYER)
-- =====================================================

alter table organizations enable row level security;
alter table organization_members enable row level security;
alter table workspaces enable row level security;
alter table workspace_members enable row level security;
alter table projects enable row level security;

-- =====================================================
-- ORGANIZATIONS POLICIES
-- =====================================================

create policy "org_select"
on organizations
for select
using (
  auth.uid() = owner_id
  OR exists (
    select 1 from organization_members om
    where om.organization_id = organizations.id
    and om.user_id = auth.uid()
  )
);

create policy "org_insert"
on organizations
for insert
with check (auth.uid() = owner_id);

create policy "org_update"
on organizations
for update
using (auth.uid() = owner_id);

create policy "org_delete"
on organizations
for delete
using (auth.uid() = owner_id);

-- =====================================================
-- ORGANIZATION MEMBERS
-- =====================================================

create policy "org_members_select"
on organization_members
for select
using (
  user_id = auth.uid()
  OR exists (
    select 1 from organizations o
    where o.id = organization_members.organization_id
    and o.owner_id = auth.uid()
  )
);

create policy "org_members_insert"
on organization_members
for insert
with check (
  exists (
    select 1 from organizations o
    where o.id = organization_members.organization_id
    and o.owner_id = auth.uid()
  )
);

-- =====================================================
-- WORKSPACES
-- =====================================================

create policy "workspace_select"
on workspaces
for select
using (
  exists (
    select 1 from organization_members om
    where om.organization_id = workspaces.organization_id
    and om.user_id = auth.uid()
  )
);

create policy "workspace_insert"
on workspaces
for insert
with check (
  exists (
    select 1 from organizations o
    where o.id = workspaces.organization_id
    and o.owner_id = auth.uid()
  )
);

-- =====================================================
-- WORKSPACE MEMBERS
-- =====================================================

create policy "workspace_members_select"
on workspace_members
for select
using (user_id = auth.uid());

create policy "workspace_members_insert"
on workspace_members
for insert
with check (
  exists (
    select 1 from workspaces w
    join organizations o on o.id = w.organization_id
    where w.id = workspace_members.workspace_id
    and o.owner_id = auth.uid()
  )
);

-- =====================================================
-- PROJECTS
-- =====================================================

create policy "projects_select"
on projects
for select
using (
  exists (
    select 1 from workspace_members wm
    where wm.workspace_id = projects.workspace_id
    and wm.user_id = auth.uid()
  )
);

create policy "projects_insert"
on projects
for insert
with check (auth.uid() = created_by);

create policy "projects_update"
on projects
for update
using (auth.uid() = created_by);

create policy "projects_delete"
on projects
for delete
using (auth.uid() = created_by);
