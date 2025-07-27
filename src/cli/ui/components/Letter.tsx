import { Box, Text } from 'ink';
import { LetterState } from '../../../core/game';

interface LetterProps {
  letter: string;
  state: LetterState;
}

const colors = {
  [LetterState.CORRECT]: 'green',
  [LetterState.PRESENT]: 'yellow',
  [LetterState.ABSENT]: 'gray',
};

export const Letter = ({ letter, state }: LetterProps) => {
  const color = colors[state];
  return (
    <Box
      width={5}
      height={3}
      borderStyle="double"
      borderColor={color}
      alignItems="center"
      justifyContent="center"
    >
      <Text color={colors[state]}>{letter.toUpperCase()}</Text>
    </Box>
  );
};
