import { describe, expect, test } from 'vitest';
import { getRandomTargetWord, isValidWord } from './words';

describe('Words Module', () => {
  describe('getRandomTargetWord', () => {
    test('should return a string', () => {
      const word = getRandomTargetWord();
      expect(typeof word).toBe('string');
    });

    test('should return a 5-letter word', () => {
      const word = getRandomTargetWord();
      expect(word.length).toBe(5);
    });

    test('should return a lowercase word', () => {
      const word = getRandomTargetWord();
      expect(word).toBe(word.toLowerCase());
    });

    test('should always return words that are valid', () => {
      // Test multiple random words to ensure they're all valid
      for (let i = 0; i < 20; i++) {
        const word = getRandomTargetWord();
        expect(isValidWord(word)).toBe(true);
      }
    });
  });

  describe('isValidWord', () => {
    test.each(['about', 'hello'])('should return true for valid lowercase word "%s"', (word) => {
      expect(isValidWord(word)).toBe(true);
    });

    test.each(['ABOUT', 'HELLO'])('should return true for valid uppercase word "%s"', (word) => {
      expect(isValidWord(word)).toBe(true);
    });

    test.each(['About', 'HeLLo'])('should return true for valid mixed case word "%s"', (word) => {
      expect(isValidWord(word)).toBe(true);
    });

    test.each(['zzzzz', 'xxxxx'])('should return false for invalid word "%s"', (word) => {
      expect(isValidWord(word)).toBe(false);
    });
  });
});
