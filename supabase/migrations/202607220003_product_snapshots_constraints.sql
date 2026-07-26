/*
===========================================================
READY PRODUCT LIBRARY

PRODUCT SNAPSHOTS

CONSTRAINTS
===========================================================
*/

------------------------------------------------------------
-- STATUS
------------------------------------------------------------

alter table product_snapshots
add constraint chk_product_snapshots_status
check (
    status in (
        'READY',
        'ARCHIVED',
        'DISABLED'
    )
);

------------------------------------------------------------
-- SNAPSHOT VERSION
------------------------------------------------------------

alter table product_snapshots
add constraint chk_product_snapshots_snapshot_version
check (
    snapshot_version > 0
);

------------------------------------------------------------
-- SALE PRICE
------------------------------------------------------------

alter table product_snapshots
add constraint chk_product_snapshots_sale_price
check (
    sale_price > 0
);

------------------------------------------------------------
-- LISTING FEE
------------------------------------------------------------

alter table product_snapshots
add constraint chk_product_snapshots_listing_fee
check (
    listing_fee >= 1
    and
    listing_fee <= 20
);

------------------------------------------------------------
-- AI SCORE
------------------------------------------------------------

alter table product_snapshots
add constraint chk_product_snapshots_ai_score
check (
    ai_score >= 0
    and
    ai_score <= 100
);

------------------------------------------------------------
-- HEALTH SCORE
------------------------------------------------------------

alter table product_snapshots
add constraint chk_product_snapshots_health_score
check (
    health_score >= 0
    and
    health_score <= 100
);

------------------------------------------------------------
-- QUALITY
------------------------------------------------------------

alter table product_snapshots
add constraint chk_product_snapshots_quality_grade
check (

    quality_grade in (

        'ENTERPRISE'

    )

);

------------------------------------------------------------
-- TITLE
------------------------------------------------------------

alter table product_snapshots
add constraint chk_product_snapshots_title
check (

    length(trim(title)) > 0

);

------------------------------------------------------------
-- SOURCE MARKETPLACE
------------------------------------------------------------

alter table product_snapshots
add constraint chk_product_snapshots_source_marketplace
check (

    length(trim(source_marketplace)) > 0

);

------------------------------------------------------------
-- SOURCE PRODUCT ID
------------------------------------------------------------

alter table product_snapshots
add constraint chk_product_snapshots_source_product_id
check (

    length(trim(source_product_id)) > 0

);

------------------------------------------------------------
-- CURRENCY
------------------------------------------------------------

alter table product_snapshots
add constraint chk_product_snapshots_currency
check (

    length(currency)=3

);
