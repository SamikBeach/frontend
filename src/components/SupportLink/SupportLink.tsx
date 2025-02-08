import Link from 'next/link';
import { ComponentPropsWithoutRef } from 'react';

interface Props extends ComponentPropsWithoutRef<typeof Link> {
  className?: string;
}

export default function SupportLink({ className, ...props }: Props) {
  return (
    <Link href="/support" className={className} {...props}>
      고객지원
    </Link>
  );
} 