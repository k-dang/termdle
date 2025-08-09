import { Box, Text, useInput } from 'ink';
import { Letter } from './Letter';
import { useEffect, useState } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { gameStateAtom, makeGuessAtom, recordGameAtom } from '../atoms/game-atoms';

interface GameBoardProps {
  isCompact?: boolean;
}

export const GameBoard = ({ isCompact }: GameBoardProps) => {
  const [letters, setLetters] = useState<string[]>([]);
  const { results, currentGuess, maxGuesses, gameOver, won } = useAtomValue(gameStateAtom);
  const makeGuess = useSetAtom(makeGuessAtom);
  const recordGame = useSetAtom(recordGameAtom);

  // Handle game over state
  useEffect(() => {
    if (gameOver) {
      recordGame(won, currentGuess);
    }
  }, [gameOver, won, currentGuess, recordGame]);

  useInput((input, key) => {
    if (gameOver) {
      return;
    }

    if (key.backspace || key.delete) {
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
    <Box flexDirection="column" marginY={isCompact ? 0 : 1}>
      {/* Show previous guesses first */}
      {results.map((row, i) => {
        return (
          <Box key={i}>
            {row.map((letterResult, i) => (
              <Letter
                key={`${i}`}
                letter={letterResult.letter}
                state={letterResult.state}
                isCompact={isCompact}
              />
            ))}
          </Box>
        );
      })}

      {[...Array(maxGuesses - currentGuess)].map((_, rowIndex) => (
        <Box key={`row-${rowIndex}`} flexDirection="row">
          {[...Array(5)].map((_, i) => (
            <Box
              key={`letter-${i}`}
              width={isCompact ? 3 : 5}
              height={isCompact ? 2 : 3}
              borderStyle="round"
              borderColor="white"
              alignItems="center"
              justifyContent="center"
            >
              {rowIndex == 0 && <Text>{letters[i] || ''}</Text>}
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
};
