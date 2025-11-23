import { Box, Text } from 'ink';
import { Header } from '@/cli/ui/components/Header';
import { GameBoard } from '@/cli/ui/components/GameBoard';
import { GameStatus } from '@/cli/ui/components/GameStatus';
import { useTerminalSize } from '@/cli/ui/hooks/useTerminalSize';

interface AppProps {
  initialMessage?: string | null;
}

export const App = ({ initialMessage }: AppProps) => {
  const { rows: terminalHeight, columns: terminalWidth } = useTerminalSize();
  const isCompact = terminalWidth < 60 || terminalHeight < 30;

  return (
    <Box
      flexDirection="column"
      width={terminalWidth}
      height={terminalHeight}
      alignItems="center"
      justifyContent="flex-start"
      paddingTop={2}
    >
      <Header terminalWidth={terminalWidth} terminalHeight={terminalHeight} />
      {initialMessage && (
        <Box marginTop={1}>
          <Text color="yellow">{initialMessage}</Text>
        </Box>
      )}
      <GameBoard isCompact={isCompact} />
      <GameStatus isCompact={isCompact} />
    </Box>
  );
};
