import '../global.css';
import Menu from '@/components/menu/Menu';
import ReduxProvider from '@/app/providers/ReduxProviders';
import { ThemeProvider } from '@/app/providers/ThemeProvider';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <ReduxProvider>
          <ThemeProvider>
            <NextIntlClientProvider locale={locale}>
              <div className="app_wrapper">
                <Menu />
                {children}
              </div>
            </NextIntlClientProvider>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
