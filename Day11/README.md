# Day 11: Node.js with PostgreSQL

## Overview

A Support Ticket API built with Node.js, TypeScript, Express, and PostgreSQL. This project replaces file-based storage with a PostgreSQL database using parameterized queries and a repository-based architecture.

## Features

- PostgreSQL database integration using `pg`
- Environment-based database configuration with `dotenv`
- CRUD operations for support tickets
- Parameterized SQL queries to prevent SQL injection
- Repository and service layer separation
- Database health-check endpoint
- Centralized error handling
- Automated tests using Vitest

## Tech Stack

- Node.js
- TypeScript
- Express
- PostgreSQL
- node-postgres (`pg`)
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
DB_HOST=localhost
DB_PORT=5432
DB_NAME=support_ticket_db
DB_USER=postgres
DB_PASSWORD=your_password
```

Replace `your_password` with your PostgreSQL password.

### 3. Prepare the database

Create the database and the required `api_tickets` table using the SQL schema provided for this project.

Ensure PostgreSQL is running before starting the API.

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

| Method | Endpoint       | Description                         |
| ------ | -------------- | ----------------------------------- |
| GET    | `/health`      | Check API and database connectivity |
| GET    | `/tickets`     | Retrieve all tickets                |
| GET    | `/tickets/:id` | Retrieve a ticket by ID             |
| POST   | `/tickets`     | Create a ticket                     |
| PATCH  | `/tickets/:id` | Update ticket details               |
| DELETE | `/tickets/:id` | Delete a ticket                     |

## Security and Error Handling

- Database credentials are loaded from environment variables.
- SQL queries use parameterized values.
- Database connection failures return an appropriate error response.
- Centralized error handling manages API errors.

## Project Goal

To integrate PostgreSQL into a Node.js API, implement safe database operations, and maintain a clean separation between routes, controllers, services, and repositories.
