# Day 9: Transactions and Indexes

## Overview

Implemented transactional ticket reassignment and tested an index for ticket status searches using PostgreSQL.

## Files

```text
Day9/
├── transaction.sql
├── index.sql
└── README.md
```

## Transactions

The ticket reassignment transaction:

1. Updates the ticket assignee.
2. Inserts a status history record.
3. Adds a system comment.
4. Uses `COMMIT` when all operations succeed.
5. Uses `ROLLBACK` when an operation fails.

A deliberate foreign-key failure was used to verify that the transaction rolls back successfully.

## Index

The query used for testing:

```sql
SELECT
    title,
    priority,
    status
FROM tickets
WHERE status = 'open';
```

Created index:

```sql
CREATE INDEX idx_tickets_status
ON tickets(status);
```

`EXPLAIN` was captured before and after creating the index.

The table is small, so PostgreSQL continued to use a `Seq Scan` instead of the index. The index was added specifically for the ticket status search query.

## Result

- Transaction `COMMIT` tested successfully.
- Transaction `ROLLBACK` tested with a deliberate failure.
- `EXPLAIN` tested before and after indexing.
- Index created with a query-based reason.
