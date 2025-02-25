'use client';

import { useRef } from 'react';
import AuthorInfo from './AuthorInfo';
import InfluencedAuthors from './InfluencedAuthors';
import RelativeBooks from './RelativeBooks';
import ReviewList from './ReviewList';

interface Props {
  authorId: number;
}

export default function AuthorPageClient({ authorId }: Props) {
  const reviewListRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex flex-col gap-10">
      <AuthorInfo authorId={authorId} reviewListRef={reviewListRef} />
      <InfluencedAuthors authorId={authorId} />
      <RelativeBooks authorId={authorId} />
      <ReviewList
        ref={reviewListRef}
        authorId={authorId}
        scrollableTarget="dialog-content"
      />
    </div>
  );
}
