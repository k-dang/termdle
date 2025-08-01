# Termdle

A fully-featured Wordle clone that runs entirely in your terminal! Built with TypeScript, React, and Ink.

## Installation

### Global Installation (Recommended)

Install Termdle globally to play from anywhere:

```bash
npm install -g termdle
```

Then simply run:

```bash
termdle
```

## Features

✅ **Classic Wordle Gameplay**

- 6 attempts to guess a 5-letter word
- Color-coded feedback: Green (correct position), Yellow (wrong position), Gray (not in word)

✅ **Beautiful Terminal UI**

- Modern React-based interface using Ink
- Live keyboard showing letter states

✅ **Statistics Tracking**

- Games played, won, win percentage
- Current and maximum win streaks
- Guess distribution histogram
- Persistent stats saved to your home directory

## Project Structure

```
├── src/
│   ├── cli/
│   │   ├── index.tsx          # Main CLI entry point
│   │   └── ui/
│   │       ├── App.tsx        # Main React application
│   │       ├── atoms/         # Jotai state management
│   │       ├── components/    # React components
|   |       ├── hooks/         # React hooks
│   │       └── utils/         # UI utilities
│   └── core/
│       ├── game.ts            # Core game logic and word evaluation
│       ├── display.ts         # Terminal UI and visual formatting
│       ├── stats.ts           # Statistics tracking and persistence
│       └── words.ts           # Word lists for targets and valid guesses
├── package.json               # Project configuration
└── tsconfig.json             # TypeScript configuration
```

## Local Development

### Prerequisites

- [Node.js](https://nodejs.org) (>= 18.0.0)
- pnpm

### Setup

1. **Clone the repository**

```bash
git clone git@github.com:k-dang/termdle.git
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Build the project**

```bash
pnpm run build
```

4. **Verify installation**

```bash
pnpm start
```

### Development Workflow

**Start development server with hot reload**

```bash
pnpm run dev
```

This will the `tsdown` bundler in watch mode and will automatically rebuild when you make changes.

```bash
pnpm run start
```

This will start the cli app

**Build for production**

```bash
pnpm run build
```

**Type checking**

```bash
pnpm run typecheck
```

**Run linting**

```bash
pnpm run lint
```

**Format code**

```bash
pnpm run format
```
