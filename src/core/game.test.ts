import { describe, expect, test, beforeEach } from 'vitest';
import { WordleGame, LetterState } from './game';

describe('WordleGame tests', () => {
  let game: WordleGame;

  beforeEach(() => {
    game = new WordleGame();
  });

  describe('makeGuess', () => {
    describe('validation', () => {
      test('should reject guess with less than 5 letters', () => {
        const result = game.makeGuess('abc');
        expect(result.valid).toBe(false);
        expect(result.message).toBe('Guess must be exactly 5 letters!');
      });

      test('should reject guess with more than 5 letters', () => {
        const result = game.makeGuess('abcdef');
        expect(result.valid).toBe(false);
        expect(result.message).toBe('Guess must be exactly 5 letters!');
      });

      test('should reject invalid word', () => {
        const result = game.makeGuess('zzzzz');
        expect(result.valid).toBe(false);
        expect(result.message).toBe('Not a valid word!');
      });

      test('should accept valid 5-letter word', () => {
        const result = game.makeGuess('about');
        expect(result.valid).toBe(true);
        expect(result.result).toBeDefined();
        expect(result.result?.length).toBe(5);
      });

      test('should reject guess when game is over', () => {
        // Set target word to test win condition
        game.setTargetWord('hello');
        game.makeGuess('hello'); // Win the game

        const result = game.makeGuess('about');
        expect(result.valid).toBe(false);
        expect(result.message).toBe('Game is already over!');
      });
    });

    describe('game state updates', () => {
      test('should add guess to state', () => {
        game.makeGuess('about');
        const state = game.getState();
        expect(state.guesses).toContain('about');
        expect(state.guesses.length).toBe(1);
      });

      test('should increment currentGuess counter', () => {
        const initialState = game.getState();
        expect(initialState.currentGuess).toBe(0);

        game.makeGuess('about');
        const afterState = game.getState();
        expect(afterState.currentGuess).toBe(1);
      });

      test('should normalize guess to lowercase', () => {
        game.makeGuess('ABOUT');
        const state = game.getState();
        expect(state.guesses[0]).toBe('about');
      });
    });

    describe('winning condition', () => {
      test('should set won and gameOver when correct word is guessed', () => {
        game.setTargetWord('hello');
        game.makeGuess('hello');

        const state = game.getState();
        expect(state.won).toBe(true);
        expect(state.gameOver).toBe(true);
      });

      test('should set won regardless of case', () => {
        game.setTargetWord('hello');
        game.makeGuess('HELLO');

        const state = game.getState();
        expect(state.won).toBe(true);
        expect(state.gameOver).toBe(true);
      });

      test('should allow winning on last guess', () => {
        game.setTargetWord('hello');
        // Make 5 wrong guesses
        game.makeGuess('about');
        game.makeGuess('space');
        game.makeGuess('world');
        game.makeGuess('place');
        game.makeGuess('trace');

        // Win on 6th guess
        const result = game.makeGuess('hello');

        expect(result.valid).toBe(true);
        const state = game.getState();
        expect(state.won).toBe(true);
        expect(state.gameOver).toBe(true);
        expect(state.currentGuess).toBe(6);
      });
    });

    describe('losing condition', () => {
      test('should set gameOver after max guesses without winning', () => {
        game.setTargetWord('hello');

        // Make 6 wrong guesses
        game.makeGuess('about');
        game.makeGuess('space');
        game.makeGuess('world');
        game.makeGuess('place');
        game.makeGuess('trace');
        game.makeGuess('grace');

        const state = game.getState();
        expect(state.won).toBe(false);
        expect(state.gameOver).toBe(true);
        expect(state.currentGuess).toBe(6);
      });

      test('should not allow guess after max guesses reached', () => {
        game.setTargetWord('hello');

        // Make 6 wrong guesses
        game.makeGuess('about');
        game.makeGuess('space');
        game.makeGuess('world');
        game.makeGuess('place');
        game.makeGuess('trace');
        game.makeGuess('grace');

        // Try to make another guess
        const result = game.makeGuess('hello');
        expect(result.valid).toBe(false);
        expect(result.message).toBe('Game is already over!');
      });
    });

    describe('letter evaluation', () => {
      test('should mark all letters as CORRECT when word matches', () => {
        game.setTargetWord('hello');
        const result = game.makeGuess('hello');

        expect(result.valid).toBe(true);
        expect(result.result).toBeDefined();
        expect(result.result?.every((lr) => lr.state === LetterState.CORRECT)).toBe(true);
      });

      test('should mark letters as ABSENT when not in target word', () => {
        game.setTargetWord('hello');
        const result = game.makeGuess('track');

        expect(result.valid).toBe(true);
        expect(result.result).toBeDefined();

        // 't', 'r', 'a', 'c', 'k' are not in 'hello'
        const absentLetters = result.result?.filter((lr) => lr.state === LetterState.ABSENT);
        expect(absentLetters?.length).toBeGreaterThan(0);
      });

      test('should mark letter as PRESENT when in word but wrong position', () => {
        game.setTargetWord('hello');
        const result = game.makeGuess('hotel');

        expect(result.valid).toBe(true);
        expect(result.result).toBeDefined();

        // 'h' should be CORRECT (position 0)
        expect(result.result?.[0]).toEqual({ letter: 'h', state: LetterState.CORRECT });

        // 'o' should be PRESENT (in word but wrong position)
        expect(result.result?.[1]).toEqual({ letter: 'o', state: LetterState.PRESENT });
      });

      test('should handle duplicate letters correctly - correct position takes precedence', () => {
        game.setTargetWord('hello');
        const result = game.makeGuess('llama');

        expect(result.valid).toBe(true);
        expect(result.result).toBeDefined();

        if (!result.result) {
          throw new Error('Result should be defined');
        }

        // First 'l' at position 0: ABSENT (not correct position)
        expect(result.result[0]?.letter).toBe('l');

        // Second 'l' at position 1: PRESENT (there's an 'l' in hello at positions 2 and 3)
        expect(result.result[1]?.letter).toBe('l');
      });

      test('should handle multiple occurrences of same letter', () => {
        game.setTargetWord('apple');
        const result = game.makeGuess('papal');

        expect(result.valid).toBe(true);
        expect(result.result).toBeDefined();

        if (!result.result) {
          throw new Error('Result should be defined');
        }

        // First 'p' at position 0: PRESENT (p exists at position 1 and 2 in apple)
        expect(result.result[0]).toEqual({ letter: 'p', state: LetterState.PRESENT });

        // Second 'p' at position 2: CORRECT (matches position 2 in apple)
        expect(result.result[2]).toEqual({ letter: 'p', state: LetterState.CORRECT });
      });
    });
  });

  describe('reset', () => {
    test('should reset game state', () => {
      game.setTargetWord('hello');
      game.makeGuess('about');
      game.makeGuess('world');

      const beforeReset = game.getState();
      expect(beforeReset.guesses.length).toBe(2);

      game.reset();

      const afterReset = game.getState();
      expect(afterReset.guesses).toEqual([]);
      expect(afterReset.guesses.length).toBe(0);
      expect(afterReset.results).toEqual([]);
      expect(afterReset.results.length).toBe(0);
      expect(afterReset.currentGuess).toBe(0);
      expect(afterReset.letterStates.size).toBe(0);
      expect(afterReset.maxGuesses).toBe(6);
    });

    test('should reset flags to false', () => {
      game.setTargetWord('hello');
      game.makeGuess('hello'); // Win the game

      const beforeReset = game.getState();
      expect(beforeReset.gameOver).toBe(true);

      game.reset();

      const afterReset = game.getState();
      expect(afterReset.gameOver).toBe(false);
      expect(afterReset.won).toBe(false);
    });

    test('should reset after losing', () => {
      game.setTargetWord('hello');

      // Make 6 wrong guesses to lose
      game.makeGuess('about');
      game.makeGuess('space');
      game.makeGuess('world');
      game.makeGuess('place');
      game.makeGuess('trace');
      game.makeGuess('grace');

      const beforeReset = game.getState();
      expect(beforeReset.gameOver).toBe(true);
      expect(beforeReset.won).toBe(false);
      expect(beforeReset.currentGuess).toBe(6);

      game.reset();

      const afterReset = game.getState();
      expect(afterReset.gameOver).toBe(false);
      expect(afterReset.won).toBe(false);
      expect(afterReset.currentGuess).toBe(0);
      expect(afterReset.guesses.length).toBe(0);
    });
  });

  describe('revealAnswer', () => {
    test('should return the target word', () => {
      game.setTargetWord('hello');
      const answer = game.revealAnswer();
      expect(answer).toBe('hello');
    });

    test('should return a valid 5-letter word by default', () => {
      const answer = game.revealAnswer();
      expect(typeof answer).toBe('string');
      expect(answer.length).toBe(5);
      expect(answer).toBe(answer.toLowerCase());
    });
  });
});
