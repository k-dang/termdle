import { Box, Text, useInput } from 'ink';
import { Letter } from './Letter';
import { useState } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { gameStateAtom, makeGuessAtom } from '../atoms/game-atom';

export const GameBoard = () => {
  const [letters, setLetters] = useState<string[]>([]);
  const { results, currentGuess, maxGuesses } = useAtomValue(gameStateAtom);
  const makeGuess = useSetAtom(makeGuessAtom);

  useInput((input, key) => {
    if (key.backspace) {
      setLetters((prev) => prev.slice(0, -1));
      return;
    }
    if (/^[a-zA-Z]$/.test(input) && letters.length < 5) {
      setLetters((prev) => [...prev, input.toUpperCase()]);
    }
    if (key.return) {
      makeGuess(letters.join(''));
      setLetters([]);
    }
  });

  return (
    <Box flexDirection="column" marginBottom={1}>
      {/* Show previous guesses first */}
      {results.map((row, i) => {
        return (
          <Box key={i}>
            {row.map((letterResult, i) => (
              <Letter key={`${i}`} letter={letterResult.letter} state={letterResult.state} />
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
  );
};
