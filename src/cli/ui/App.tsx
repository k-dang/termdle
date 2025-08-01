import { Box, Text } from 'ink';
import { Header } from './components/Header';
import { GameBoard } from './components/GameBoard';
import { GameStatus } from './components/GameStatus';
import { useTerminalSize } from './hooks/useTerminalSize';

export const App = () => {
  const { rows: terminalHeight, columns: terminalWidth } = useTerminalSize();

  return (
    <Box flexDirection="column" width={terminalWidth} alignItems="center" justifyContent="center">
      <Header terminalWidth={terminalWidth} />
      <GameBoard />
      <GameStatus />
    </Box>
  );
};
