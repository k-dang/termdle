import { Box, Text } from 'ink';
import Gradient from 'ink-gradient';
import { getAsciiArtWidth } from '../utils/text';

const asciiArt = `
████████╗███████╗██████╗ ███╗   ███╗██████╗ ██╗     ███████╗
╚══██╔══╝██╔════╝██╔══██╗████╗ ████║██╔══██╗██║     ██╔════╝
   ██║   █████╗  ██████╔╝██╔████╔██║██║  ██║██║     █████╗  
   ██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║██║  ██║██║     ██╔══╝  
   ██║   ███████╗██║  ██║██║ ╚═╝ ██║██████╔╝███████╗███████╗
   ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═════╝ ╚══════╝╚══════╝
`;

const smallAsciiArt = `Termdle`;

interface HeaderProps {
  terminalWidth: number;
  terminalHeight: number;
}

export const Header = ({ terminalWidth, terminalHeight }: HeaderProps) => {
  const width = getAsciiArtWidth(asciiArt);

  const displayTitle =
    terminalWidth >= width && terminalHeight >= 30 ? asciiArt.trim() : smallAsciiArt;
  const artWidth = getAsciiArtWidth(displayTitle);

  return (
    <Box flexDirection="column" width={artWidth} alignItems="flex-start">
      <Gradient name="vice">
        <Text>{displayTitle}</Text>
      </Gradient>
    </Box>
  );
};
