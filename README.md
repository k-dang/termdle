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
- Colorful game board with emoji and styled text
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

- [Bun](https://bun.sh)

### Setup

1. **Clone the repository**

```bash
git clone <repository-url>
cd terminal-wordle
```

2. **Install dependencies**

```bash
bun install
```

3. **Verify installation**

```bash
bun start
```

### Development Workflow

**Start development server with hot reload**

```bash
bun dev
```

This will start the game in watch mode, automatically restarting when you make changes.

**Run linting**

```bash
bun lint
```

**Format code**

```bash
bun format
```
