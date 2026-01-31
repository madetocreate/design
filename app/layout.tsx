import type { Metadata } from 'next';
import { Space_Grotesk } from 'next/font/google';
import './globals.css';

// Primary font - Premium Grotesque
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: 'Studio Meyer | Premium Web Design & Development',
  description: 'We create exceptional digital experiences with precision, creativity, and purpose. Premium web design and development studio based in Germany.',
  keywords: ['web design', 'development', 'premium', 'studio', 'digital experiences', 'Studio Meyer'],
  authors: [{ name: 'Studio Meyer' }],
  openGraph: {
    title: 'Studio Meyer | Premium Web Design & Development',
    description: 'We create exceptional digital experiences with precision, creativity, and purpose.',
    type: 'website',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }],
  },
  icons: {
    icon: '/icon.png',
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className={spaceGrotesk.variable} suppressHydrationWarning>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
