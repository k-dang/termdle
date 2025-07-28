import { Box } from 'ink';
import { Header } from './components/Header';
import { GameBoard } from './components/GameBoard';
import { GameStatus } from './components/GameStatus';

export const App = () => {
  return (
    <Box
      flexDirection="column"
      width="100%"
      borderStyle="single"
      borderColor="blue"
      alignItems="center"
      paddingBottom={1}
    >
      <Header />
      <GameBoard />
      <GameStatus />
    </Box>
  );
};
