create table audit_logs (
  id uuid primary key default gen_random_uuid(),

  organization_id uuid references organizations(id),

  actor_id uuid references auth.users(id),

  action text not null,

  entity_type text not null,

  entity_id uuid,

  metadata jsonb default '{}'::jsonb,

  ip_address text,

  created_at timestamptz default now()
);

create index idx_audit_org
on audit_logs(organization_id);

create index idx_audit_actor
on audit_logs(actor_id);

create index idx_audit_action
on audit_logs(action);

alter table audit_logs enable row level security;

create policy audit_logs_select
on audit_logs
for select
using (

  exists (
    select 1
    from organization_roles ur
    join roles r
      on r.id = ur.role_id

    where ur.organization_id = audit_logs.organization_id
    and ur.user_id = auth.uid()
    and r.name in ('OWNER', 'ADMIN')
  )

);
