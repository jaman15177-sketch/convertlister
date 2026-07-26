/*
===========================================================
READY PRODUCT LIBRARY

PRODUCT SNAPSHOTS

ROW LEVEL SECURITY

===========================================================
*/

------------------------------------------------------------
-- ENABLE RLS
------------------------------------------------------------

alter table product_snapshots
enable row level security;

------------------------------------------------------------
-- FORCE RLS
------------------------------------------------------------

alter table product_snapshots
force row level security;
