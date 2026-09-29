# Support Ticket API

A TypeScript REST API for authentication and support ticket management.

## Requirements

- Node.js 20+
- PostgreSQL
- npm

## Setup

Install dependencies:

npm install

Create the environment file:

cp .env.example .env

Update .env with you PostSQL connection and JWT secret.

Run database migrations:

npx prisma migrate deploy --config prisma7.config.ts

## Run

Development:

npm run dev

Build:

npm run build

Production:

npm start

## Tests

npm test

TypeScript check:

npx tsc --noEmit

## API

Base URL:

http://localhost:3000

## Health

GET /health

## Authentication

POST /auth/register
POST /auth/login
GET /auth/me

## Tickets

GET /tickets
POST /tickets
GET /tickets/:id
PATCH /tickets/:id/status
PATCH /tickets/:id/assignee
DELETE /tickets/:id

Protected endpoints require:

Authorization: Bearer <JWT>

## API Documentation

OpenAPI specification:

docs/openapi.yaml

## Enviroment Variables

See `.env.example` for the required variables.

Never commit .env or real secrets.

## Security

- Helmet security headers
- Restricted CORS
- JSON body-size limit
- Login rate limiting
- JWT authentication
- Role and ownership authorization
- Input validation
- Centralized error handling
- Structured request logging
- Request IDs
