import type { PasswordOptions } from './types';
import dicewareList from '@/data/diceware.json';

const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
const NUMBERS = '0123456789';
const SPECIAL_CHARACTERS = '!@#$%^&*()_+[]{}|;:,.<>?';

export const generatePassword = (
  options: PasswordOptions,
  length: number
): string => {
  let pool = '';
  if (options.uppercase) pool += UPPERCASE;
  if (options.lowercase) pool += LOWERCASE;
  if (options.numbers) pool += NUMBERS;
  if (options.specialCharacters) pool += SPECIAL_CHARACTERS;

  if (!pool) return '';

  let result = '';

  for (let i = 0; i < length; i++) {
    result += pool[Math.floor(Math.random() * pool.length)];
  }

  return result;
};

export const generatePassphrase = (wordCount = 4, separator = '-'): string => {
  const words = [];
  for (let i = 0; i < wordCount; i++) {
    const randomIndex = Math.floor(Math.random() * dicewareList.length);
    words.push(dicewareList[randomIndex]);
  }

  return words.join(separator);
};
