import chalk from 'chalk';
import { LetterResult, LetterState, GameState } from './game.js';

export class Display {
  public static clearScreen(): void {
    console.clear();
  }

  public static showTitle(): void {
    console.log(chalk.bold.blue('🟢 TERMINAL WORDLE 🟡'));
    console.log(chalk.gray('═'.repeat(50)));
    console.log();
  }

  public static showInstructions(): void {
    console.log(chalk.bold('How to play:'));
    console.log('• Guess the 5-letter word in 6 tries');
    console.log('• ' + chalk.bgGreen.black(' GREEN ') + ' = correct letter in correct position');
    console.log('• ' + chalk.bgYellow.black(' YELLOW ') + ' = correct letter in wrong position');
    console.log('• ' + chalk.bgGray.black(' GRAY ') + ' = letter not in word');
    console.log();
  }

  public static showGameBoard(gameState: GameState): void {
    const { results, currentGuess, maxGuesses } = gameState;

    console.log(chalk.bold('Game Board:'));
    console.log('─'.repeat(30));

    // Show completed guesses
    for (let i = 0; i < results.length; i++) {
      const row = results[i];
      let display = '';
      
      for (const letterResult of row) {
        const styledLetter = this.styleLetterResult(letterResult);
        display += styledLetter + ' ';
      }
      
      console.log(`${i + 1}. ${display}`);
    }

    // Show remaining empty rows
    for (let i = currentGuess; i < maxGuesses; i++) {
      const emptyRow = '⬜ '.repeat(5);
      console.log(`${i + 1}. ${emptyRow}`);
    }

    console.log('─'.repeat(30));
    console.log();
  }

  private static styleLetterResult(letterResult: LetterResult): string {
    const letter = letterResult.letter.toUpperCase();
    
    switch (letterResult.state) {
      case LetterState.CORRECT:
        return chalk.bgGreen.black(` ${letter} `);
      case LetterState.PRESENT:
        return chalk.bgYellow.black(` ${letter} `);
      case LetterState.ABSENT:
        return chalk.bgGray.black(` ${letter} `);
      default:
        return chalk.gray(` ${letter} `);
    }
  }

  public static showGameStatus(gameState: GameState): void {
    const { currentGuess, maxGuesses, gameOver, won } = gameState;

    if (gameOver) {
      if (won) {
        console.log(chalk.green.bold('🎉 Congratulations! You won! 🎉'));
        console.log(chalk.green(`You solved it in ${currentGuess} ${currentGuess === 1 ? 'guess' : 'guesses'}!`));
      } else {
        console.log(chalk.red.bold('💀 Game Over! 💀'));
        console.log(chalk.red(`The word was: ${chalk.bold(gameState.targetWord.toUpperCase())}`));
      }
    } else {
      const remaining = maxGuesses - currentGuess;
      console.log(chalk.blue(`Guesses remaining: ${remaining}`));
    }
    console.log();
  }

  public static showError(message: string): void {
    console.log(chalk.red(`❌ ${message}`));
    console.log();
  }

  public static showSuccess(message: string): void {
    console.log(chalk.green(`✅ ${message}`));
    console.log();
  }

  public static showPrompt(): void {
    process.stdout.write(chalk.cyan('Enter your guess (5 letters): '));
  }

  public static showGameOverOptions(): void {
    console.log(chalk.bold('What would you like to do?'));
    console.log(chalk.gray('• Type "play" or "p" to play again'));
    console.log(chalk.gray('• Type "quit" or "q" to exit'));
    console.log();
  }

  public static showKeyboard(gameState: GameState): void {
    const { results } = gameState;
    
    // Track letter states across all guesses
    const letterStates = new Map<string, LetterState>();
    
    for (const row of results) {
      for (const letterResult of row) {
        const letter = letterResult.letter.toLowerCase();
        const currentState = letterStates.get(letter);
        
        // Priority: CORRECT > PRESENT > ABSENT
        if (!currentState || 
            (letterResult.state === LetterState.CORRECT) ||
            (letterResult.state === LetterState.PRESENT && currentState === LetterState.ABSENT)) {
          letterStates.set(letter, letterResult.state);
        }
      }
    }

    // Define keyboard layout
    const rows = [
      'qwertyuiop',
      'asdfghjkl',
      'zxcvbnm'
    ];

    console.log(chalk.bold('Keyboard:'));
    console.log('─'.repeat(30));

    for (const row of rows) {
      let display = '';
      for (const letter of row) {
        const state = letterStates.get(letter);
        let styledLetter: string;
        
        if (state) {
          switch (state) {
            case LetterState.CORRECT:
              styledLetter = chalk.bgGreen.black(` ${letter.toUpperCase()} `);
              break;
            case LetterState.PRESENT:
              styledLetter = chalk.bgYellow.black(` ${letter.toUpperCase()} `);
              break;
            case LetterState.ABSENT:
              styledLetter = chalk.bgGray.black(` ${letter.toUpperCase()} `);
              break;
          }
        } else {
          styledLetter = chalk.bgWhite.black(` ${letter.toUpperCase()} `);
        }
        
        display += styledLetter + ' ';
      }
      console.log(`  ${display}`);
    }
    console.log();
  }

  public static showStats(stats: { played: number; won: number; currentStreak: number; maxStreak: number }): void {
    console.log(chalk.bold('Statistics:'));
    console.log('─'.repeat(30));
    console.log(`Games Played: ${stats.played}`);
    console.log(`Games Won: ${stats.won}`);
    console.log(`Win Rate: ${stats.played > 0 ? Math.round((stats.won / stats.played) * 100) : 0}%`);
    console.log(`Current Streak: ${stats.currentStreak}`);
    console.log(`Max Streak: ${stats.maxStreak}`);
    console.log();
  }
}
