'use client';

import { useRef, useState } from 'react';
import CommentList from './CommentList';
import ReviewInfo from './ReviewInfo';

interface Props {
  reviewId: number;
}

export default function ReviewPageClient({ reviewId }: Props) {
  const commentListRef = useRef<HTMLDivElement>(null);
  const [replyToUser, setReplyToUser] = useState<{ nickname: string } | null>(
    null
  );

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
    </div>
  );
}
