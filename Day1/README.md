# Systme Information CLI

A production-style Node.js CLI written in TypeScript.

## Requirements

- Node.js 20+
- npm

## Installation

Clone the repository and install dependencies:

```bash
npm install
```

## Development

Run the CLI directly from TypeScript:

```bash
npm run dev -- version
```

Available commands:

```bash
npm run dev -- version
npm run dev -- os
npm run dev -- memory
npm run dev -- cwd
npm run dev -- env
```

## JSON output

Use the `--json` option:

```bash
npm run dev -- os --json
npm run dev -- memory --json
```

## Build

Compile TypeScript

```bash
npm run build
```

The compiler files are written to `dist/`.

## Production

Run the compiled application:

```bash
npm start -- version
```

## Tests

Run the Vitest test suite:

```bash
npm test
```

Run Vitest in watch mode:

```bash
npm run test:watch
```

## Type checking

Run TypeScript without generating files:

```bash
npm run typecheck
```

## Available Commands

`version` - Displays the Node.js version

`os` - Displays operating system information

`memory` - Displays memory information

`cwd` - Displays the current working directory

`env` - Displays environment variables

## JSON output

Commands support machine-readable output:

```bash
npm run dev -- version --json
```

```JSON
"v22.x.x"
```
