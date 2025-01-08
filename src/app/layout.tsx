import Header from '@/components/Header/Header';
import { LeftSidebar } from '@/components/LeftSidebar';
import { SilentRefresh } from '@/components/SilentRefresh';
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
        <SilentRefresh />
        <NextIntlClientProvider messages={messages}>
          <div className="flex h-screen flex-col">
            <Header />
            <div className="mt-[56px] flex flex-1">
              <LeftSidebar />
              <main className="ml-[240px] w-full">{children}</main>
            </div>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
