import { targetWords, validWords } from './words.constant';

/**
 * Returns a random 5-letter target word from the predefined list.
 *
 * @returns {string} A randomly selected 5-letter word in lowercase.
 * @throws {Error} If a valid string cannot be retrieved from the target words list.
 */
export function getRandomTargetWord(): string {
  const randomIdx = Math.floor(Math.random() * targetWords.length);
  const randomWord = targetWords[randomIdx];
  if (typeof randomWord !== 'string') {
    throw new Error('[Words]: Failed to grab a random target word');
  }
  return randomWord.toLowerCase();
}

export function isValidWord(word: string): boolean {
  return validWords.has(word.toLowerCase());
}
