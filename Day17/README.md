# Day 13: Validation, Pagination and Filtering

## Overview

A Support Ticket API built with Node.js, TypeScript, Express, Prisma, and PostgreSQL.

This project enhances the Support Ticket API with query validation, pagination, filtering, searching, and sorting. It uses Prisma ORM to interact with PostgreSQL and maintains a clean repository-based architecture.

## Features

- PostgreSQL database integration using Prisma ORM
- Environment-based database configuration with `dotenv`
- CRUD operations for support tickets
- Query parameter validation
- Pagination with page and page-size controls
- Filtering by ticket status, priority, and assignee
- Case-insensitive search across ticket titles and descriptions
- Sorting by allowed fields in ascending or descending order
- Database-level filtering, sorting, and pagination
- Total matching ticket count and pagination metadata
- Repository and service layer separation
- Centralized error handling
- Automated tests using Vitest

## Tech Stack

- Node.js
- TypeScript
- Express
- PostgreSQL
- Prisma ORM
- `@prisma/adapter-pg`
- dotenv
- Vitest
- Supertest

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/support_ticket_prisma_db"
```

Replace `your_password` with your PostgreSQL password.

### 3. Prepare the database

Ensure PostgreSQL is running and the database exists.

Apply Prisma migrations:

```bash
npx prisma migrate deploy
```

Generate the Prisma client if required:

```bash
npx prisma generate
```

## Run the Application

Start the development server:

```bash
npm run dev
```

Build the TypeScript project:

```bash
npm run build
```

Run the compiled application:

```bash
npm start
```

## Testing

Run all tests:

```bash
npm test
```

Run TypeScript type checking:

```bash
npx tsc --noEmit
```

## API Endpoints

| Method | Endpoint       | Description                                                         |
| ------ | -------------- | ------------------------------------------------------------------- |
| GET    | `/health`      | Check API and database connectivity                                 |
| GET    | `/tickets`     | Retrieve tickets with pagination, filtering, searching, and sorting |
| GET    | `/tickets/:id` | Retrieve a ticket by ID                                             |
| POST   | `/tickets`     | Create a ticket                                                     |
| PATCH  | `/tickets/:id` | Update ticket details                                               |
| DELETE | `/tickets/:id` | Delete a ticket                                                     |

## Query Parameters

The `GET /tickets` endpoint supports the following query parameters:

| Parameter       | Description                           | Default     |
| --------------- | ------------------------------------- | ----------- |
| `page`          | Page number (positive integer)        | `1`         |
| `pageSize`      | Number of tickets per page (1–100)    | `10`        |
| `status`        | Filter by ticket status               | —           |
| `priority`      | Filter by ticket priority             | —           |
| `assignee`      | Filter by assignee                    | —           |
| `search`        | Search ticket titles and descriptions | —           |
| `sortField`     | Field used to sort results            | `createdAt` |
| `sortDirection` | Sort direction: `asc` or `desc`       | `desc`      |

### Example Requests

```bash
# Get tickets with default pagination
curl "http://localhost:3000/tickets"

# Get page 1 with 5 tickets
curl "http://localhost:3000/tickets?page=1&pageSize=5"

# Filter by status
curl "http://localhost:3000/tickets?status=open"

# Filter by priority
curl "http://localhost:3000/tickets?priority=high"

# Filter by assignee
curl "http://localhost:3000/tickets?assignee=John"

# Search ticket titles and descriptions
curl "http://localhost:3000/tickets?search=payment"

# Sort by title in ascending order
curl "http://localhost:3000/tickets?sortField=title&sortDirection=asc"
```

## Pagination Response

A successful `GET /tickets` request returns a response containing ticket data and pagination metadata.

```json
{
  "data": [],
  "pagination": {
    "page": 1,
    "pageSize": 10,
    "total": 0,
    "totalPages": 0
  }
}
```

- `data`: Tickets returned for the requested page
- `page`: Current page number
- `pageSize`: Number of tickets requested per page
- `total`: Total number of matching tickets
- `totalPages`: Total number of pages available

## Validation and Error Handling

- Invalid query parameters return a `400 Bad Request` response.
- Page numbers must be positive integers.
- Page size must be between 1 and 100.
- Sort fields and sort directions must be supported values.
- Invalid status and priority values are rejected.
- Centralized error handling manages API errors.

## Security

- Database credentials are loaded from environment variables.
- Prisma is used for database operations.
- Query values are validated before being passed to the repository.
- Sorting uses an allowed set of fields.
- Pagination and filtering are performed at the database level.

## Project Goal

To enhance a PostgreSQL-backed Support Ticket API by implementing validated query parameters, efficient database-level pagination, filtering, searching, and sorting while maintaining a clean separation between routes, controllers, services, and repositories.
