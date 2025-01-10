import { ReactNode } from 'react';

export default function BooksLayout({ children }: { children: ReactNode }) {
  return <div className="mx-auto max-w-[calc(100%-2rem)]">{children}</div>;
}
