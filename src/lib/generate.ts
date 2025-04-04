import type { PassphraseOptions, PasswordOptions } from './types';
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

export const generatePassphrase = ({
  wordCount,
  includeNumber,
  capitalize,
  wordSeparator,
}: PassphraseOptions): string => {
  const getRandomWord = () =>
    dicewareList[Math.floor(Math.random() * dicewareList.length)];

  let words = Array.from({ length: wordCount }, getRandomWord);

  if (includeNumber) {
    const index = Math.floor(Math.random() * words.length);
    const number = Math.floor(Math.random() * 9);
    words[index] += number;
  }

  if (capitalize) {
    words = words.map((word) => word.charAt(0).toUpperCase() + word.slice(1));
  }

  return words.join(wordSeparator);
};
