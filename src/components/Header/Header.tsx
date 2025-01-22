'use client';

import { sidebarOpenAtom } from '@/atoms/layout';
import { useSetAtom } from 'jotai';
import { Menu } from 'lucide-react';
import { Button } from '../ui/button';
import { LeftSlot } from './LeftSlot';
import { RightSlot } from './RightSlot';
import { SearchBar } from './SearchBar';

export default function Header() {
  const setIsOpen = useSetAtom(sidebarOpenAtom);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex min-h-[56px] items-center justify-between border-b-[1px] bg-white px-4">
      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="hidden max-md:flex"
          onClick={() => setIsOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <LeftSlot />
      </div>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-sm:hidden sm:block">
        <SearchBar />
      </div>
      <div className="flex items-center gap-2">
        <div className="hidden max-sm:block">
          <SearchBar />
        </div>
        <RightSlot />
      </div>
    </header>
  );
}
