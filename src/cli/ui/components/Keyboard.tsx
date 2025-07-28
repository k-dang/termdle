import { Box, Text } from 'ink';
import { LetterState } from '../../../core/game';
import { useAtomValue } from 'jotai';
import { gameStateAtom } from '../atoms/game-atoms';

export const Keyboard = () => {
  const rows = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];
  const { letterStates } = useAtomValue(gameStateAtom);

  return (
    <Box flexDirection="column" alignItems="center" marginTop={1}>
      {rows.map((row, rowIndex) => (
        <Box key={rowIndex} marginTop={rowIndex > 0 ? 1 : 0}>
          {row.split('').map((letter) => {
            const state = letterStates.get(letter);
            let color = 'white';

            if (state) {
              switch (state) {
                case LetterState.CORRECT:
                  color = 'green';
                  break;
                case LetterState.PRESENT:
                  color = 'yellow';
                  break;
                case LetterState.ABSENT:
                  color = '#383838';
                  break;
              }
            }

            return (
              <Box
                key={letter}
                width={4}
                height={2}
                borderStyle="round"
                borderColor={color}
                alignItems="center"
                justifyContent="center"
                marginRight={1}
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
