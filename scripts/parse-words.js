import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the word list file
const inputFile = path.join(__dirname, 'valid-wordle-words.txt');
const outputFile = path.join(__dirname, 'words-array.js');

try {
  // Read the file content
  const content = fs.readFileSync(inputFile, 'utf8');
  
  // Split by newlines and filter out empty lines
  const words = content
    .split('\n')
    .map(word => word.trim())
    .filter(word => word.length > 0);
  
  // Create the JavaScript array string
  const arrayString = `const validWords = [\n${words.map(word => `  '${word}'`).join(',\n')}\n];\n\nexport default validWords;`;
  
  // Write to output file
  fs.writeFileSync(outputFile, arrayString);
  
  console.log(`✅ Successfully parsed ${words.length} words`);
  console.log(`📁 Output written to: ${outputFile}`);
  console.log(`📊 First 5 words: ${words.slice(0, 5).join(', ')}`);
  
} catch (error) {
  console.error('❌ Error parsing words:', error.message);
  process.exit(1);
}
