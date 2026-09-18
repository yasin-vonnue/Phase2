# Day 10: Database Assessment

## Overview

Designed and implemented a PostgreSQL database for an Equipment Booking System

## Files

Day10/
├── schema.sql
├── seed.sql
├── queries.sql
├── transaction.sql
├── index.sql
├── reset.sql
├── README.md
└── er-diagram.png

## Tables

- employees
- categories
- equipment
- bookings
- approvals
- maintenance

## SQL Work

- Created primary keys and foreign keys.
- Added UNIQUE and CHECK constraints.
- Added seed data.
- Added 10 business queries.
- Used JOIN, LEFT JOIN, GROUP BY, HAVING and COUNT.
- Added a booking approval transaction.
- Added two query-based indexes.
- Added a reset script for clean database recreation.

## Database

Database:

equipment_booking_db

## Run

Connect:

sudo -u postgres psql -d equipment_booking_db

Create schema:

\i /path/to/Day10/schema.sql

Insert seed data:

\i /path/to/Day10/seed.sql

Run queries:

\i /path/to/Day10/queries.sql

Run transaction:

\i /path/to/Day10/transaction.sql

Create indexes:

\i /path/to/Day10/index.sql

## Reset

Run reset.sql, then run schema.sql and seed.sql again to recreate the database from a clean state.
