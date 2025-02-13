'use client';

import { reviewApi } from '@/apis/review/review';
import { useCommentQueryData } from '@/hooks/queries/useCommentQueryData';
import { useDialogQuery } from '@/hooks/useDialogQuery';
import { DialogProps, DialogTitle } from '@radix-ui/react-dialog';
import { useMutation } from '@tanstack/react-query';
import { ArrowLeftIcon, ExternalLinkIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useRef, useState } from 'react';
import CommentEditor from '../CommentEditor/CommentEditor';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { toast } from '../ui/sonner';
import CommentList from './CommentList';
import ReviewInfo from './ReviewInfo';

interface Props extends DialogProps {}

export default function ReviewDialog(props: Props) {
  const { isOpen, id: reviewId, close } = useDialogQuery({ type: 'review' });
  const router = useRouter();

  const { createCommentQueryData } = useCommentQueryData();

  const commentListRef = useRef<HTMLDivElement>(null);
  const [replyToUser, setReplyToUser] = useState<{ nickname: string } | null>(
    null
  );

  const { mutate: createComment } = useMutation({
    mutationFn: (comment: string) => {
      if (!reviewId) throw new Error('Review ID is required');
      return reviewApi.createComment(reviewId, { content: comment });
    },
    onSuccess: response => {
      createCommentQueryData({ reviewId: reviewId!, comment: response.data });

      // 새로운 댓글은 항상 목록 가장 앞에 추가되므로 첫 번째 댓글로 스크롤
      setTimeout(() => {
        commentListRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);

      toast.success('댓글이 작성되었습니다.');
      setReplyToUser(null);
    },
    onError: () => {
      toast.error('댓글 작성에 실패했습니다.');
    },
  });

  const handleReply = useCallback((user: { nickname: string }) => {
    setReplyToUser(user);
  }, []);

  const handleBack = () => {
    router.back();
  };

  if (!reviewId) {
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
        <DialogTitle className="sr-only">리뷰 정보</DialogTitle>
        <div className="absolute right-10 top-3 z-10 flex">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 gap-1 p-2 text-gray-500 hover:text-gray-900"
            onClick={handleBack}
          >
            <ArrowLeftIcon className="h-3.5 w-3.5" />
            뒤로가기
          </Button>
          <Link href={`/review/${reviewId}`} target="_blank">
            <Button
              variant="ghost"
              size="sm"
              className="h-7 gap-1 p-2 text-gray-500 hover:text-gray-900"
            >
              <ExternalLinkIcon className="h-3.5 w-3.5" />
              페이지로 열기
            </Button>
          </Link>
        </div>
        <div className="flex h-[99999px] flex-col gap-7">
          <ReviewInfo reviewId={reviewId} commentListRef={commentListRef} />
          <CommentList
            ref={commentListRef}
            reviewId={reviewId}
            scrollableTarget="dialog-content"
            onReply={handleReply}
          />
        </div>
        <div className="sticky bottom-0 bg-white pt-4">
          <div className="relative">
            <div className="absolute -bottom-10 -left-10 -right-10 -top-4 bg-white shadow-[0_-8px_12px_0px_white]" />
            <div className="relative">
              <CommentEditor
                onSubmit={createComment}
                replyToUser={replyToUser ?? undefined}
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

ReviewDialog.Trigger = DialogTrigger;
