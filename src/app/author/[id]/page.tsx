'use client';

import { useParams } from 'next/navigation';
import { useRef } from 'react';
import AuthorInfo from './AuthorInfo';
import RelativeBooks from './RelativeBooks';
import ReviewList from './ReviewList';

export default function AuthorPage() {
  const { id } = useParams();
  const reviewListRef = useRef<HTMLDivElement>(null);
  const authorId = Number(id);

  return (
    <div className="flex flex-col gap-10">
      <AuthorInfo authorId={authorId} reviewListRef={reviewListRef} />
      <RelativeBooks authorId={authorId} />
      <ReviewList
        ref={reviewListRef}
        authorId={authorId}
        scrollableTarget="dialog-content"
      />
    </div>
  );
}
