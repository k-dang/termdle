import { Box, Text } from 'ink';
import { useAtomValue } from 'jotai';
import { gameStateAtom } from '../atoms/game-atoms';
import { colors } from '../utils/colors';

interface KeyboardProps {
  isCompact?: boolean;
}

export const Keyboard = ({ isCompact }: KeyboardProps) => {
  const rows = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];
  const { letterStates } = useAtomValue(gameStateAtom);

  return (
    <Box flexDirection="column" alignItems="center" marginTop={isCompact ? 0 : 1}>
      {rows.map((row, rowIndex) => (
        <Box key={rowIndex}>
          {row.split('').map((letter) => {
            const state = letterStates.get(letter);
            const color = state == undefined ? 'white' : colors[state];

            return (
              <Box
                key={letter}
                width={isCompact ? 3 : 4}
                height={isCompact ? 2 : 2}
                borderStyle="round"
                borderColor={color}
                alignItems="center"
                justifyContent="center"
              >
                <Text color={color} bold>
                  {letter.toUpperCase()}
                </Text>
              </Box>
            );
          })}
        </Box>
      ))}
    </Box>
  );
};
