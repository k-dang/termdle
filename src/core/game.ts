import { getRandomTargetWord, isValidWord } from './words';

export enum LetterState {
  CORRECT = 'correct', // correct letter in correct position
  PRESENT = 'present', // correct letter in wrong position
  ABSENT = 'absent', // letter not in word
}

export interface LetterResult {
  letter: string;
  state: LetterState;
}

export interface GameState {
  targetWord: string;
  guesses: string[];
  results: LetterResult[][];
  letterStates: Map<string, LetterState>;
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
      letterStates: new Map<string, LetterState>(),
      currentGuess: 0,
      gameOver: false,
      won: false,
      maxGuesses: 6,
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

    if (guess.toLowerCase() !== this.state.targetWord.toLowerCase() && !isValidWord(guess.toLowerCase())) {
      return { valid: false, message: 'Not a valid word!' };
    }

    const result = this.evaluateGuess(guess.toLowerCase());

    this.updateLetterStates(result);

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

  // guess is guaranteed to be length 5 due to runtime check
  // targetWord is guaranteed to be length 5 from getRandomTargetWord
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
    for (const [i, guessLetter] of guessArray.entries()) {
      if (guessLetter === targetArray[i]) {
        result[i] = { letter: guessLetter, state: LetterState.CORRECT };
        usedPositions.add(i);
        // Reduce count for this letter
        const count = targetLetterCounts.get(guessLetter) || 0;
        targetLetterCounts.set(guessLetter, count - 1);
      }
    }

    // Second pass: find present letters (yellow) and absent letters (gray)
    for (const [i, guessLetter] of guessArray.entries()) {
      if (usedPositions.has(i)) {
        // Already marked as correct
        continue;
      }

      const remainingCount = targetLetterCounts.get(guessLetter) || 0;

      if (remainingCount > 0) {
        // Should only be present if there are remaining unmatched instances
        result[i] = { letter: guessLetter, state: LetterState.PRESENT };
        targetLetterCounts.set(guessLetter, remainingCount - 1);
      } else {
        result[i] = { letter: guessLetter, state: LetterState.ABSENT };
      }
    }

    return result;
  }

  private updateLetterStates(result: LetterResult[]): void {
    for (const letterResult of result) {
      const letter = letterResult.letter.toLowerCase();
      const currentState = this.state.letterStates.get(letter);

      // Only update if new state has higher priority than current state
      if (!currentState) {
        this.state.letterStates.set(letter, letterResult.state);
      } else if (letterResult.state === LetterState.CORRECT) {
        this.state.letterStates.set(letter, letterResult.state);
      } else if (
        letterResult.state === LetterState.PRESENT &&
        currentState === LetterState.ABSENT
      ) {
        this.state.letterStates.set(letter, letterResult.state);
      }
    }
  }

  public reset(): void {
    this.state = {
      targetWord: getRandomTargetWord(),
      guesses: [],
      results: [],
      letterStates: new Map<string, LetterState>(),
      currentGuess: 0,
      gameOver: false,
      won: false,
      maxGuesses: 6,
    };
  }

  public revealAnswer(): string {
    return this.state.targetWord;
  }

  public setTargetWord(word: string): void {
    this.state.targetWord = word;
  }
}
