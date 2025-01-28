'use client';

import { sidebarOpenAtom } from '@/atoms/layout';
import { cn } from '@/utils/common';
import { useAtom } from 'jotai';
import { Home, Library, User, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { Logo } from '../Logo';
import { Button } from '../ui/button';

export default function LeftSidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useAtom(sidebarOpenAtom);

  // 모바일에서 메뉴 클릭 시 자동으로 닫기
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setIsOpen]);

  // 경로 변경 시 모바일 메뉴 닫기
  useEffect(() => {
    setIsOpen(false);
  }, [pathname, setIsOpen]);

  return (
    <>
      {/* 데스크톱 사이드바 */}
      <div className="fixed hidden w-[240px] min-w-[240px] flex-col bg-background md:flex">
        <div className="space-y-1 p-3">
          <MenuItem
            icon={<Home size={24} />}
            label="홈"
            href="/home"
            active={pathname === '/home'}
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

      {/* 모바일 메뉴 */}
      <div
        className={cn(
          'fixed left-0 top-0 z-50 flex h-full w-fit transform flex-col bg-background shadow-lg transition-transform duration-300 lg:hidden',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-[56px] w-[240px] items-center justify-between border-b px-4">
          <Link href="/" onClick={() => setIsOpen(false)}>
            <Logo />
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="h-8 w-8"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="flex-1 space-y-1 overflow-y-auto p-3">
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

      {/* 모바일 메뉴 오버레이 */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
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
          'flex min-w-[200px] cursor-pointer items-center gap-x-3 rounded-md px-3 py-2 text-sm font-medium',
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
