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
      guessDistribution: [0, 0, 0, 0, 0, 0] // 6 possible guess counts
    };

    try {
      if (existsSync(this.statsFile)) {
        const data = readFileSync(this.statsFile, 'utf8');
        const loadedStats = JSON.parse(data);
        
        // Ensure all properties exist (for backward compatibility)
        return {
          ...defaultStats,
          ...loadedStats,
          guessDistribution: loadedStats.guessDistribution || defaultStats.guessDistribution
        };
      }
    } catch (error) {
      console.warn('Could not load stats file, using defaults');
    }

    return defaultStats;
  }

  private saveStats(): void {
    try {
      writeFileSync(this.statsFile, JSON.stringify(this.stats, null, 2));
    } catch (error) {
      console.warn('Could not save stats file');
    }
  }

  public recordGame(won: boolean, guessCount?: number): void {
    this.stats.played++;

    if (won && guessCount) {
      this.stats.won++;
      this.stats.currentStreak++;
      
      if (this.stats.currentStreak > this.stats.maxStreak) {
        this.stats.maxStreak = this.stats.currentStreak;
      }

      // Record guess distribution (guessCount is 1-indexed, array is 0-indexed)
      if (guessCount >= 1 && guessCount <= 6) {
        this.stats.guessDistribution[guessCount - 1]++;
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
      guessDistribution: [0, 0, 0, 0, 0, 0]
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
    for (let i = 0; i < this.stats.guessDistribution.length; i++) {
      totalGuesses += (i + 1) * this.stats.guessDistribution[i];
    }
    
    return Math.round((totalGuesses / this.stats.won) * 100) / 100;
  }

  public showDetailedStats(): void {
    const stats = this.getStats();
    console.log('📊 Detailed Statistics:');
    console.log('─'.repeat(40));
    console.log(`Games Played: ${stats.played}`);
    console.log(`Games Won: ${stats.won}`);
    console.log(`Win Rate: ${this.getWinPercentage()}%`);
    console.log(`Current Streak: ${stats.currentStreak}`);
    console.log(`Max Streak: ${stats.maxStreak}`);
    console.log(`Average Guesses: ${this.getAverageGuesses()}`);
    console.log();
    
    if (stats.won > 0) {
      console.log('Guess Distribution:');
      for (let i = 0; i < stats.guessDistribution.length; i++) {
        const count = stats.guessDistribution[i];
        const percentage = stats.won > 0 ? Math.round((count / stats.won) * 100) : 0;
        const bar = '█'.repeat(Math.floor(percentage / 5)); // Scale down for display
        console.log(`${i + 1}: ${count.toString().padStart(3)} (${percentage.toString().padStart(2)}%) ${bar}`);
      }
    }
    console.log();
  }
}
