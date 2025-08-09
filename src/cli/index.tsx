#!/usr/bin/env node

import { exit } from 'process';
import { render } from 'ink';
import { App } from './ui/App';
import { WordleGame } from '../core/game';
import { Provider, createStore } from 'jotai';
import { gameAtom, gameStateAtom } from './ui/atoms/game-atoms';
import { getDailyWord } from '../core/api';

try {
  // Initialize the game before rendering the React app
  const game = new WordleGame();
  const dailyWord = await getDailyWord();
  game.setTargetWord(dailyWord);

  console.log("Daily word is", dailyWord)

  // Create a store with the initial game value
  const store = createStore();
  store.set(gameAtom, game);
  store.set(gameStateAtom, { ...game.getState() });

  const { waitUntilExit } = render(
    <Provider store={store}>
      <App />
    </Provider>,
    { exitOnCtrlC: true }
  );
  await waitUntilExit();
  exit();
} catch (error) {
  console.error({ status: 'app exited with error', error });
  exit(1);
}
