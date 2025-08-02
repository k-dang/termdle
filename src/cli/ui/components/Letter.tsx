import { Box, Text } from 'ink';
import { LetterState } from '../../../core/game';
import { colors } from '../utils/colors';

interface LetterProps {
  letter: string;
  state: LetterState;
  isCompact?: boolean;
}

export const Letter = ({ letter, state, isCompact }: LetterProps) => {
  const color = colors[state];
  return (
    <Box
      width={isCompact ? 3 : 5}
      height={isCompact ? 2 : 3}
      borderStyle="round"
      borderColor={color}
      alignItems="center"
      justifyContent="center"
    >
      <Text color={color}>{letter.toUpperCase()}</Text>
    </Box>
  );
};
