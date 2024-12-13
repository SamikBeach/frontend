import { Header } from '@/components/Header';
import '@/styles/global.css';

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <script src="https://unpkg.com/react-scan/dist/auto.global.js" async />
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}