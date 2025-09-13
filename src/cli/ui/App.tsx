import { Box } from 'ink';
import { Header } from '@/cli/ui/components/Header';
import { GameBoard } from '@/cli/ui/components/GameBoard';
import { GameStatus } from '@/cli/ui/components/GameStatus';
import { useTerminalSize } from '@/cli/ui/hooks/useTerminalSize';

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
