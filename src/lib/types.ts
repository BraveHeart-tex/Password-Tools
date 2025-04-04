import type { GENERATION_TYPES } from './constants';

export interface PasswordOptions {
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  specialCharacters: boolean;
}

export interface PassphraseOptions {
  capitalize: boolean;
  includeNumber: boolean;
  wordSeparator: string;
  wordCount: number;
}

export type GenerationType =
  (typeof GENERATION_TYPES)[keyof typeof GENERATION_TYPES];
