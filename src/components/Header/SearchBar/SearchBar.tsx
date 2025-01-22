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
        className={`cursor-pointer justify-start rounded-full text-gray-400 transition-[width] duration-300 hover:text-gray-400 ${
          isOpen ? 'w-[600px] max-md:w-[50vw]' : 'w-60 max-md:w-[50vw]'
        }`}
        onClick={() => setIsOpen(true)}
      >
        <span className="truncate">/를 눌러 검색해보세요.</span>
      </Button>
      <SearchBarDialog open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}
