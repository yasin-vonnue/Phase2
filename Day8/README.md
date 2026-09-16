# Day 8: Joins, Grouping and Reports

## Overview

Built a SQL reporting pack for the Support Ticket system using PostgreSQL.

The reports use:

- JOIN
- LEFT JOIN
- GROUP BY
- HAVING
- COUNT
- ORDER BY

## Files

```text
Day8/
├── reports.sql
└── README.md
```

## Reports

The `reports.sql` file contains five business reports:

1. Ticket count by status and assigned user.
2. Customers with more than five open tickets.
3. Users with no assigned tickets.
4. Oldest unresolved ticket.
5. Ticket counts by category and priority.

Each query includes a comment describing the business question.

## Database

Database:

```text
support_ticket_db
```

The reports use the tables created during Day 6 and the seed data from Day 7.

## Run Reports

Connect to PostgreSQL:

```bash
psql -d support_ticket_db
```

Run the complete report file:

```sql
\i /path/to/Day8/reports.sql
```

Or run each query individually in `psql`.

## Results

All five reports were tested successfully against the existing seed data.

- Report 1 returned assigned tickets for Alice and Carol.
- Report 2 returned no rows because no customer has more than five open tickets.
- Report 3 returned Bob Smith as a user with no assigned tickets.
- Report 4 returned the oldest unresolved ticket.
- Report 5 returned ticket counts grouped by category and priority.

## Key SQL Concepts

- `JOIN` combines related data from multiple tables.
- `LEFT JOIN` keeps records even when a matching record does not exist.
- `GROUP BY` groups rows for aggregate calculations.
- `COUNT()` counts matching records.
- `HAVING` filters grouped results.
- `ORDER BY` sorts the report output.
