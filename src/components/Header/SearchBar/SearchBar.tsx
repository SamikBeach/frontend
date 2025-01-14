'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useKeyPressEvent } from 'react-use';
import { SearchBarDialog } from './SearchBarDialog';

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);

  useKeyPressEvent('/', () => setIsOpen(true));

  return (
    <>
      <Button
        variant="outline"
        className={`absolute left-1/2 top-[27px] -translate-x-1/2 -translate-y-1/2 cursor-pointer justify-start rounded-full text-gray-400 transition-[width] duration-300 hover:text-gray-400 ${
          isOpen ? 'w-[600px]' : 'w-60'
        }`}
        onClick={() => setIsOpen(true)}
      >
        /를 눌러 검색해보세요.
      </Button>
      <SearchBarDialog open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}
