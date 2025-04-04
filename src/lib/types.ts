import type { GENERATION_TYPES } from './constants';

export interface PasswordOptions {
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  specialCharacters: boolean;
}

export type GenerationType =
  (typeof GENERATION_TYPES)[keyof typeof GENERATION_TYPES];
