import { WordleGame } from './game';
import { getRandomTargetWord, isValidWord } from './words';
import { Display } from './display';

// Test basic functionality
console.log('🧪 Testing Terminal Wordle...');
console.log('═'.repeat(40));

// Test 1: Word validation
console.log('\n📝 Testing word validation:');
console.log('"hello" is valid:', isValidWord('hello'));
console.log('"zzzzz" is valid:', isValidWord('zzzzz'));
console.log('"HELLO" is valid:', isValidWord('HELLO'));

// Test 2: Random word generation
console.log('\n🎲 Testing random word generation:');
for (let i = 0; i < 5; i++) {
  console.log(`Random word ${i + 1}:`, getRandomTargetWord());
}

// Test 3: Game logic
console.log('\n🎮 Testing game logic:');
const game = new WordleGame();
console.log('Initial state - Game over:', game.getState().gameOver);
console.log('Initial state - Current guess:', game.getState().currentGuess);

// Make a test guess
const testResult = game.makeGuess('hello');
console.log('Test guess "hello" valid:', testResult.valid);
if (testResult.result) {
  console.log(
    'Result letters:',
    testResult.result.map((r) => `${r.letter}:${r.state}`)
  );
}

// Test 4: Display (non-interactive)
console.log('\n🎨 Testing display formatting:');
Display.showTitle();
Display.showInstructions();

// Show a sample game board
const sampleGame = new WordleGame();
sampleGame.makeGuess('rates');
sampleGame.makeGuess('hello');
Display.showGameBoard(sampleGame.getState());
Display.showKeyboard(sampleGame.getState());

console.log('✅ Basic tests completed!');
console.log('Target word for this test game was:', sampleGame.revealAnswer());
