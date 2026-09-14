# Day 4: Express and Layered Architecture

A Task Manager REST API built with Node.js, TypeScript, and Express.

## Features

- Express HTTP server
- Task CRUD operations
- Health check endpoint
- Request logging
- Centralized error handling
- Centralized 404 handling
- JSON request validation
- File-based JSON persistence
- Strict TypeScript
- Vitest tests

## Project Structure

```text
src/
├── controllers/
│   └── taskController.ts
├── middleware/
│   ├── errorHandler.ts
│   ├── logger.ts
│   └── notFound.ts
├── repository/
│   └── taskRepository.ts
├── routes/
│   └── taskRoutes.ts
├── services/
│   └── taskService.ts
├── types/
│   └── task.ts
├── app.ts
└── server.ts

tests/
├── api.test.ts
├── repository.test.ts
├── taskService.test.ts
└── task.test.ts

data/
└── tasks.json
```

## Architecture

```text
Routes → Controllers → Services → Repository → JSON File
```

- Routes define API endpoints.
- Controllers handle HTTP requests and responses.
- Services contain business logic.
- Repository handles file persistence.
- Middleware handles logging and errors.

## Endpoints

| Method | Endpoint     | Description     |
| ------ | ------------ | --------------- |
| GET    | `/health`    | Health check    |
| GET    | `/tasks`     | List tasks      |
| GET    | `/tasks/:id` | Get a task      |
| POST   | `/tasks`     | Create a task   |
| PATCH  | `/tasks/:id` | Complete a task |
| DELETE | `/tasks/:id` | Delete a task   |

## Run

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev:server
```

Build:

```bash
npm run build
```

Run tests:

```bash
npm test
```

Type-check:

```bash
npx tsc --noEmit
```

## Error Handling

The API returns JSON errors for:

- Invalid JSON → `400`
- Invalid task data → `400`
- Missing task → `404`
- Unknown route → `404`
- Unexpected server errors → `500`

## Testing

Vitest is used for unit and API testing.

Current test result:

```text
4 test files passed
21 tests passed
```
