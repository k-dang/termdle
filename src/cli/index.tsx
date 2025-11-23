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
  let initialMessage: string | null = null;
  if (statsManager.hasCompletedToday()) {
    targetWord = getRandomTargetWord();
    initialMessage = "You have already completed today's daily word. Playing with a random word instead.";
  } else {
    targetWord = await getDailyWord();
  }

  game.setTargetWord(targetWord);

  // Clear screen and move cursor to top
  process.stdout.write('\x1b[2J\x1b[H');

  const { waitUntilExit } = render(<App initialMessage={initialMessage} />, { exitOnCtrlC: true });
  await waitUntilExit();
  exit();
} catch (error) {
  console.error({ status: 'app exited with error', error });
  exit(1);
}
