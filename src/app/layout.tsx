import GoogleAnalytics from '@/components/GoogleAnalytics';
import GoogleTagManager from '@/components/GoogleTagManager';
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
import { Metadata, Viewport } from 'next';
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
      <head>
        <title>고전산책</title>
        <meta
          name="description"
          content="시대를 초월한 지혜, 고전과 함께하는 새로운 독서 경험"
        />
        <meta
          name="keywords"
          content="고전, 독서, 책, 서평, 북리뷰, 고전도서, 독서기록, 인문학, 고전번역, classics, books, literature"
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="ko_KR" />
        <meta property="og:locale:alternate" content="en_US" />
        <meta property="og:site_name" content="고전산책" />
        <meta property="og:url" content="https://classicswalk.com" />
        <meta name="robots" content="index, follow" />
        <meta
          name="google-site-verification"
          content="google-site-verification-code"
        />
        <meta
          name="naver-site-verification"
          content="naver-site-verification-code"
        />
      </head>
      <body>
        <GoogleTagManager />
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

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    template: '%s | 고전산책',
    default: '고전산책',
  },
  description: '시대를 초월한 지혜, 고전과 함께하는 새로운 독서 경험',
  keywords: [
    '고전',
    '독서',
    '책',
    '서평',
    '북리뷰',
    '고전도서',
    '독서기록',
    '인문학',
    '고전번역',
    'classics',
    'books',
    'literature',
  ],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    alternateLocale: 'en_US',
    siteName: '고전산책',
    url: 'https://classicswalk.com',
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: 'google-site-verification-code',
  },
  icons: {
    icon: [
      { url: '/favicons/favicon.ico', sizes: 'any' },
      { url: '/favicons/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      {
        url: '/favicons/web-app-manifest-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: '/favicons/web-app-manifest-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: '/favicons/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    shortcut: [{ url: '/favicons/favicon.ico' }],
  },
  manifest: '/favicons/site.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: '고전산책',
  },
};
