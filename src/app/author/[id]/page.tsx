'use client';

import { authorApi } from '@/apis/author/author';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useRef } from 'react';
import AuthorInfo from './AuthorInfo';
import RelativeBooks from './RelativeBooks';
import ReviewList from './ReviewList';

export default function AuthorPage() {
  const { id } = useParams();
  const reviewListRef = useRef<HTMLDivElement>(null);

  const { data: author } = useQuery({
    queryKey: ['author', Number(id)],
    queryFn: () => authorApi.getAuthorDetail(Number(id)),
    select: response => response.data,
  });

  if (!author) {
    return null;
  }

  return (
    <>
      <AuthorInfo author={author} reviewListRef={reviewListRef} />
      <RelativeBooks authorId={author.id} />
      <ReviewList
        ref={reviewListRef}
        authorId={author.id}
        reviewCount={author.reviewCount}
        scrollableTarget="dialog-content"
      />
    </>
  );
}
