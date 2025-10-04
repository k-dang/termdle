import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';

export interface GameStats {
  played: number;
  won: number;
  currentStreak: number;
  maxStreak: number;
  guessDistribution: number[]; // Index 0 = 1 guess, Index 1 = 2 guesses, etc.
}

export class StatsManager {
  private statsFile: string;
  private stats: GameStats;

  constructor() {
    // Store stats in user's home directory
    this.statsFile = join(homedir(), '.terminal-wordle-stats.json');
    this.stats = this.loadStats();
  }

  private loadStats(): GameStats {
    const defaultStats: GameStats = {
      played: 0,
      won: 0,
      currentStreak: 0,
      maxStreak: 0,
      guessDistribution: [0, 0, 0, 0, 0, 0], // 6 possible guess counts
    };

    try {
      if (existsSync(this.statsFile)) {
        const data = readFileSync(this.statsFile, 'utf8');
        const loadedStats = JSON.parse(data);

        // Ensure all properties exist (for backward compatibility)
        return {
          ...defaultStats,
          ...loadedStats,
          guessDistribution: loadedStats.guessDistribution || defaultStats.guessDistribution,
        };
      }
    } catch (error) {
      console.error(error);
      console.warn('Could not load stats file, using defaults');
    }

    return defaultStats;
  }

  private saveStats(): void {
    try {
      writeFileSync(this.statsFile, JSON.stringify(this.stats, null, 2));
    } catch (error) {
      console.error(error);
      console.warn('Could not save stats file');
    }
  }

  public recordGame(won: boolean, guessCount?: number): void {
    this.stats.played++;

    if (won && guessCount) {
      this.stats.won++;
      this.stats.currentStreak++;

      this.stats.maxStreak = Math.max(this.stats.maxStreak, this.stats.currentStreak);

      // Record guess distribution (guessCount is 1-indexed, array is 0-indexed)
      if (guessCount >= 1 && guessCount <= 6) {
        this.stats.guessDistribution[guessCount - 1]!++;
      }
    } else {
      // Lost the game
      this.stats.currentStreak = 0;
    }

    this.saveStats();
  }

  public getStats(): GameStats {
    return { ...this.stats };
  }

  public resetStats(): void {
    this.stats = {
      played: 0,
      won: 0,
      currentStreak: 0,
      maxStreak: 0,
      guessDistribution: [0, 0, 0, 0, 0, 0],
    };
    this.saveStats();
  }

  public getWinPercentage(): number {
    if (this.stats.played === 0) return 0;
    return Math.round((this.stats.won / this.stats.played) * 100);
  }

  public getAverageGuesses(): number {
    if (this.stats.won === 0) return 0;

    let totalGuesses = 0;
    for (const [i, guesses] of this.stats.guessDistribution.entries()) {
      totalGuesses += (i + 1) * guesses;
    }

    return Math.round((totalGuesses / this.stats.won) * 100) / 100;
  }
}
