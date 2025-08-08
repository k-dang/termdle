import { getTodaysDate } from './date';
import { getRandomTargetWord } from './words';

interface NytWordleResponse {
  id: number;
  solution: string;
}

export async function getDailyWord(): Promise<string> {
  const today = getTodaysDate();
  const url = `https://www.nytimes.com/svc/wordle/v2/${today}.json`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      // If the response is not OK, throw an error to be caught by the catch block
      throw new Error(`Failed to fetch daily word: ${response.statusText}`);
    }
    const data = (await response.json()) as NytWordleResponse;
    if (typeof data.solution === 'string' && data.solution.length === 5) {
      return data.solution.toLowerCase();
    }
    // If the data is invalid, fall through to the catch block's fallback
    throw new Error('Invalid data from NYT API');
  } catch (error) {
    console.error(`[API]: Failed to fetch daily word, falling back to random word. ${error}`);
    return getRandomTargetWord();
  }
}
