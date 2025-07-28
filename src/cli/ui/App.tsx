import { Box, Text, useApp, useInput } from 'ink';
import { Header } from './components/Header';
import { useAtomValue } from 'jotai';
import { gameStateAtom } from './atoms/game-atom';
import { GameBoard } from './components/GameBoard';
import { GameStatus } from './components/GameStatus';
import { useEffect } from 'react';

export const App = () => {
  // const { exit } = useApp();
  const gameState = useAtomValue(gameStateAtom);

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
      <GameBoard />
      <GameStatus />
    </Box>
  );
};
