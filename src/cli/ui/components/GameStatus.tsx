import { Box, Text, useApp, useInput } from 'ink';
import { useAtomValue, useSetAtom } from 'jotai';
import { gameStateAtom, resetGameAtom, resetStatsAtom } from '../atoms/game-atoms';
import { useState } from 'react';
import { Statistics } from './Statistics';
import { Keyboard } from './Keyboard';
import Gradient from 'ink-gradient';

interface GameStatusProps {
  isCompact?: boolean;
}

export const GameStatus = ({ isCompact }: GameStatusProps) => {
  const { currentGuess, maxGuesses, gameOver, won, targetWord } = useAtomValue(gameStateAtom);
  const resetGame = useSetAtom(resetGameAtom);
  const resetStats = useSetAtom(resetStatsAtom);
  const [invalidInput, setInvalidInput] = useState(false);
  const { exit } = useApp();

  useInput((input) => {
    if (gameOver) {
      const lowerInput = input.toLowerCase();

      if (lowerInput === 'p' || lowerInput === 'play') {
        resetGame();
        setInvalidInput(false);
      } else if (lowerInput === 'q' || lowerInput === 'quit') {
        exit();
      } else if (lowerInput === 'rs' || lowerInput === 'resetstats') {
        resetStats();
        setInvalidInput(false);
      } else {
        setInvalidInput(true);
        setTimeout(() => setInvalidInput(false), 2000);
      }
    }
  });

  return (
    <Box flexDirection="column" alignItems="center">
      {gameOver ? (
        <Box flexDirection="column" alignItems="center">
          {won ? (
            <Text color="green" bold>
              '🎉 You won! 🎉'
            </Text>
          ) : (
            <Text color="red" bold>
              💀 Game Over! 💀
            </Text>
          )}
          <Text>
            {won
              ? `You solved it in ${currentGuess} ${currentGuess === 1 ? 'guess' : 'guesses'}!`
              : `The word was: ${targetWord.toUpperCase()}`}
          </Text>

          <Statistics isCompact={isCompact} />

          {invalidInput && (
            <Text color="red" italic>
              Invalid input! Press 'p' to play again, or 'q' to quit
            </Text>
          )}

          <Box flexDirection="column" alignItems="center" marginTop={1}>
            <Text bold>What would you like to do?</Text>
            <Text color="gray">Press 'p' to play again | 'q' to quit</Text>
          </Box>
        </Box>
      ) : (
        <Box flexDirection="column" alignItems="center">
          <Gradient name="vice">
            <Text color="blue">Guesses remaining: {maxGuesses - currentGuess}</Text>
          </Gradient>
          <Keyboard isCompact={isCompact} />
        </Box>
      )}
    </Box>
  );
};
