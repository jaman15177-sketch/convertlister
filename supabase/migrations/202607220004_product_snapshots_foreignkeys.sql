/*
===========================================================
READY PRODUCT LIBRARY

PRODUCT SNAPSHOTS

FOREIGN KEYS
===========================================================
*/

------------------------------------------------------------
-- ORGANIZATION
------------------------------------------------------------

alter table product_snapshots
add constraint fk_product_snapshots_organization
foreign key (organization_id)
references organizations(id)
on update cascade
on delete restrict;

------------------------------------------------------------
-- PRODUCT
------------------------------------------------------------

alter table product_snapshots
add constraint fk_product_snapshots_product
foreign key (product_id)
references products(id)
on update cascade
on delete restrict;

------------------------------------------------------------
-- FREEZE
------------------------------------------------------------
-- Uncomment only AFTER freeze table exists.

/*

alter table product_snapshots
add constraint fk_product_snapshots_freeze
foreign key (freeze_id)
references freezes(id)
on update cascade
on delete restrict;

*/

------------------------------------------------------------
-- APPROVAL
------------------------------------------------------------
-- Uncomment only AFTER approvals table exists.

/*

alter table product_snapshots
add constraint fk_product_snapshots_approval
foreign key (approval_id)
references approvals(id)
on update cascade
on delete set null;

*/
