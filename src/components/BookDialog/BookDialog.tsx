'use client';

import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useDialogQuery } from '@/hooks/useDialogQuery';
import { DialogProps } from '@radix-ui/react-dialog';
import { ExternalLinkIcon } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';
import { Button } from '../ui/button';
import BookInfo from './BookInfo';
import RelativeBooks from './RelativeBooks';
import ReviewList from './ReviewList';

interface Props extends DialogProps {}

export default function BookDialog(props: Props) {
  const { isOpen, id: bookId, close } = useDialogQuery({ type: 'book' });
  const reviewListRef = useRef<HTMLDivElement>(null);

  if (!bookId) {
    return null;
  }

  return (
    <Dialog {...props} open={isOpen} onOpenChange={open => !open && close()}>
      <DialogContent
        overlayClassName="bg-black/10"
        className="fixed left-1/2 top-1/2 flex h-[94vh] w-[900px] min-w-[900px] -translate-x-1/2 -translate-y-1/2 flex-col gap-4 overflow-y-auto p-10"
        aria-describedby={undefined}
        onOpenAutoFocus={e => e.preventDefault()}
        id="dialog-content"
      >
        <DialogTitle className="sr-only">책 정보</DialogTitle>
        <div className="absolute right-10 top-2.5 z-10">
          <Link href={`/book/${bookId}`}>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-gray-900"
            >
              <ExternalLinkIcon className="h-3.5 w-3.5" />
              페이지로 보기
            </Button>
          </Link>
        </div>
        <div className="flex flex-col gap-7">
          <BookInfo bookId={bookId} reviewListRef={reviewListRef} />
          <RelativeBooks bookId={bookId} />
          <ReviewList
            ref={reviewListRef}
            bookId={bookId}
            scrollableTarget="dialog-content"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
