import { atom } from 'jotai';
import { WordleGame } from '../../../core/game';

const game = new WordleGame();

export const gameStateAtom = atom(game.getState());

export const makeGuessAtom = atom(null, (_get, set, guess: string) => {
  game.makeGuess(guess);
  set(gameStateAtom, game.getState());
});
