'use client';

import { cn } from '@/lib/utils';
import { Home, Library, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function LeftSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex w-[240px] min-w-[240px] flex-col bg-background">
      <div className="space-y-1 p-3">
        <MenuItem
          icon={<Home size={24} />}
          label="홈"
          href="/"
          active={pathname === '/'}
        />
        <MenuItem
          icon={<Library size={24} />}
          label="책"
          href="/books"
          active={pathname === '/books'}
        />
        <MenuItem
          icon={<User size={24} />}
          label="작가"
          href="/authors"
          active={pathname === '/authors'}
        />
      </div>
    </div>
  );
}

function MenuItem({
  icon,
  label,
  href,
  active,
}: {
  icon: React.ReactNode;
  label: string;
  href: string;
  active?: boolean;
}) {
  return (
    <Link href={href} passHref>
      <div
        className={cn(
          'flex cursor-pointer items-center gap-x-3 rounded-md px-3 py-2 text-sm font-medium',
          'hover:bg-accent hover:text-accent-foreground',
          active && 'bg-accent text-accent-foreground'
        )}
      >
        {icon}
        <span>{label}</span>
      </div>
    </Link>
  );
}
