import type { PasswordScoreLabel } from './types';

export const GENERATION_TYPES = {
  PASSWORD: 'password',
  PASSPHRASE: 'passphrase',
} as const;

export const PASSWORD_LENGTHS = {
  MAX: 125,
  MIN: 5,
};

export const PASSWORD_SCORE_LABELS = {
  VERY_WEAK: 'Very Weak',
  WEAK: 'Weak',
  FAIR: 'Fair',
  STRONG: 'Strong',
  VERY_STRONG: 'Very Strong',
  UNKNOWN: 'Unknown',
} as const;

export const DEFAULT_PASSWORD_LENGTH = 14;
export const DEFAULT_PASSPHRASE_LENGTH = 4;

export const PASSPHRASE_WORD_COUNT_CONFIG = {
  MIN: 3,
  MAX: 20,
};

export const PASSWORD_SCORE_TEXT_CLASSES: Record<PasswordScoreLabel, string> = {
  'Very Weak': 'text-red-700',
  Weak: 'text-red-700',
  Fair: 'text-yellow-700',
  Strong: 'text-green-700',
  'Very Strong': 'text-emerald-700',
  Unknown: 'text-muted-foreground',
};
