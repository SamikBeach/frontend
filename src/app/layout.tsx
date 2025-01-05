import Header from '@/components/Header/Header';
import { LeftSidebar } from '@/components/LeftSidebar';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();

  return (
    <html lang="ko">
      <body>
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
