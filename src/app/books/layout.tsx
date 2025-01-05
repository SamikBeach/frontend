import { ReactNode } from 'react';

export default function BooksLayout({ children }: { children: ReactNode }) {
  return <div className="m-4">{children}</div>;
}
