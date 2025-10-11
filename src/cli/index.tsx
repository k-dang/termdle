#!/usr/bin/env node

import { exit } from 'process';
import { render } from 'ink';
import { App } from '@/cli/ui/App';
import { game } from '@/cli/ui/atoms/game-atoms';
import { getDailyWord } from '@/api/wordle-api';
import { StatsManager } from '@/core/stats';
import { getRandomTargetWord } from '@/core/words';

try {
  const statsManager = new StatsManager();

  let targetWord: string;
  if (statsManager.hasCompletedToday()) {
    targetWord = getRandomTargetWord();
    console.log(
      "You have already completed today's daily word. Playing with a random word instead. \n"
    );
  } else {
    targetWord = await getDailyWord();
  }

  game.setTargetWord(targetWord);

  const { waitUntilExit } = render(<App />, { exitOnCtrlC: true });
  await waitUntilExit();
  exit();
} catch (error) {
  console.error({ status: 'app exited with error', error });
  exit(1);
}
