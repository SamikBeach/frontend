'use client';

import AuthorDialog from '@/components/AuthorDialog/AuthorDialog';
import { LibraryIcon, ThumbsUpIcon } from 'lucide-react';

import { MessageSquareIcon } from 'lucide-react';
import { useState } from 'react';

interface Props {
  size?: 'small' | 'large';
}

export default function AuthorItem({ size = 'large' }: Props) {
  const [openAuthorDialog, setOpenAuthorDialog] = useState(false);

  const isSmall = size === 'small';
  return (
    <>
      <div
        className={`flex ${isSmall ? 'w-[140px]' : 'w-[250px]'} flex-col items-center gap-3`}
      >
        <div
          className={`group relative ${isSmall ? 'h-[140px] w-[140px]' : 'h-[250px] w-[250px]'} cursor-pointer overflow-hidden rounded-full bg-gray-200`}
          onClick={() => setOpenAuthorDialog(true)}
        >
          <img
            src={`https://picsum.photos/${isSmall ? '140/140' : '250/250'}`}
            alt="book"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            width={isSmall ? 140 : 250}
            height={isSmall ? 140 : 250}
          />
        </div>
        <div className="flex flex-col gap-0.5">
          <p className={`font-semibold ${isSmall ? 'text-sm' : ''}`}>
            프리드리히 니체
          </p>
          <p className={`${isSmall ? 'text-xs' : 'text-sm'} text-gray-500`}>
            Friedrich Wilhelm Nietzsche
          </p>

          <div
            className={`flex items-center gap-2 ${isSmall ? 'text-xs' : 'text-sm'} text-gray-500`}
          >
            <div className="flex items-center gap-1">
              <ThumbsUpIcon className="h-4 w-4" />
              <span>300</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquareIcon className="mt-0.5 h-4 w-4" />
              <span>300</span>
            </div>
            <div className="flex items-center gap-1">
              <LibraryIcon className="h-4 w-4" />
              <span>300</span>
            </div>
          </div>
        </div>
      </div>
      <AuthorDialog
        open={openAuthorDialog}
        onOpenChange={setOpenAuthorDialog}
      />
    </>
  );
}
