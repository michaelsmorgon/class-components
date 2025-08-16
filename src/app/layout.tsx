import './global.css';
import Menu from '@/app/components/menu/Menu';
import Providers from '@/app/providers/Providers';

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="app_wrapper">
          <Providers>
            <Menu />
            {children}
          </Providers>
        </div>
      </body>
    </html>
  );
}
