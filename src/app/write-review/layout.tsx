import { ReactNode } from 'react';

export default function WriteReviewLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="mx-auto flex max-w-[1080px] flex-col gap-6">{children}</div>
  );
}
