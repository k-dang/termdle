import { Box } from 'ink';
import { Header } from './components/Header';
import { GameBoard } from './components/GameBoard';
import { GameStatus } from './components/GameStatus';
import { useTerminalSize } from './hooks/useTerminalSize';

export const App = () => {
  const { rows: terminalHeight, columns: terminalWidth } = useTerminalSize();
  const isCompact = terminalWidth < 60 || terminalHeight < 30;

  return (
    <Box flexDirection="column" width={terminalWidth} alignItems="center" justifyContent="center">
      <Header terminalWidth={terminalWidth} terminalHeight={terminalHeight} />
      <GameBoard isCompact={isCompact} />
      <GameStatus isCompact={isCompact} />
    </Box>
  );
};
