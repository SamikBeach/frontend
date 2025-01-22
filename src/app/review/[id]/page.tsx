'use client';

import { reviewApi } from '@/apis/review/review';
import CommentEditor from '@/components/CommentEditor/CommentEditor';
import { toast } from '@/components/ui/sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useRef, useState } from 'react';
import CommentList from './CommentList';
import ReviewInfo from './ReviewInfo';

export default function ReviewPage() {
  const { id } = useParams();
  const reviewId = Number(id);
  const queryClient = useQueryClient();

  const commentListRef = useRef<HTMLDivElement>(null);
  const [replyToUser, setReplyToUser] = useState<{ nickname: string } | null>(
    null
  );

  const { mutate: createComment } = useMutation({
    mutationFn: (comment: string) => {
      return reviewApi.createComment(reviewId, { content: comment });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['comments', reviewId],
      });

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

  if (!reviewId) {
    return null;
  }

  return (
    <div className="mx-auto flex max-w-[900px] flex-col gap-10 p-10">
      <ReviewInfo reviewId={reviewId} commentListRef={commentListRef} />
      <CommentList
        ref={commentListRef}
        reviewId={reviewId}
        onReply={user => setReplyToUser(user)}
        scrollableTarget="dialog-content"
      />
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
    </div>
  );
}
