import { Box, Text, useApp, useInput } from 'ink';
import { useState } from 'react';
import { Header } from './components/Header';
import { WordleGame } from '../../core/game';

const game = new WordleGame();

export const App = () => {
  const { exit } = useApp();
  const [letters, setLetters] = useState<string[]>([]);
  const { results, currentGuess, maxGuesses } = game.getState();

  useInput((input, key) => {
    if (input === 'q' || (key.ctrl && input === 'c')) {
      exit();
      return;
    }
    if (key.backspace) {
      setLetters((prev) => prev.slice(0, -1));
      return;
    }
    if (/^[a-zA-Z]$/.test(input) && letters.length < 5) {
      setLetters((prev) => [...prev, input.toUpperCase()]);
    }
    if (key.return) {
      const result = game.makeGuess(letters.join(''));

      if (!result.valid) {
        console.log(`${result.message}`);
      }

      setLetters([]);
    }
  });

  return (
    <Box
      flexDirection="column"
      width="100%"
      borderStyle="single"
      borderColor="blue"
      alignItems="center"
    >
      <Header />

      <Box flexDirection="column" marginBottom={1}>
        {/* Show previous guesses first */}
        {results.map((row, i) => {
          return (
            <Box key={i}>
              {row.map((letterResult, i) => (
                <Box
                  key={i}
                  width={5}
                  height={3}
                  borderStyle="round"
                  borderColor="white"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text>
                    {letterResult.letter} {letterResult.state}
                  </Text>
                </Box>
              ))}
            </Box>
          );
        })}

        {[...Array(maxGuesses - currentGuess)].map((_, rowIndex) => (
          <Box key={`row-${rowIndex}`} flexDirection="row">
            {[...Array(5)].map((_, i) => (
              <Box
                key={`letter-${i}`}
                width={5}
                height={3}
                borderStyle="round"
                borderColor="white"
                alignItems="center"
                justifyContent="center"
              >
                {rowIndex == 0 ? <Text>{letters[i] || ''}</Text> : <Text>{''}</Text>}
              </Box>
            ))}
          </Box>
        ))}
      </Box>
      <Text dimColor>Press 'q' or Ctrl+c to exit.</Text>
    </Box>
  );
};
