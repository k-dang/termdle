# Termdle

[![npm version](https://badge.fury.io/js/termdle.svg)](https://www.npmjs.com/package/termdle)

A fully-featured wordle clone that runs entirely in your terminal! Built with TypeScript, React, and Ink.

<p align="center">
  <img alt="termdle" src="/images/termdle.png" width="45%" />
  <img alt="termdle-compact" src="/images/termdle-compact.png" width="45%"/> 
</p>

## Installation

Run with npx

```bash
npx termdle
```

or Install Termdle globally

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
│       ├── stats.ts           # Statistics tracking and persistence
│       └── words.ts           # Word lists for targets and valid guesses
├── package.json               # Project configuration
└── tsconfig.json             # TypeScript configuration
```

## Local Development

### Prerequisites

- [node](https://nodejs.org) (>= 20.0.0)
- [pnpm](https://pnpm.io/)

### Setup

**Clone the repository**

```bash
git clone git@github.com:k-dang/termdle.git
```

**Install dependencies**

```bash
pnpm install
```

### Development Workflow

Start the `tsdown` bundler in watch mode

```bash
pnpm run dev
```

Start the cli app in another terminal window

```bash
pnpm run start
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

## Publishing

This repo is setup to publish upon merges to main via Github actions. You can also run the commands manually.

**Bundle the package**

```bash
pnpm run build
```

**Publish the package**

```bash
pnpm run publish
```
