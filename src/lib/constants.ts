export const GENERATION_TYPES = {
  PASSWORD: 'password',
  PASSPHRASE: 'passphrase',
} as const;

export const PASSWORD_LENGTHS = {
  MAX: 125,
  MIN: 5,
};

export const PASSWORD_SCORES = {
  VERY_WEAK: 'very weak',
  WEAK: 'weak',
  GOOD: 'good',
  STRONG: 'strong',
};

export const DEFAULT_CHARACTER_LENGTH = 14;
