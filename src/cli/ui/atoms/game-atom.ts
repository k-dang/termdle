import { atom } from 'jotai';
import { WordleGame } from '../../../core/game';

// Writable atom to hold the game instance
export const gameAtom = atom<WordleGame>(new WordleGame());

// Derived atom to get the game state
export const gameStateAtom = atom((get) => get(gameAtom).getState());

// Write-only atom to make a guess and update the game instance
export const makeGuessAtom = atom(null, (get, set, guess: string) => {
  const game = get(gameAtom);
  game.makeGuess(guess);
  // Force update by creating a new instance if needed, or just set to same instance
  set(gameAtom, Object.assign(Object.create(Object.getPrototypeOf(game)), game));
});

// Write-only atom to reset the game
export const resetGameAtom = atom(null, (get, set) => {
  const game = get(gameAtom);
  game.reset();
  set(gameAtom, game);
});
