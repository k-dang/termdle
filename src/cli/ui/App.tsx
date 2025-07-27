import { Box, Text, useApp, useInput } from 'ink';
import { Header } from './components/Header';
import { useAtomValue } from 'jotai';
import { gameStateAtom } from './atoms/game-atom';
import { GameBoard } from './components/GameBoard';
import { useEffect } from 'react';

export const App = () => {
  const { exit } = useApp();
  const gameState = useAtomValue(gameStateAtom);

  useInput((input, key) => {
    if (input === 'q' || (key.ctrl && input === 'c')) {
      exit();
      return;
    }
  });

  useEffect(() => {
    console.log('App:', gameState);
  }, [gameState]);

  return (
    <Box
      flexDirection="column"
      width="100%"
      borderStyle="single"
      borderColor="blue"
      alignItems="center"
    >
      <Header />

      {gameState.gameOver ? <Text>Game over</Text> : <GameBoard />}

      <Text dimColor>Press 'q' or Ctrl+c to exit.</Text>
    </Box>
  );
};
