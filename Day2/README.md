# Task Manager CLI

A file-based Task Manager CLI built with Node.js and TypeScript.

## Features

- Add tasks
- List tasks
- complete tasks
- Delete tasks
- Filter completed tasks
- Filter pending tasks
- Persist tasks in a JSON file
- Gracefully handle missing or malformed data

## Project Structure

src/
├── cli.ts
├── commands/
│ └── taskCommands.ts
├── repository/
│ └── taskRepository.ts
├── services/
│ └── taskService.ts
└── types/
└── task.ts

tests/
├── repository.test.ts
└── taskService.test.ts

data/
└── tasks.json

## Installation

```bash
npm install
```

## Development

Run the CLI using TypeScript directly:

```bash
npm run dev -- list
```

## Commands

Add a task:

```bash
npm run dev -- add "Learn Node.js"
```

List tasks:

```bash
npm run dev -- list
```

Complete a task:

```bash
npm run dev -- complete <task-id>
```

Delete a task:

```bash
npm run dev -- delete <task-id>
```

Filter completed tasks:

```bash
npm run dev -- filter completed
```

Filter pending tasks:

```bash
npm run dev -- filter pending
```

## Build

```bash
npm run build
```

## Run Built Version

```bash
npm run start -- list
```

## Tests

Run tests once:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

## Architecture

The application separates responsibilities into layers:

CLI
↓
Command Handler
↓
Task Service
↓
Task Repository
↓
tasks.json

## CLI

The CLI reads command-line arguments and handles the application's top level error output.

## Command Handler

The command handler validates command arguments and calls the appropriate service method.

## Task Service

The service contains the business logic for adding, listing, completing, deleting, and filtering tasks.

## Task Repository

The repository handles file-system operations and JSON persistence.

This separation keeps storage concerns independent from business logic.

## Error Handling

The application handles:

- Missing task data file
- Malformed JSON
- Invalid JSON structure
- Missing task titles
- Missing task IDs
- Nonexistent task IDs
- Invalid filter values
- Unknown commands

Missing task files are treated as an empty task list.

Other file or parsing errors are allowed to propagate to the top-level CLI error handler.

Promise rejections are handled by the top-level CLI error handler.
