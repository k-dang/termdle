import { LetterState } from '@/core/game';

export const colors = {
  [LetterState.CORRECT]: 'green',
  [LetterState.PRESENT]: 'yellow',
  [LetterState.ABSENT]: '#383838',
};
