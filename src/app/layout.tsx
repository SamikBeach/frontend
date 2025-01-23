import GoogleAnalytics from '@/components/GoogleAnalytics';
import { Header } from '@/components/Header';
import { Initializer } from '@/components/Initializer';
import { LeftSidebar } from '@/components/LeftSidebar';
import { Toaster } from '@/components/ui/sonner';
import { AtomsProvider } from '@/providers/AtomsProvider';
import { DialogProvider } from '@/providers/DialogProvider';
import ReactQueryProvider from '@/providers/ReactQueryProvider';
import '@/styles/global.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from 'jotai';
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
          <Provider>
            <AtomsProvider>
              <GoogleOAuthProvider
                clientId={process.env.GOOGLE_OAUTH_CLIENT_ID ?? ''}
              >
                <DialogProvider>
                  <NextIntlClientProvider messages={messages}>
                    <Initializer />
                    <div className="flex h-screen flex-col">
                      <Header />
                      <div className="mt-[56px] flex flex-1">
                        <LeftSidebar />
                        <main className="ml-[240px] w-full max-md:ml-0">
                          {children}
                        </main>
                      </div>
                    </div>
                    <Toaster />
                    <GoogleAnalytics />
                  </NextIntlClientProvider>
                  <ReactQueryDevtools initialIsOpen={false} />
                </DialogProvider>
              </GoogleOAuthProvider>
            </AtomsProvider>
          </Provider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
