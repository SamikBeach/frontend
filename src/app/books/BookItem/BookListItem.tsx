'use client';

import { BookDialog } from '@/components/BookDialog';
import { MessageSquareIcon, ThumbsUpIcon } from 'lucide-react';
import { useState } from 'react';

export default function BookListItem() {
  const [openBookDialog, setOpenBookDialog] = useState(false);

  return (
    <>
      <div className="flex gap-6">
        <div
          className={
            'group relative h-[210px] w-[140px] flex-shrink-0 cursor-pointer overflow-hidden rounded-lg bg-gray-200'
          }
          onClick={() => setOpenBookDialog(true)}
        >
          <img
            src="https://picsum.photos/140/210"
            alt="book"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            width={140}
            height={210}
          />
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <p className="font-semibold">짜라투스트라는 이렇게 말했다</p>
            <p className="text-sm text-gray-500">프리드리히 니체</p>
            <p className="text-sm text-gray-500">민음사 · 박찬국 · 2021</p>
            <p className="text-sm">
              가낟라마바사아자가낟라마바사아자가낟라마바사아자가낟라마바사아자
              가낟라마바사아자가낟라마바사아자가낟라마바사아자
              가낟라마바사아자가낟라마바사아자
              가낟라마바사아자가낟라마바사아자가낟라마바사아자가낟라마바사아자가낟라마바사아자가낟라마바사아자가낟라마바사아자
              가낟라마바사아자가낟라마바사아자가낟라마바사아자가낟라마바사아자
              가낟라마바사아자가낟라마바사아자가낟라마바사아자가낟라마바사아자
              가낟라마바사아자가낟라마바사아자가낟라마바사아자가낟라마바사아자
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <ThumbsUpIcon className="h-4 w-4" />
              <span>300</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquareIcon className="mt-0.5 h-4 w-4" />
              <span>300</span>
            </div>
          </div>
        </div>
      </div>
      <BookDialog open={openBookDialog} onOpenChange={setOpenBookDialog} />
    </>
  );
}
