'use client';

import { useDialogQuery } from '@/hooks/useDialogQuery';
import { DialogProps, DialogTitle } from '@radix-ui/react-dialog';
import { useRef } from 'react';
import { CommentEditor } from '../CommentEditor';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import CommentList from './CommentList';
import ReviewInfo from './ReviewInfo';

interface Props extends DialogProps {}

export default function ReviewDialog(props: Props) {
  const { isOpen, id: reviewId, close } = useDialogQuery({ type: 'review' });

  const commentListRef = useRef<HTMLDivElement>(null);

  if (!reviewId) {
    return null;
  }

  return (
    <Dialog {...props} open={isOpen} onOpenChange={open => !open && close()}>
      <DialogContent
        overlayClassName="bg-black/10"
        className="fixed left-1/2 top-1/2 flex h-[90vh] w-[900px] min-w-[900px] -translate-x-1/2 -translate-y-1/2 flex-col gap-4 overflow-y-auto p-10"
        aria-describedby={undefined}
        onOpenAutoFocus={e => e.preventDefault()}
        id="dialog-content"
      >
        <DialogTitle className="sr-only">리뷰 정보</DialogTitle>
        <div className="flex flex-col gap-7">
          <ReviewInfo reviewId={reviewId} commentListRef={commentListRef} />
          <CommentList
            ref={commentListRef}
            reviewId={reviewId}
            scrollableTarget="dialog-content"
          />
        </div>
        <div className="sticky bottom-0 bg-white pt-4">
          <div className="relative">
            <div className="absolute -bottom-10 -left-10 -right-10 -top-4 bg-white shadow-[0_-8px_12px_0px_white]" />
            <div className="relative">
              <CommentEditor />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

ReviewDialog.Trigger = DialogTrigger;
