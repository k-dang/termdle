import { exit } from 'process';
import { render } from 'ink';
import { App } from './ui/App';

try {
  const { waitUntilExit } = render(<App />);
  await waitUntilExit();
  console.log('exited');
} catch (error) {
  console.error({ status: 'app exited with error', error });
  exit(1);
}
