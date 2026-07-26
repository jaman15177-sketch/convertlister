/*
===========================================================
READY PRODUCT LIBRARY

PRODUCT SNAPSHOTS

RLS POLICIES

Enterprise Security

===========================================================
*/

------------------------------------------------------------
-- READ
------------------------------------------------------------

create policy product_snapshots_read

on product_snapshots

for select

to authenticated

using (

    status='READY'

);

------------------------------------------------------------
-- INSERT
------------------------------------------------------------

create policy product_snapshots_insert

on product_snapshots

for insert

to service_role

with check (

    true

);

------------------------------------------------------------
-- UPDATE
------------------------------------------------------------

create policy product_snapshots_update

on product_snapshots

for update

to service_role

using (

    true

)

with check (

    true

);

------------------------------------------------------------
-- DELETE
------------------------------------------------------------

create policy product_snapshots_delete

on product_snapshots

for delete

to service_role

using (

    true

);
