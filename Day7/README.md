# Day 7 — SQL CRUD and Constraints

## Overview

This project continues the Support Ticket database from Day 6.

The goal is to practise SQL CRUD operations and use database constraints to protect data quality.

## Files

```text
Day7/
├── schema.sql
├── seed.sql
├── queries.sql
├── constraint_tests.sql
└── README.md
```

## Database

PostgreSQL database:

```text
support_ticket_db
```

The database contains:

- Users
- Customers
- Categories
- Tickets
- Comments
- Assignments
- Status History

## Seed Data

The database was populated with sample:

- 3 users
- 3 categories
- 3 customers
- 5 tickets
- 2 comments
- 2 assignments
- 3 status history records

## CRUD Queries

`queries.sql` contains examples of:

- SELECT with WHERE
- ORDER BY
- LIMIT
- JOIN
- INSERT
- UPDATE
- DELETE

The queries cover:

- Open tickets
- High-priority tickets
- Latest tickets
- Tickets with customer names
- Creating a ticket
- Updating ticket status
- Safely deleting a specific ticket

## Constraints Tested

`constraint_tests.sql` verifies that the database prevents:

- Invalid ticket priorities
- Duplicate user emails
- Tickets with invalid customer IDs
- Tickets with invalid category IDs

The tests are expected to return PostgreSQL errors.

## Running the SQL Files

Run the schema only when creating the database structure:

```bash
sudo -u postgres psql -d support_ticket_db -f schema.sql
```

Seed the database:

```bash
sudo -u postgres psql -d support_ticket_db -f seed.sql
```

Run the queries:

```bash
sudo -u postgres psql -d support_ticket_db -f queries.sql
```

Run the constraint tests:

```bash
sudo -u postgres psql -d support_ticket_db -f constraint_tests.sql
```

## Result

Day 7 demonstrates SQL CRUD operations, relationships, foreign keys, and database-level constraints for reliable relational data.
