import { atom } from 'jotai';
import { WordleGame } from '../../../core/game';
import { StatsManager } from '../../../core/stats';

const game = new WordleGame();
const statsManager = new StatsManager();

export const gameStateAtom = atom(game.getState());

export const makeGuessAtom = atom(null, (_get, set, guess: string) => {
  game.makeGuess(guess);
  set(gameStateAtom, game.getState());
});

export const resetGameAtom = atom(null, (_get, set) => {
  game.reset();
  set(gameStateAtom, game.getState());
});

export const getStatsAtom = atom(statsManager.getStats());

export const recordGameAtom = atom(null, (_get, set, won: boolean, guessCount?: number) => {
  statsManager.recordGame(won, guessCount);
  set(getStatsAtom, statsManager.getStats());
});

export const resetStatsAtom = atom(null, (_get, set) => {
  statsManager.resetStats();
  set(getStatsAtom, statsManager.getStats());
});
