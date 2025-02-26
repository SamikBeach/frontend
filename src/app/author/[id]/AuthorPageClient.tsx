'use client';

import AuthorOriginalWorks from '@/components/AuthorDialog/AuthorOriginalWorks';
import InfluencedAuthors from '@/components/InfluencedAuthorItem/InfluencedAuthors';
import { useRef } from 'react';
import AuthorInfo from './AuthorInfo';
import AuthorYoutubes from './AuthorYoutubes';
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
      <AuthorOriginalWorks authorId={authorId} />
      <RelativeBooks authorId={authorId} />
      <AuthorYoutubes authorId={authorId} />
      <ReviewList
        ref={reviewListRef}
        authorId={authorId}
        scrollableTarget="dialog-content"
      />
    </div>
  );
}
