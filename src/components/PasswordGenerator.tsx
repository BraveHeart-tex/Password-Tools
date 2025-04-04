'use client';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  DEFAULT_PASSWORD_LENGTH,
  GENERATION_TYPES,
  DEFAULT_PASSPHRASE_LENGTH,
  PASSPHRASE_WORD_COUNT_CONFIG,
  PASSWORD_LENGTHS,
  PASSWORD_SCORE_TEXT_CLASSES,
} from '@/lib/constants';
import { generatePassphrase, generatePassword } from '@/lib/generate';
import type {
  PasswordOptions,
  GenerationType,
  PassphraseOptions,
  PasswordScoreLabel,
} from '@/lib/types';
import { cn, passwordOrPhraseScoreToLabel } from '@/lib/utils';
import {
  CircleHelpIcon,
  ClipboardIcon,
  MinusIcon,
  PlusIcon,
  RefreshCwIcon,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { zxcvbnAsync } from '@zxcvbn-ts/core';

const defaultPasswordOptions: PasswordOptions = {
  uppercase: true,
  lowercase: true,
  numbers: true,
  specialCharacters: false,
};

const defaultPassphraseOptions: PassphraseOptions = {
  capitalize: true,
  includeNumber: false,
  wordSeparator: '-',
  wordCount: DEFAULT_PASSPHRASE_LENGTH,
};

const PasswordGenerator = () => {
  const [copied, setCopied] = useState(false);
  const [type, setType] = useState<GenerationType>(GENERATION_TYPES.PASSWORD);
  const [characterLength, setCharacterLength] = useState(
    DEFAULT_PASSWORD_LENGTH
  );
  const [passwordOptions, setPasswordOptions] = useState<PasswordOptions>(
    defaultPasswordOptions
  );
  const [passphraseOptions, setPassphraseOptions] = useState<PassphraseOptions>(
    defaultPassphraseOptions
  );
  const [passwordStats, setPasswordStats] = useState({
    score: '',
    timeToCrack: '',
  });
  const checkedOptionsCount =
    Object.values(passwordOptions).filter(Boolean).length;

  const [generatedResult, setGeneratedResult] = useState('');

  useEffect(() => {
    (async () => {
      await generatePasswordOrPhrase();
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await generatePasswordOrPhrase();
    })();
  }, [type, passwordOptions, characterLength, passphraseOptions]);

  const copyToClipboard = async () => {
    if (!generatedResult) {
      alert(
        'No password / passphrase is generated. Please generate one to copy to your clipboard.'
      );
      return;
    }

    await navigator.clipboard.writeText(generatedResult);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2500);
  };

  async function generatePasswordOrPhrase() {
    const result =
      type === GENERATION_TYPES.PASSWORD
        ? generatePassword(passwordOptions, characterLength)
        : generatePassphrase(passphraseOptions);

    setGeneratedResult(result);

    const analysis = await zxcvbnAsync(result);
    setPasswordStats({
      score: passwordOrPhraseScoreToLabel(analysis.score),
      timeToCrack:
        analysis.crackTimesDisplay.offlineSlowHashing1e4PerSecond.toString(),
    });
  }

  const handlePasswordOptionChange = (
    key: keyof PasswordOptions,
    value: PasswordOptions[keyof PasswordOptions]
  ) => {
    setPasswordOptions((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handlePassphraseOptionChange = (
    key: keyof PassphraseOptions,
    value: PassphraseOptions[keyof PassphraseOptions]
  ) => {
    setPassphraseOptions((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const getFontSizeClass = () => {
    const length = generatedResult.length;

    if (length <= 20) return 'text-2xl md:text-4xl';
    if (length <= 35) return 'text-xl md:text-3xl';
    if (length <= 50) return 'text-lg md:text-2xl';
    if (length <= 70) return 'text-base md:text-xl';

    return 'text-sm md:text-lg';
  };

  const getStyledPasswordSpans = (value: string) => {
    return value.split('').map((char, idx) => {
      let className = '';

      if (/\d/.test(char)) {
        className = 'text-blue-700';
      } else if (/[^a-zA-Z0-9]/.test(char)) {
        className = 'text-red-700';
      }

      return (
        <span key={idx} className={className}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="w-full grid md:grid-cols-2 gap-4">
        <div className="font-medium text-base">
          <span>
            Your{' '}
            {type === GENERATION_TYPES.PASSWORD ? "password's" : 'passphrase'}{' '}
            score:
          </span>
          <span
            className={cn(
              'font-bold',
              PASSWORD_SCORE_TEXT_CLASSES[
                passwordStats.score as PasswordScoreLabel
              ]
            )}
          >
            {' '}
            {passwordStats.score}
          </span>
        </div>
        <div className="font-medium text-base">
          <span>Estimated time to crack: </span>
          <span
            className={cn(
              'font-bold',
              PASSWORD_SCORE_TEXT_CLASSES[
                passwordStats.score as PasswordScoreLabel
              ]
            )}
          >
            {' '}
            {passwordStats.timeToCrack}
          </span>
        </div>
      </div>
      <div
        className={
          'rounded-md bg-muted p-4 px-2 text-center font-[700] font-mono min-h-[5.5rem] flex items-center justify-center overflow-auto'
        }
      >
        <span
          className={cn(
            'w-full break-words whitespace-pre-wrap text-balance',
            getFontSizeClass()
          )}
        >
          {getStyledPasswordSpans(generatedResult)}
        </span>
      </div>
      <div className="grid gap-2 md:grid-cols-2">
        <Button
          onClick={copyToClipboard}
          variant={copied ? 'success' : 'default'}
        >
          <ClipboardIcon />
          {copied ? 'Copied!' : 'Copy to clipboard'}
        </Button>
        <Button onClick={generatePasswordOrPhrase} variant="outline">
          <RefreshCwIcon />
          Regenerate
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="grid gap-1">
          <Label className="text-lg">Type</Label>
          <RadioGroup
            defaultValue="password"
            className="flex items-center gap-2"
            onValueChange={(value: GenerationType) => setType(value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="password" id="type.password" />
              <Label htmlFor="type.password">Password</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="passphrase" id="type.passphrase" />
              <Label htmlFor="type.passphrase">Passphrase</Label>
            </div>
          </RadioGroup>
        </div>
        {type === GENERATION_TYPES.PASSWORD ? (
          <div className="grid gap-1">
            <Label className="text-lg">
              Characters:
              <span>{characterLength}</span>
            </Label>
            <Slider
              max={PASSWORD_LENGTHS.MAX}
              min={PASSWORD_LENGTHS.MIN}
              value={[characterLength]}
              onValueChange={(value) => {
                setCharacterLength(value[0] || 0);
              }}
            />
          </div>
        ) : (
          <div className="grid gap-1">
            <Label className="text-lg">Word Count</Label>
            <div className="w-full flex items-center gap-1">
              <Button
                size="icon"
                disabled={
                  passphraseOptions.wordCount ===
                  PASSPHRASE_WORD_COUNT_CONFIG.MIN
                }
                onClick={() => {
                  handlePassphraseOptionChange(
                    'wordCount',
                    passphraseOptions.wordCount - 1
                  );
                }}
              >
                <MinusIcon />
              </Button>
              <Input
                type="number"
                className="w-15"
                min={PASSPHRASE_WORD_COUNT_CONFIG.MIN}
                max={PASSPHRASE_WORD_COUNT_CONFIG.MAX}
                value={passphraseOptions.wordCount}
                onChange={(event) =>
                  handlePassphraseOptionChange('wordCount', +event.target.value)
                }
              />
              <Button
                size="icon"
                disabled={
                  passphraseOptions.wordCount ===
                  PASSPHRASE_WORD_COUNT_CONFIG.MAX
                }
                onClick={() => {
                  handlePassphraseOptionChange(
                    'wordCount',
                    passphraseOptions.wordCount + 1
                  );
                }}
              >
                <PlusIcon />
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className="grid gap-1">
        <Label className="text-lg">Additional Options</Label>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            {type === GENERATION_TYPES.PASSWORD ? (
              <>
                <Checkbox
                  id="passwordOptions.uppercase"
                  checked={passwordOptions.uppercase}
                  disabled={
                    passwordOptions.uppercase && checkedOptionsCount === 1
                  }
                  onCheckedChange={(checked) =>
                    handlePasswordOptionChange('uppercase', !!checked)
                  }
                />
                <Label htmlFor="passwordOptions.uppercase">A-Z</Label>
              </>
            ) : (
              <>
                <Checkbox
                  id="passphraseOptions.capitalize"
                  checked={passphraseOptions.capitalize}
                  onCheckedChange={(checked) =>
                    handlePassphraseOptionChange('capitalize', !!checked)
                  }
                />
                <Label htmlFor="passphraseOptions.capitalize">Capitalize</Label>
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            {type === GENERATION_TYPES.PASSWORD ? (
              <>
                <Checkbox
                  id="passwordOptions.lowercase"
                  checked={passwordOptions.lowercase}
                  disabled={
                    passwordOptions.lowercase && checkedOptionsCount === 1
                  }
                  onCheckedChange={(checked) =>
                    handlePasswordOptionChange('lowercase', !!checked)
                  }
                />
                <Label htmlFor="passwordOptions.lowercase">a-z</Label>
              </>
            ) : (
              <>
                <Checkbox
                  id="passphraseOptions.includeNumber"
                  checked={passphraseOptions.includeNumber}
                  onCheckedChange={(checked) =>
                    handlePassphraseOptionChange('includeNumber', !!checked)
                  }
                />
                <Label htmlFor="passphraseOptions.includeNumber">
                  Include number
                </Label>
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            {type === GENERATION_TYPES.PASSWORD ? (
              <>
                <Checkbox
                  id="passwordOptions.numbers"
                  checked={passwordOptions.numbers}
                  disabled={
                    passwordOptions.numbers && checkedOptionsCount === 1
                  }
                  onCheckedChange={(checked) =>
                    handlePasswordOptionChange('numbers', !!checked)
                  }
                />
                <Label htmlFor="passwordOptions.numbers">0-9</Label>
              </>
            ) : (
              <>
                <Input
                  id="passphraseOptions.wordSeparator"
                  value={passphraseOptions.wordSeparator}
                  type="text"
                  minLength={1}
                  maxLength={1}
                  onChange={(event) => {
                    handlePassphraseOptionChange(
                      'wordSeparator',
                      event.target.value
                    );
                  }}
                  className="w-10 text-lg text-center"
                />
                <div className="flex items-center gap-1">
                  <Label htmlFor="passphraseOptions.wordSeparator">
                    Word Separator
                  </Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <CircleHelpIcon />
                      </TooltipTrigger>
                      <TooltipContent>
                        Enter a character to separate words <br />
                        (e.g., "+" → "word1+word2+word3").
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </>
            )}
          </div>
          {type === GENERATION_TYPES.PASSWORD ? (
            <div className="flex items-center gap-2">
              <Checkbox
                id="passwordOptions.specialCharacters"
                checked={passwordOptions.specialCharacters}
                disabled={
                  passwordOptions.specialCharacters && checkedOptionsCount === 1
                }
                onCheckedChange={(checked) =>
                  handlePasswordOptionChange('specialCharacters', !!checked)
                }
              />
              <Label htmlFor="passwordOptions.specialCharacters">!@#$%&*</Label>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};
export default PasswordGenerator;
