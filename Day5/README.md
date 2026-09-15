# Day 5 - Support Ticket API

A file-backed Support Ticket API built with Node.js, TypeScript, Express, and Vitest.

## Features

- Create, list, view, update, assign, and delete tickets
- Validate ticket data
- JSON file persistence
- Unit and API tests

## Ticket

```json
{
  "id": "uuid",
  "title": "Login issue",
  "description": "User cannot log in",
  "priority": "high",
  "status": "open",
  "assignee": null,
  "createdAt": "2026-09-15T10:00:00.000Z",
  "updatedAt": "2026-09-15T10:00:00.000Z"
}
```

Priority: `low` | `medium` | `high`

Status: `open` | `in-progress` | `resolved`

## API

| Method | Endpoint                | Description   |
| ------ | ----------------------- | ------------- |
| POST   | `/tickets`              | Create ticket |
| GET    | `/tickets`              | List tickets  |
| GET    | `/tickets/:id`          | View ticket   |
| PATCH  | `/tickets/:id/status`   | Update status |
| PATCH  | `/tickets/:id/assignee` | Assign ticket |
| DELETE | `/tickets/:id`          | Delete ticket |
| GET    | `/health`               | Health check  |

## Example

Create a ticket:

```bash
curl -X POST http://localhost:3000/tickets \
  -H "Content-Type: application/json" \
  -d '{"title":"Login issue","description":"User cannot log in","priority":"high"}'
```

Update status:

```bash
curl -X PATCH http://localhost:3000/tickets/TICKET_ID/status \
  -H "Content-Type: application/json" \
  -d '{"status":"resolved"}'
```

Assign:

```bash
curl -X PATCH http://localhost:3000/tickets/TICKET_ID/assignee \
  -H "Content-Type: application/json" \
  -d '{"assignee":"Yasin"}'
```

## Project Structure

```text
src/
├── controllers/
├── repository/
├── routes/
├── services/
├── types/
├── app.ts
└── server.ts

tests/
├── api.test.ts
├── ticketRepository.test.ts
└── ticketService.test.ts

data/
└── tickets.json
```

## Commands

```bash
npm install
npm run dev
npm run build
npm start
npm test
npm run test:watch
```

## Validation

- Title and description are required.
- Priority must be `low`, `medium`, or `high`.
- Status must be `open`, `in-progress`, or `resolved`.
- Assignee must be a string or `null`.
- Invalid input returns `400`.
- Missing tickets return `404`.
- Successful deletion returns `204`.
