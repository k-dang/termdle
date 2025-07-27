import { Box, Text } from 'ink';
import Gradient from 'ink-gradient';

const asciiArt = `
 █████╗ ███████╗ ██████╗██╗██╗
██╔══██╗██╔════╝██╔════╝██║██║
███████║███████╗██║     ██║██║
██╔══██║╚════██║██║     ██║██║
██║  ██║███████║╚██████╗██║██║
╚═╝  ╚═╝╚══════╝ ╚═════╝╚═╝╚═╝
`;

export const Header = () => {
  return (
    <Box flexDirection="column">
      <Gradient name="vice">
        <Text>{asciiArt}</Text>
      </Gradient>
    </Box>
  );
};
