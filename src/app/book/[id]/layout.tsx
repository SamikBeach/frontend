import { ReactNode } from 'react';

export default function AuthorLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex w-[1080px] flex-col gap-6 py-10">
      {children}
    </div>
  );
}
