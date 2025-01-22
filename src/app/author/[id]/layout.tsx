import { ReactNode } from 'react';

export default function AuthorLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex max-w-[1080px] flex-col gap-6 p-4">
      {children}
    </div>
  );
}
