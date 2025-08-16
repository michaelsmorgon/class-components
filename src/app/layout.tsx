import './global.css';
import Menu from '@/app/components/menu/Menu';
import ReduxProvider from '@/app/providers/ReduxProviders';
import { ThemeProvider } from '@/app/components/theme-provider/ThemeProvider';

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
