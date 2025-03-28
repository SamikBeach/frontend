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
        {/* 파비콘 설정 - metadata에 이미 설정했는데 구글 검색 결과에 표시되지 않아서 추가해봄 */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/favicons/apple-touch-icon.png" />
        <script
          type="text/javascript"
          src="https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js"
        ></script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: '고전산책',
            alternateName: 'ClassicsWalk',
            url: 'https://classicswalk.com',
            description:
              '시간이 검증한 고전과 함께하는 특별한 독서 경험. 서로의 생각을 나누며 독서의 깊이를 더해보세요.',
          })}
        </script>
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
  description:
    '시간이 검증한 고전과 함께하는 특별한 독서 경험. 리뷰를 통해 생각을 나누고 더 깊이 있게 고전을 만나보세요.',
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
    '번역본',
    '독서경험',
    '독서커뮤니티',
    '생각나누기',
    '독서토론',
    'classics',
    'books',
    'literature',
  ],
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    title: '고전산책',
    description:
      '시간이 검증한 고전과 함께하는 특별한 독서 경험. 리뷰를 통해 생각을 나누고 더 깊이 있게 고전을 만나보세요.',
    alternateLocale: 'en_US',
    siteName: '고전산책',
    url: 'https://classicswalk.com',
    images: ['/images/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: '고전산책',
    description:
      '시간이 검증한 고전과 함께하는 특별한 독서 경험. 리뷰를 통해 생각을 나누고 더 깊이 있게 고전을 만나보세요.',
    images: ['/images/og-image.png'],
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
