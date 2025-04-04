'use client';
import { type ChangeEvent, useState } from 'react';
import { Input } from './ui/input';
import { cn, passwordOrPhraseScoreToLabel } from '@/lib/utils';
import { PASSWORD_SCORE_TEXT_CLASSES } from '@/lib/constants';
import type { PasswordScoreLabel } from '@/lib/types';
import { Label } from './ui/label';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { Button } from './ui/button';
import { zxcvbnAsync } from '@zxcvbn-ts/core';

const PasswordStrengthChecker = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordStats, setPasswordStats] = useState({
    score: '',
    timeToCrack: '',
  });

  const handlePasswordChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setEnteredPassword(event.target.value);
    const analysis = await zxcvbnAsync(event.target.value);
    setPasswordStats({
      score: passwordOrPhraseScoreToLabel(analysis.score),
      timeToCrack:
        analysis.crackTimesDisplay.offlineSlowHashing1e4PerSecond.toString(),
    });
  };

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-1">
        <Label>Evaluate Your Password</Label>
        <div className="relative">
          <Input
            id="enteredPassword"
            type={isVisible ? 'text' : 'password'}
            className={cn(
              'h-15 text-3xl!',
              PASSWORD_SCORE_TEXT_CLASSES[
                passwordStats.score as PasswordScoreLabel
              ]
            )}
            value={enteredPassword}
            onChange={handlePasswordChange}
          />
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-3 -translate-y-1/2 top-1/2"
            onClick={() => setIsVisible(!isVisible)}
          >
            {isVisible ? (
              <EyeOffIcon className="size-6" />
            ) : (
              <EyeIcon className="size-6" />
            )}
          </Button>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="grid gap-2">
          <Label className="text-3xl font-medium">
            Your password strength:
          </Label>
          <span
            className={cn(
              'font-bold',
              PASSWORD_SCORE_TEXT_CLASSES[
                passwordStats.score as PasswordScoreLabel
              ]
            )}
          >
            {' '}
            {enteredPassword ? passwordStats.score : '-'}
          </span>
        </div>
        <div className="grid gap-2">
          <Label className="text-3xl font-medium">
            Estimated time to crack:
          </Label>
          <span
            className={cn(
              'font-bold',
              PASSWORD_SCORE_TEXT_CLASSES[
                passwordStats.score as PasswordScoreLabel
              ]
            )}
          >
            {' '}
            {enteredPassword ? passwordStats.timeToCrack : '-'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PasswordStrengthChecker;
