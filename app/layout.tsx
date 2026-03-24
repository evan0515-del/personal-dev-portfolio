import type {Metadata} from 'next';
import {Fraunces, IBM_Plex_Mono, Manrope} from 'next/font/google';

import '@/app/globals.css';
import {siteConfig} from '@/lib/site';

const sans = Manrope({
  subsets: ['latin'],
  variable: '--font-sans'
});

const serif = Fraunces({
  subsets: ['latin'],
  variable: '--font-serif'
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono'
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.intro.en,
  icons: {
    icon: '/favicon.svg'
  }
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
