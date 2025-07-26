# 🟢 Terminal Wordle 🟡

A fully-featured Wordle clone that runs entirely in your terminal! Built with TypeScript and Bun.

## Features

✅ **Classic Wordle Gameplay**
- 6 attempts to guess a 5-letter word
- Color-coded feedback: Green (correct position), Yellow (wrong position), Gray (not in word)
- Over 400+ target words and 1000+ valid guess words

✅ **Beautiful Terminal UI**
- Colorful game board with emoji and styled text
- Live keyboard showing letter states
- Clear instructions and game status

✅ **Statistics Tracking**
- Games played, won, win percentage
- Current and maximum win streaks
- Guess distribution histogram
- Persistent stats saved to your home directory

✅ **Quality of Life Features**
- Input validation and error messages
- Play again without restarting
- Clean, responsive terminal interface

## Installation

Make sure you have [Bun](https://bun.sh) installed, then:

```bash
bun install
```

## Usage

To start playing:

```bash
bun start
```

Or for development:

```bash
bun dev
```

## How to Play

1. **Guess the Word**: Enter a 5-letter word and press Enter
2. **Read the Clues**: 
   - 🟢 **Green** = Correct letter in the correct position
   - 🟡 **Yellow** = Correct letter in the wrong position  
   - ⬜ **Gray** = Letter not in the word
3. **Use Your Clues**: Make your next guess based on the feedback
4. **Win or Learn**: You have 6 attempts to guess the word!

## Game Controls

- Type any 5-letter word to make a guess
- After game ends:
  - Type `play` or `p` to play again
  - Type `quit` or `q` to exit

## Project Structure

```
├── index.ts      # Main game loop and CLI interface
├── game.ts       # Core game logic and word evaluation
├── display.ts    # Terminal UI and visual formatting
├── stats.ts      # Statistics tracking and persistence
├── words.ts      # Word lists for targets and valid guesses
└── package.json  # Project configuration
```

## Technical Details

- **Runtime**: Bun v1.2.15+
- **Language**: TypeScript
- **Dependencies**: Chalk (for terminal colors)
- **Stats Storage**: JSON file in user's home directory
- **Word Validation**: Curated list of valid English words

## Development

This project was created using `bun init` and follows modern TypeScript practices. The game uses a modular architecture with separate concerns for game logic, display, and statistics.

---

Enjoy playing Terminal Wordle! 🎉
