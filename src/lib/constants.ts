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

export const DEFAULT_PASSWORD_LENGTH = 14;
export const DEFAULT_PASSPHRASE_LENGTH = 4;

export const PASSPHRASE_WORD_COUNT_CONFIG = {
  MIN: 3,
  MAX: 20,
};
