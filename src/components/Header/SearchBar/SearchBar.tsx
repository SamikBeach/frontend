'use client';

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useKeyPressEvent } from 'react-use';

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);

  useKeyPressEvent('/', () => setIsOpen(true));

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Input
          className={`absolute left-1/2 top-[27px] -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full transition-[width] duration-300 placeholder:text-gray-400 ${
            isOpen ? 'w-[600px]' : 'w-60'
          }`}
          placeholder="/를 눌러 검색해보세요."
        />
      </DialogTrigger>
      <DialogContent
        className="top-[6px] w-[600px] translate-y-0 bg-white sm:max-w-[600px]"
        overlayClassName="bg-black/10"
        closeClassName="hidden"
      >
        <Input
          className="border-1 w-full bg-gray-100 focus-visible:ring-0"
          placeholder="책이나 작가를 검색하세요."
        />
        <DialogTitle>검색 결과 블라블라블라</DialogTitle>
        {/* <DialogDescription>디스크립션</DialogDescription> */}
      </DialogContent>
    </Dialog>
  );
}
