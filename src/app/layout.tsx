import Header from '@/components/Header/Header';
import { LeftSidebar } from '@/components/LeftSidebar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <div className="flex h-screen flex-col">
          <Header />
          <div className="flex flex-1">
            <LeftSidebar />
            <main className="flex-1">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
