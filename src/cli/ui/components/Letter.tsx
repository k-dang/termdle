import { Box, Text } from 'ink';
import { LetterState } from '../../../core/game';
import { colors } from '../utils/colors';

interface LetterProps {
  letter: string;
  state: LetterState;
}

export const Letter = ({ letter, state }: LetterProps) => {
  const color = colors[state];
  return (
    <Box
      width={5}
      height={3}
      borderStyle="round"
      borderColor={color}
      alignItems="center"
      justifyContent="center"
    >
      <Text color={color}>{letter.toUpperCase()}</Text>
    </Box>
  );
};
