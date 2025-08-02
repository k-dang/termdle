import { Box, Text } from 'ink';
import { useAtomValue } from 'jotai';
import { getStatsAtom } from '../atoms/game-atoms';

interface StatisticsProps {
  isCompact?: boolean;
}

export const Statistics = ({ isCompact }: StatisticsProps) => {
  const stats = useAtomValue(getStatsAtom);

  return (
    <Box flexDirection="column" alignItems="center" marginTop={isCompact ? 0 : 1}>
      <Text bold color="cyan">
        📊 Statistics
      </Text>
      <Box flexDirection="row" gap={isCompact ? 1 : 2}>
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
      <Box flexDirection="row" gap={isCompact ? 1 : 2} marginTop={isCompact ? 0 : 1}>
        <Box flexDirection="column" alignItems="center">
          <Text>Current Streak</Text>
          <Text bold>{stats.currentStreak}</Text>
        </Box>
        <Box flexDirection="column" alignItems="center">
          <Text>Max Streak</Text>
          <Text bold>{stats.maxStreak}</Text>
        </Box>
      </Box>

      <Box flexDirection="column" alignItems="center" marginTop={isCompact ? 0 : 1}>
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
