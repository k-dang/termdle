#!/usr/bin/env node

import { exit } from 'process';
import { render } from 'ink';
import { App } from '@/cli/ui/App';
import { game } from '@/cli/ui/atoms/game-atoms';
import { getDailyWord } from '@/core/api';

try {
  const dailyWord = await getDailyWord();
  game.setTargetWord(dailyWord);

  const { waitUntilExit } = render(<App />, { exitOnCtrlC: true });
  await waitUntilExit();
  exit();
} catch (error) {
  console.error({ status: 'app exited with error', error });
  exit(1);
}
