import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PasswordGenerator from '@/components/PasswordGenerator';
import PasswordStrengthChecker from '@/components/PasswordStrengthChecker';

export default function Home() {
  return (
    <main className="w-full min-h-screen flex justify-center flex-col bg-primary">
      <Card className="mx-auto w-[95%] md:max-w-[75%] xl:max-w-[65%]">
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
              <PasswordGenerator />
            </TabsContent>
            <TabsContent value="strength-checker" className="my-6">
              <PasswordStrengthChecker />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </main>
  );
}
