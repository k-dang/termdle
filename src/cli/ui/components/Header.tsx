import { Box, Text } from 'ink';
import Gradient from 'ink-gradient';
import { useMemo } from 'react';

const asciiArt = `
████████╗███████╗██████╗ ███╗   ███╗██████╗ ██╗     ███████╗
╚══██╔══╝██╔════╝██╔══██╗████╗ ████║██╔══██╗██║     ██╔════╝
   ██║   █████╗  ██████╔╝██╔████╔██║██║  ██║██║     █████╗  
   ██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║██║  ██║██║     ██╔══╝  
   ██║   ███████╗██║  ██║██║ ╚═╝ ██║██████╔╝███████╗███████╗
   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═════╝ ╚══════╝╚══════╝
`;

const smallAsciiArt = `Termdle`;

export const Header = () => {
  const terminalWidth = useMemo(() => process.stdout?.columns || 50, []);

  if (terminalWidth < 60) {
    return (
      <Gradient name="vice">
        <Text>{smallAsciiArt.trim()}</Text>
      </Gradient>
    );
  }

  return (
    <Box flexDirection="column">
      <Gradient name="vice">
        <Text>{asciiArt.trim()}</Text>
      </Gradient>
    </Box>
  );
};
