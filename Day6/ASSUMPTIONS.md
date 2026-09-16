# Support Ticket Database - Assumptions

## Entities

The database contains the following entities:

- Users
- Customers
- Tickets
- Categories
- Comments
- Assignments
- Status History

## Business Rules

- A customer can create multiple tickets.
- Each ticket belongs to exactly one customer.
- Each ticket belongs to exactly one category.
- A category can contain multiple tickets.
- A ticket can have zero or many comments.
- Each comment belongs to exactly one ticket.
- Each comment is written by one user.
- A user can write multiple comments.
- A ticket can have zero or many assignments.
- A user can be assigned to multiple tickets.
- Assignments are stored separately so a ticket can have multiple assignment records over time.
- A ticket can have zero or many status history records.
- Each status history record belongs to exactly one ticket.
- Each status change is recorded with the user who made the change.
- Ticket status can only be `open`, `in-progress`, or `resolved`.
- Ticket priority can only be `low`, `medium`, or `high`.
- User email addresses must be unique.
- Customer email addresses must be unique.
- Category names must be unique.
- A ticket must have a title, description, customer, category, priority, and status.
- Comments, assignments, and status history belong to a ticket and are deleted when that ticket is deleted.
- Foreign keys are used to maintain valid relationships between tables.
- UUIDs are used as primary keys.
- Timestamps are stored using `TIMESTAMPTZ`.
- `updated_at` records the last update time of a ticket. Updating it automatically is outside the scope of this initial schema.

## Design Decisions

- Foreign Keys are used in the relational database schema, but they are not shown as attributes in the conceptual ERD.

- `assignments` is used to represent the many-to-many relationship between users and tickets.

- `status_history` is used to keep a record of status changes instead of storing only the current status.

- No comma-separated values are used for multiple relationships.
