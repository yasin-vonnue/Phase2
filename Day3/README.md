# Task Manager API

A file-based Task Manager built with **Node.js and TypeScript**. It provides both a CLI and a REST API using Node.js's built-in `http` module without Express.

## Features

- Add, list, complete, delete, and filter tasks
- Persist tasks in a JSON file
- REST API for task management
- JSON request/response handling
- Input validation and consistent error responses
- Strict TypeScript
- Vitest automated tests

## Project Structure

```text
src/
├── app.ts
├── cli.ts
├── server.ts
├── commands/
├── http/
├── repository/
├── services/
└── types/

tests/
data/
└── tasks.json
```

## Installation

```bash
npm install
```

## CLI

Run the CLI:

```bash
npm run dev -- list
```

Available commands:

```bash
npm run dev -- add "Learn Node.js"
npm run dev -- list
npm run dev -- complete <task-id>
npm run dev -- delete <task-id>
npm run dev -- filter completed
npm run dev -- filter pending
```

## REST API

Start the API server:

```bash
npm run dev:server
```

Server:

```text
http://localhost:3000
```

| Method | Endpoint     | Description     | Status    |
| ------ | ------------ | --------------- | --------- |
| GET    | `/tasks`     | List all tasks  | 200       |
| GET    | `/tasks/:id` | Get a task      | 200 / 404 |
| POST   | `/tasks`     | Create a task   | 201 / 400 |
| PATCH  | `/tasks/:id` | Complete a task | 200 / 404 |
| DELETE | `/tasks/:id` | Delete a task   | 204 / 404 |

### Create a Task

```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Learn HTTP"}'
```

### Get Tasks

```bash
curl http://localhost:3000/tasks
```

### Complete a Task

```bash
curl -X PATCH http://localhost:3000/tasks/<task-id>
```

### Delete a Task

```bash
curl -X DELETE http://localhost:3000/tasks/<task-id>
```

## Error Format

API errors are returned as JSON:

```json
{
  "error": "Task not found: <task-id>"
}
```

Common status codes:

- `200` — Success
- `201` — Created
- `204` — No Content
- `400` — Invalid request
- `404` — Resource or route not found
- `500` — Internal server error

## Architecture

```text
CLI / HTTP Client
       ↓
Commands / HTTP Handler
       ↓
Task Service
       ↓
Task Repository
       ↓
tasks.json
```

The HTTP layer handles routing, request parsing, validation, and responses.
The service layer contains business logic.
The repository handles file-system persistence.

## Testing

Run all Vitest tests:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

The project currently has **33 passing tests** covering the task logic, repository, service, HTTP helpers, router, body parser, and REST API.

## Build

Compile TypeScript:

```bash
npm run build
```

Run the compiled CLI:

```bash
npm run start -- list
```

Check TypeScript without generating files:

```bash
npx tsc --noEmit
```

## Development Scripts

| Command              | Purpose          |
| -------------------- | ---------------- |
| `npm run dev`        | Run CLI          |
| `npm run dev:server` | Start REST API   |
| `npm run build`      | Build TypeScript |
| `npm run start`      | Run compiled CLI |
| `npm test`           | Run tests        |
| `npm run test:watch` | Watch tests      |
