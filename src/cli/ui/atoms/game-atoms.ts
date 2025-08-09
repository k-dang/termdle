import { atom } from 'jotai';
import { GameState, WordleGame } from '../../../core/game';
import { StatsManager } from '../../../core/stats';

const statsManager = new StatsManager();

// TODO make this non nullable
export const gameAtom = atom<WordleGame | null>(null);

export const gameStateAtom = atom<GameState | null>(null);

export const makeGuessAtom = atom(null, (_get, set, guess: string) => {
  const game = _get(gameAtom);
  if (game) {
    game.makeGuess(guess);
    // Create a new object reference to ensure Jotai detects the change
    set(gameStateAtom, { ...game.getState() });
  }
});

export const resetGameAtom = atom(null, async (_get, set) => {
  const game = _get(gameAtom);
  if (game) {
    game.reset();
    // Create a new object reference to ensure Jotai detects the change
    set(gameStateAtom, { ...game.getState() });
  }
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
