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

export const generatePassphrase = (options: PassphraseOptions): string => {
  let words = [];
  for (let i = 0; i < options.wordCount; i++) {
    const randomIndex = Math.floor(Math.random() * dicewareList.length);
    words.push(dicewareList[randomIndex]);
  }

  if (options.includeNumber) {
    const randomIndexToAddNumberTo = Math.floor(Math.random() * words.length);
    words = words.map((word, index) => {
      if (index === randomIndexToAddNumberTo) {
        word += Math.floor(Math.random() * 9);
      }

      return word;
    });
  }

  if (options.capitalize) {
    words = words.map((word) => word[0].toUpperCase() + word.substring(1));
  }

  return words.join(options.wordSeparator);
};
