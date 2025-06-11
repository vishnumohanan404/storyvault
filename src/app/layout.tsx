import './globals.css';

import type { Metadata } from 'next';
import { Geist_Mono, Manrope } from 'next/font/google';

import Footer from '@/components/layout/footer';
import Navbar from '@/components/layout/navbar';

const manropeSans = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Story',
  description: 'Interactive Project Narratives',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${manropeSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
