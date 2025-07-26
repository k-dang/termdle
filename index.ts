import readline from 'readline';
import { WordleGame } from './game.js';
import { Display } from './display.js';
import { StatsManager } from './stats.js';

async function playGame() {
  const game = new WordleGame();
  const statsManager = new StatsManager();
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const askQuestion = (question: string): Promise<string> => {
    return new Promise((resolve) => rl.question(question, resolve));
  };

  // Show initial game state
  Display.clearScreen();
  Display.showTitle();
  Display.showInstructions();
  
  while (true) {
    // Show current game state
    Display.showGameBoard(game.getState());
    Display.showKeyboard(game.getState());
    Display.showGameStatus(game.getState());

    if (game.getState().gameOver) {
      // Record the game result
      statsManager.recordGame(game.getState().won, game.getState().currentGuess);
      statsManager.showDetailedStats();
      
      // Ask what to do next
      Display.showGameOverOptions();
      const option = await askQuestion('> ');

      if (option.toLowerCase() === 'play' || option.toLowerCase() === 'p') {
        game.reset();
        Display.clearScreen();
        Display.showTitle();
        Display.showInstructions();
        continue;
      } else if (option.toLowerCase() === 'quit' || option.toLowerCase() === 'q') {
        break;
      } else {
        Display.showError('Please type "play" or "quit"');
        continue;
      }
    } else {
      // Game is still active, get next guess
      Display.showPrompt();
      const guess = await askQuestion('');
      
      if (guess.toLowerCase() === 'quit' || guess.toLowerCase() === 'q') {
        break;
      }
      
      const result = game.makeGuess(guess);

      if (!result.valid) {
        Display.showError(result.message || 'Invalid guess');
        await askQuestion('Press Enter to continue...');
      }
      
      // Clear screen and show updated state
      Display.clearScreen();
      Display.showTitle();
    }
  }

  console.log('\nThanks for playing Terminal Wordle! 👋');
  rl.close();
}

playGame();
