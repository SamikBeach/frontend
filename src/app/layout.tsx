import { SilentRefresh } from '@/components/auth/SilentRefresh';
import { Provider } from 'jotai';
import { type ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <Provider>
          <SilentRefresh />
          {children}
        </Provider>
      </body>
    </html>
  );
}
