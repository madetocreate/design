import type { Metadata } from 'next';
import { Inter, Instrument_Serif } from 'next/font/google';
import './globals.css';

// Body font - similar to SuisseIntl
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-body',
});

// Display font - similar to Atyp Display (thin, elegant)
const instrumentSerif = Instrument_Serif({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-display',
});

export const metadata: Metadata = {
  title: 'Design Studio | Premium Web Design & Development',
  description: 'We create exceptional digital experiences with precision, creativity, and purpose. Premium web design and development studio.',
  keywords: ['web design', 'development', 'premium', 'studio', 'digital experiences'],
  authors: [{ name: 'Design Studio' }],
  openGraph: {
    title: 'Design Studio | Premium Web Design & Development',
    description: 'We create exceptional digital experiences with precision, creativity, and purpose.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${instrumentSerif.variable}`}>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
