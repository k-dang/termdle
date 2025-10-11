# AGENTS.md

## Build/Lint/Test Commands

- Build: `pnpm run build` (uses tsdown)
- Development: `pnpm run dev` (watch mode)
- Typecheck: `pnpm run typecheck` (tsc --noEmit)
- Lint: `pnpm run lint` (eslint)
- Format: `pnpm run format` (prettier)
- Run app: `pnpm start`
- Install packages: `pnpm install`
- Single test: No test script found in package.json

## Code Style Guidelines

- TypeScript with strict mode enabled
- Prettier formatting: singleQuote=true, semi=true, trailingComma=es5, printWidth=100
- ESLint with react and prettier plugins
- React with JSX
- ESNext target and module
- Imports: Use ES6 import/export syntax
- Naming: camelCase for variables/functions, PascalCase for components/types
- Error handling: Not explicitly defined in codebase
- Types: Strict typing required, implicit any not allowed

## Project Structure

- src/cli/: UI components and CLI entry point
- src/core/: Game logic, stats, and word lists
- React components use Ink for terminal rendering
- State management with Jotai atoms

## Agent Notes

- No Cursor or Copilot rules found

## Ignore Files

- Ignore the `node_modules` directory
