import { Box, Text } from 'ink';
import { useAtomValue } from 'jotai';
import { getStatsAtom } from '../atoms/game-atoms';

export const Statistics = () => {
  const stats = useAtomValue(getStatsAtom);

  return (
    <Box flexDirection="column" alignItems="center" marginTop={1}>
      <Text bold color="cyan">
        📊 Statistics
      </Text>
      <Box flexDirection="row" gap={2}>
        <Box flexDirection="column" alignItems="center">
          <Text>Games Played</Text>
          <Text bold>{stats.played}</Text>
        </Box>
        <Box flexDirection="column" alignItems="center">
          <Text>Games Won</Text>
          <Text bold>{stats.won}</Text>
        </Box>
        <Box flexDirection="column" alignItems="center">
          <Text>Win Rate</Text>
          <Text bold>{stats.played > 0 ? Math.round((stats.won / stats.played) * 100) : 0}%</Text>
        </Box>
      </Box>
      <Box flexDirection="row" gap={2} marginTop={1}>
        <Box flexDirection="column" alignItems="center">
          <Text>Current Streak</Text>
          <Text bold>{stats.currentStreak}</Text>
        </Box>
        <Box flexDirection="column" alignItems="center">
          <Text>Max Streak</Text>
          <Text bold>{stats.maxStreak}</Text>
        </Box>
      </Box>

      <Box flexDirection="column" alignItems="center" marginTop={1}>
        <Text bold>Guess Distribution</Text>
        {stats.guessDistribution.map((count, index) => (
          <Text key={index}>
            {index + 1}: {count}
          </Text>
        ))}
      </Box>
    </Box>
  );
};
