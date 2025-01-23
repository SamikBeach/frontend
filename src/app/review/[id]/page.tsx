'use client';

import { reviewApi } from '@/apis/review/review';
import CommentEditor from '@/components/CommentEditor/CommentEditor';
import { toast } from '@/components/ui/sonner';
import { useCommentQueryData } from '@/hooks/queries/useCommentQueryData';
import { useMutation } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useRef, useState } from 'react';
import CommentList from './CommentList';
import ReviewInfo from './ReviewInfo';

export default function ReviewPage() {
  const { id } = useParams();
  const reviewId = Number(id);

  const { createCommentQueryData } = useCommentQueryData();

  const commentListRef = useRef<HTMLDivElement>(null);
  const [replyToUser, setReplyToUser] = useState<{ nickname: string } | null>(
    null
  );

  const { mutate: createComment } = useMutation({
    mutationFn: (comment: string) => {
      return reviewApi.createComment(reviewId, { content: comment });
    },
    onSuccess: response => {
      createCommentQueryData({ reviewId, comment: response.data });

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
    <div className="flex flex-col gap-10">
      <div className="flex min-h-[calc(100vh-234px)] flex-col">
        <ReviewInfo reviewId={reviewId} commentListRef={commentListRef} />
        <CommentList
          ref={commentListRef}
          reviewId={reviewId}
          onReply={user => setReplyToUser(user)}
          scrollableTarget="dialog-content"
        />
      </div>
      <div className="sticky bottom-10 bg-white pt-4">
        <div className="relative">
          <div className="absolute -bottom-10 -left-0 -right-0 -top-4 bg-white shadow-[0_-8px_12px_0px_white]" />
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
