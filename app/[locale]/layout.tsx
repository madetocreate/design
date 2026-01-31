import { NextIntlClientProvider } from 'next-intl'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { locales, type Locale } from '@/i18n/config'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { SmoothScrollProvider } from '@/components/providers/SmoothScroll'

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  // Validate locale
  if (!locales.includes(locale as Locale)) {
    notFound()
  }

  // Enable static rendering
  setRequestLocale(locale)

  // Get messages for the locale
  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <SmoothScrollProvider>
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
      </SmoothScrollProvider>
    </NextIntlClientProvider>
  )
}
