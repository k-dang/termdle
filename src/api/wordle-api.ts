import { getTodaysDate } from '../core/date';
import { getRandomTargetWord } from '../core/words';

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
      throw new Error(`Failed to fetch daily word: ${response.statusText}`);
    }
    const data = (await response.json()) as NytWordleResponse;
    if (typeof data.solution === 'string' && data.solution.length === 5) {
      return data.solution.toLowerCase();
    }
    throw new Error('Invalid data from NYT API');
  } catch (error) {
    console.error(`[API]: Failed to fetch daily word, falling back to random word. ${error}`);
    return getRandomTargetWord();
  }
}
