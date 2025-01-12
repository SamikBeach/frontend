'use client';

import { authorApi } from '@/apis/author/author';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { useDialogQuery } from '@/hooks/useDialogQuery';
import { DialogProps } from '@radix-ui/react-dialog';
import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';
import AuthorInfo from './AuthorInfo';
import RelativeAuthors from './RelativeBooks';
import ReviewList from './ReviewList';

interface Props extends DialogProps {}

export default function AuthorDialog(props: Props) {
  const reviewListRef = useRef<HTMLDivElement>(null);
  const { isOpen, id: authorId, close } = useDialogQuery({ type: 'author' });

  const { data: author, isLoading } = useQuery({
    queryKey: ['author', authorId],
    queryFn: () => {
      if (!authorId) {
        throw new Error('Author ID is required');
      }

      return authorApi.getAuthorDetail(authorId);
    },
    select: data => data.data,
    enabled: isOpen,
  });

  if (!authorId) {
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
        {isLoading && <DialogTitle />}
        {author ? (
          <>
            <div className="flex flex-col gap-7">
              <AuthorInfo author={author} reviewListRef={reviewListRef} />
              <RelativeAuthors authorId={authorId} />
              <ReviewList
                ref={reviewListRef}
                authorId={authorId}
                reviewCount={author.reviewCount}
                scrollableTarget="dialog-content"
              />
            </div>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
