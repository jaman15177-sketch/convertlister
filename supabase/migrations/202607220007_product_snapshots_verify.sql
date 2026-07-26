/*
===========================================================
READY PRODUCT LIBRARY

PRODUCT SNAPSHOTS

VERIFICATION

===========================================================
*/

-- Table Exists

select
    table_name
from information_schema.tables
where table_name='product_snapshots';

-- Total Columns

select
    count(*)
from information_schema.columns
where table_name='product_snapshots';

-- RLS Enabled

select
    relname,
    relrowsecurity
from pg_class
where relname='product_snapshots';

-- Policies

select
    policyname
from pg_policies
where tablename='product_snapshots';

-- Indexes

select
    indexname
from pg_indexes
where tablename='product_snapshots';
