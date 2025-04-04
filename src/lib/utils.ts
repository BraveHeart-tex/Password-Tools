import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { PasswordScoreLabel } from './types';
import { PASSWORD_SCORE_LABELS } from './constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const passwordOrPhraseScoreToLabel = (
  score: number
): PasswordScoreLabel => {
  switch (score) {
    case 0:
      return PASSWORD_SCORE_LABELS.VERY_WEAK;
    case 1:
      return PASSWORD_SCORE_LABELS.WEAK;
    case 2:
      return PASSWORD_SCORE_LABELS.FAIR;
    case 3:
      return PASSWORD_SCORE_LABELS.STRONG;
    case 4:
      return PASSWORD_SCORE_LABELS.VERY_STRONG;
    default:
      return PASSWORD_SCORE_LABELS.UNKNOWN;
  }
};
