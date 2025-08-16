import './global.css';
import Menu from '@/components/menu/Menu';
import ReduxProvider from '@/app/providers/ReduxProviders';
import { ThemeProvider } from '@/components/theme-provider/ThemeProvider';

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="app_wrapper">
          <ReduxProvider>
            <ThemeProvider>
              <Menu />
              {children}
            </ThemeProvider>
          </ReduxProvider>
        </div>
      </body>
    </html>
  );
}
