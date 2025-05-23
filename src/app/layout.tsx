import type { Metadata } from 'next';
import { Anonymous_Pro, Geist } from 'next/font/google';
import './globals.css';

const anonPro = Anonymous_Pro({
  variable: '--font-anon-mono',
  subsets: ['latin'],
  weight: ['400', '700'],
});

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Password Generator & Tester',
  description:
    'Generate strong passwords and secure passphrases instantly. Check their strength and improve your online security with ease.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${anonPro.variable} ${geistSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
