import { Box, useStdout } from 'ink';
import { Header } from './components/Header';
import { GameBoard } from './components/GameBoard';
import { GameStatus } from './components/GameStatus';

export const App = () => {
  const { stdout } = useStdout();

  return (
    <Box flexDirection="column" width="100%" alignItems="center" paddingBottom={1}>
      <Header terminalWidth={stdout.columns} />
      <GameBoard />
      <GameStatus />
    </Box>
  );
};
