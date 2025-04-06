import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PasswordGenerator from '@/components/PasswordGenerator';
import PasswordStrengthChecker from '@/components/PasswordStrengthChecker';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="bg-primary">
      <Link
        href="https://github.com/BraveHeart-tex/Password-Tools"
        target="_blank"
        rel="noreferrer"
        className="absolute top-1 right-1"
      >
        <Image
          src="/github.svg"
          alt="Github"
          width={30}
          height={30}
          className="invert"
        />
        <span className="sr-only">
          Navigate to the Github repository of this project
        </span>
      </Link>
      <div className="w-full min-h-screen flex justify-center flex-col gap-6">
        <div className="text-center space-y-1 text-primary-foreground">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Free Password Generator
          </h1>
          <p>
            Inspired by{' '}
            <Link
              href="https://bitwarden.com/password-generator"
              target="_blank"
              rel="noreferrer"
              className="underline text-blue-500 font-medium"
            >
              Bitwarden
            </Link>
          </p>
        </div>
        <Card className="mx-auto w-[95%] md:max-w-[75%] xl:max-w-[65%] py-0 sm:py-6 shadow-none sm:shadow-sm border-0 sm:border">
          <CardContent className="p-0 sm:px-6">
            <div>
              <Tabs defaultValue="generator" className="gap-0">
                <TabsList className="rounded-b-none border border-b-0 w-full flex items-center overflow-auto scrollbar-hidden justify-start">
                  <TabsTrigger value="generator">
                    Password / Passphrase Generator
                  </TabsTrigger>
                  <TabsTrigger value="strength-checker">
                    Password Strength Tester
                  </TabsTrigger>
                </TabsList>
                <div className="p-4 sm:border rounded-r-lg rounded-bl-lg rounded-tr-none">
                  <TabsContent value="generator" className="sm:py-2 sm:pb-4">
                    <PasswordGenerator />
                  </TabsContent>
                  <TabsContent
                    value="strength-checker"
                    className="sm:py-2 sm:pb-4"
                  >
                    <PasswordStrengthChecker />
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
