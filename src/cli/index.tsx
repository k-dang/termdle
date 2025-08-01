#!/usr/bin/env node

import { exit } from 'process';
import { render } from 'ink';
import { App } from './ui/App';

try {
  const { waitUntilExit } = render(<App />, { exitOnCtrlC: true });
  await waitUntilExit();
  exit();
} catch (error) {
  console.error({ status: 'app exited with error', error });
  exit(1);
}
