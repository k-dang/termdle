import { getRandomTargetWord, isValidWord } from './words.js';

export enum LetterState {
  CORRECT = 'correct',     // Green - correct letter in correct position
  PRESENT = 'present',     // Yellow - correct letter in wrong position
  ABSENT = 'absent'        // Gray - letter not in word
}

export interface LetterResult {
  letter: string;
  state: LetterState;
}

export interface GameState {
  targetWord: string;
  guesses: string[];
  results: LetterResult[][];
  currentGuess: number;
  gameOver: boolean;
  won: boolean;
  maxGuesses: number;
}

export class WordleGame {
  private state: GameState;

  constructor() {
    this.state = {
      targetWord: getRandomTargetWord(),
      guesses: [],
      results: [],
      currentGuess: 0,
      gameOver: false,
      won: false,
      maxGuesses: 6
    };
  }

  public getState(): GameState {
    return { ...this.state };
  }

  public makeGuess(guess: string): { valid: boolean; message?: string; result?: LetterResult[] } {
    // Validate guess
    if (this.state.gameOver) {
      return { valid: false, message: 'Game is already over!' };
    }

    if (guess.length !== 5) {
      return { valid: false, message: 'Guess must be exactly 5 letters!' };
    }

    if (!isValidWord(guess)) {
      return { valid: false, message: 'Not a valid word!' };
    }

    // Process the guess
    const result = this.evaluateGuess(guess.toLowerCase());
    
    this.state.guesses.push(guess.toLowerCase());
    this.state.results.push(result);
    this.state.currentGuess++;

    // Check if won
    if (guess.toLowerCase() === this.state.targetWord) {
      this.state.won = true;
      this.state.gameOver = true;
    }
    // Check if out of guesses
    else if (this.state.currentGuess >= this.state.maxGuesses) {
      this.state.gameOver = true;
    }

    return { valid: true, result };
  }

  private evaluateGuess(guess: string): LetterResult[] {
    const target = this.state.targetWord;
    const guessArray = guess.split('');
    const targetArray = target.split('');
    const result: LetterResult[] = [];

    // First pass: mark correct positions
    const targetLetterCounts = new Map<string, number>();
    const usedPositions = new Set<number>();

    // Count letters in target word
    for (const letter of targetArray) {
      targetLetterCounts.set(letter, (targetLetterCounts.get(letter) || 0) + 1);
    }

    // First pass: find correct positions (green)
    for (let i = 0; i < 5; i++) {
      if (guessArray[i] === targetArray[i]) {
        result[i] = { letter: guessArray[i], state: LetterState.CORRECT };
        usedPositions.add(i);
        // Reduce count for this letter
        const count = targetLetterCounts.get(guessArray[i]) || 0;
        targetLetterCounts.set(guessArray[i], count - 1);
      }
    }

    // Second pass: find present letters (yellow) and absent letters (gray)
    for (let i = 0; i < 5; i++) {
      if (usedPositions.has(i)) {
        continue; // Already marked as correct
      }

      const letter = guessArray[i];
      const remainingCount = targetLetterCounts.get(letter) || 0;

      if (remainingCount > 0) {
        result[i] = { letter, state: LetterState.PRESENT };
        targetLetterCounts.set(letter, remainingCount - 1);
      } else {
        result[i] = { letter, state: LetterState.ABSENT };
      }
    }

    return result;
  }

  public reset(): void {
    this.state = {
      targetWord: getRandomTargetWord(),
      guesses: [],
      results: [],
      currentGuess: 0,
      gameOver: false,
      won: false,
      maxGuesses: 6
    };
  }

  public revealAnswer(): string {
    return this.state.targetWord;
  }
}
