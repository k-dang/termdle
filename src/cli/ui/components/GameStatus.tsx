import { Box, Text, useApp, useInput } from 'ink';
import { useAtomValue, useSetAtom } from 'jotai';
import { gameStateAtom, resetGameAtom } from '../atoms/game-atom';
import { useState } from 'react';

export const GameStatus = () => {
  const { currentGuess, maxGuesses, gameOver, won, targetWord } = useAtomValue(gameStateAtom);
  const resetGame = useSetAtom(resetGameAtom);
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
              🎉 Congratulations! You won! 🎉
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

          {invalidInput && (
            <Text color="red" italic>
              Invalid input! Press 'p' to play again or 'q' to quit
            </Text>
          )}

          <Box flexDirection="column" alignItems="center" marginTop={1}>
            <Text bold>What would you like to do?</Text>
            <Text color="gray">Press 'p' to play again | 'q' to quit</Text>
          </Box>
        </Box>
      ) : (
        <Text color="blue">Guesses remaining: {maxGuesses - currentGuess}</Text>
      )}
    </Box>
  );
};
