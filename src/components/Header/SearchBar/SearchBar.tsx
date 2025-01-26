'use client';

import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { useKeyPressEvent } from 'react-use';
import { SearchBarDialog } from './SearchBarDialog';

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);

  useKeyPressEvent('/', e => {
    if (e.target === document.body) {
      e.preventDefault();
      setIsOpen(true);
    }
  });

  return (
    <>
      <Button
        variant="outline"
        className={`cursor-pointer justify-start rounded-full text-gray-400 transition-[width] duration-300 hover:text-gray-400 max-sm:w-10 max-sm:justify-center max-sm:px-0 ${
          isOpen
            ? 'w-[600px] max-md:w-[50vw] max-sm:w-10'
            : 'w-60 max-md:w-[50vw]'
        }`}
        onClick={() => setIsOpen(true)}
      >
        <Search className="h-5 w-5 max-sm:block sm:hidden" />
        <span className="truncate max-sm:hidden">/를 눌러 검색해보세요.</span>
      </Button>
      <SearchBarDialog open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}
