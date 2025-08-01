import { Box, Text } from 'ink';
import { useAtomValue } from 'jotai';
import { gameStateAtom } from '../atoms/game-atoms';
import { colors } from '../utils/colors';

export const Keyboard = () => {
  const rows = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];
  const { letterStates } = useAtomValue(gameStateAtom);

  return (
    <Box flexDirection="column" alignItems="center" marginTop={1}>
      {rows.map((row, rowIndex) => (
        <Box key={rowIndex}>
          {row.split('').map((letter) => {
            const state = letterStates.get(letter);
            const color = state == undefined ? 'white' : colors[state];

            return (
              <Box
                key={letter}
                width={4}
                height={2}
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
