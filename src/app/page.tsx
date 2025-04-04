'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  DEFAULT_CHARACTER_LENGTH,
  GENERATION_TYPES,
  PASSWORD_LENGTHS,
} from '@/lib/constants';
import { generatePassphrase, generatePassword } from '@/lib/generate';
import type {
  PasswordOptions,
  GenerationType,
  PassphraseOptions,
} from '@/lib/types';
import { CircleHelpIcon, ClipboardIcon, RefreshCwIcon } from 'lucide-react';
import { useEffect, useState } from 'react';

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
  wordCount: 4,
};

export default function Home() {
  const [copied, setCopied] = useState(false);
  const [type, setType] = useState<GenerationType>(GENERATION_TYPES.PASSWORD);
  const [characterLength, setCharacterLength] = useState(
    DEFAULT_CHARACTER_LENGTH
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
    const password = generatePassword(
      defaultPasswordOptions,
      DEFAULT_CHARACTER_LENGTH
    );
    setGeneratedResult(password);
  }, []);

  useEffect(() => {
    generate();
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

  function generate() {
    setGeneratedResult(
      type === GENERATION_TYPES.PASSWORD
        ? generatePassword(passwordOptions, characterLength)
        : generatePassphrase(passphraseOptions)
    );
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

  return (
    <main className="w-full min-h-screen flex justify-center flex-col bg-primary">
      <Card className="mx-auto w-[95%] md:max-w-[75%] lg:max-w-[45%]">
        <CardContent>
          <Tabs defaultValue="generator">
            <TabsList>
              <TabsTrigger value="generator">
                Password / Passphrase Generator
              </TabsTrigger>
              <TabsTrigger value="strength-checker">
                Password Strength Tester
              </TabsTrigger>
            </TabsList>
            <TabsContent value="generator" className="flex flex-col gap-6 my-6">
              <div className="w-full grid grid-cols-2 gap-4">
                <div className="font-medium text-base">
                  <span>
                    Your{' '}
                    {type === GENERATION_TYPES.PASSWORD
                      ? "password's"
                      : 'passphrase'}{' '}
                    score:
                  </span>
                  <span>{passwordStats.score}</span>
                </div>
                <div className="font-medium text-base">
                  <span>Estimated time to crack:</span>
                  <span>{passwordStats.timeToCrack}</span>
                </div>
              </div>
              <div
                className="rounded-md bg-muted w-full p-4 text-center font-[700] text-4xl font-mono 
  whitespace-pre-wrap break-words overflow-hidden"
              >
                {generatedResult}
              </div>
              <div className="grid gap-2 md:grid-cols-2">
                <Button
                  onClick={copyToClipboard}
                  variant={copied ? 'success' : 'default'}
                >
                  <ClipboardIcon />
                  {copied ? 'Copied!' : 'Copy to clipboard'}
                </Button>
                <Button onClick={generate} variant="outline">
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
                ) : null}
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
                            passwordOptions.uppercase &&
                            checkedOptionsCount === 1
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
                            handlePassphraseOptionChange(
                              'capitalize',
                              !!checked
                            )
                          }
                        />
                        <Label htmlFor="passphraseOptions.capitalize">
                          Capitalize
                        </Label>
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
                            passwordOptions.lowercase &&
                            checkedOptionsCount === 1
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
                            handlePassphraseOptionChange(
                              'includeNumber',
                              !!checked
                            )
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
                          passwordOptions.specialCharacters &&
                          checkedOptionsCount === 1
                        }
                        onCheckedChange={(checked) =>
                          handlePasswordOptionChange(
                            'specialCharacters',
                            !!checked
                          )
                        }
                      />
                      <Label htmlFor="passwordOptions.specialCharacters">
                        !@#$%&*
                      </Label>
                    </div>
                  ) : null}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="strength-checker">strength checker</TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </main>
  );
}
