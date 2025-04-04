import type { GENERATION_TYPES, PASSWORD_SCORE_LABELS } from './constants';

export interface PasswordOptions {
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  specialCharacters: boolean;
}

type ValueOfObject<T> = T[keyof T];

export interface PassphraseOptions {
  capitalize: boolean;
  includeNumber: boolean;
  wordSeparator: string;
  wordCount: number;
}

export type GenerationType = ValueOfObject<typeof GENERATION_TYPES>;

export type PasswordScoreLabel = ValueOfObject<typeof PASSWORD_SCORE_LABELS>;
