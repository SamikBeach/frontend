import { Header } from '@/components/Header';
import { Initializer } from '@/components/Initializer';
import { LeftSidebar } from '@/components/LeftSidebar';
import ReactQueryProvider from '@/providers/ReactQueryProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { type ReactNode } from 'react';

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const messages = await getMessages();

  return (
    <html lang="ko">
      <body>
        <ReactQueryProvider>
          <GoogleOAuthProvider
            clientId={process.env.GOOGLE_OAUTH_CLIENT_ID ?? ''}
          >
            <NextIntlClientProvider messages={messages}>
              <Initializer />
              <div className="flex h-screen flex-col">
                <Header />
                <div className="mt-[56px] flex flex-1">
                  <LeftSidebar />
                  <main className="ml-[240px] w-full">{children}</main>
                </div>
              </div>
            </NextIntlClientProvider>
            <ReactQueryDevtools initialIsOpen={false} />
          </GoogleOAuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
