import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import PasswordGenerator from '@/components/PasswordGenerator';
import PasswordStrengthChecker from '@/components/PasswordStrengthChecker';

export default function Home() {
  return (
    <main className="w-full min-h-screen flex justify-center flex-col bg-primary">
      <Card className="mx-auto w-[95%] md:max-w-[75%] xl:max-w-[65%]">
        <CardContent>
          <div>
            <Tabs defaultValue="generator" className="gap-0">
              <TabsList className="rounded-b-none border border-b-0 w-full flex items-center overflow-auto scrollbar-hidden">
                <TabsTrigger value="generator">
                  Password / Passphrase Generator
                </TabsTrigger>
                <TabsTrigger value="strength-checker">
                  Password Strength Tester
                </TabsTrigger>
              </TabsList>
              <div className="p-4 border rounded-r-lg rounded-bl-lg rounded-tr-none">
                <TabsContent value="generator" className="py-2 pb-4">
                  <PasswordGenerator />
                </TabsContent>
                <TabsContent value="strength-checker" className="py-2 pb-4">
                  <PasswordStrengthChecker />
                </TabsContent>
              </div>
            </Tabs>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
