'use client';

import { authorApi } from '@/apis/author/author';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/utils/common';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ChevronDownIcon } from 'lucide-react';
import { Suspense, useState } from 'react';
import InfluencedAuthorItem from './InfluencedAuthorItem';

interface Props {
  authorId: number;
}

const INITIAL_SHOW_COUNT = 6;

function InfluencedAuthorsContent({ authorId }: Props) {
  const [isInfluencedExpanded, setIsInfluencedExpanded] = useState(false);
  const [isInfluencedByExpanded, setIsInfluencedByExpanded] = useState(false);

  const { data: author } = useSuspenseQuery({
    queryKey: ['author', authorId],
    queryFn: () => authorApi.getAuthorDetail(authorId),
    select: response => response.data,
  });

  const { data: influenced = [] } = useSuspenseQuery({
    queryKey: ['author-influenced', authorId],
    queryFn: () => authorApi.getInfluencedAuthors(authorId),
    select: response => response.data,
  });

  const { data: influencedBy = [] } = useSuspenseQuery({
    queryKey: ['author-influenced-by', authorId],
    queryFn: () => authorApi.getInfluencedByAuthors(authorId),
    select: response => response.data,
  });

  if (influenced.length === 0 && influencedBy.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-10">
      {influenced.length > 0 && (
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-semibold text-gray-900">
              {author.nameInKor.trim()}에게 영향을 준 작가
            </h2>
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
              {influenced.length}
            </span>
            {influenced.length > INITIAL_SHOW_COUNT && (
              <Button
                variant="ghost"
                className="h-7 gap-1 px-2 text-sm text-gray-500 hover:text-gray-900"
                onClick={() => setIsInfluencedExpanded(!isInfluencedExpanded)}
              >
                <ChevronDownIcon
                  className={cn('h-4 w-4 transition-transform', {
                    'rotate-180': isInfluencedExpanded,
                  })}
                />
                {isInfluencedExpanded ? '접기' : '더보기'}
              </Button>
            )}
          </div>
          <div
            className={cn(
              'flex flex-wrap gap-2',
              !isInfluencedExpanded && 'max-h-[50px] overflow-hidden'
            )}
          >
            {influenced
              .slice(0, isInfluencedExpanded ? undefined : INITIAL_SHOW_COUNT)
              .map(author => (
                <InfluencedAuthorItem key={author.id} author={author} />
              ))}
          </div>
        </div>
      )}

      {influencedBy.length > 0 && (
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-semibold text-gray-900">
              {author.nameInKor.trim()}에게 영향을 받은 작가
            </h2>
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
              {influencedBy.length}
            </span>
            {influencedBy.length > INITIAL_SHOW_COUNT && (
              <Button
                variant="ghost"
                className="h-7 gap-1 px-2 text-sm text-gray-500 hover:text-gray-900"
                onClick={() =>
                  setIsInfluencedByExpanded(!isInfluencedByExpanded)
                }
              >
                <ChevronDownIcon
                  className={cn('h-4 w-4 transition-transform', {
                    'rotate-180': isInfluencedByExpanded,
                  })}
                />
                {isInfluencedByExpanded ? '접기' : '더보기'}
              </Button>
            )}
          </div>
          <div
            className={cn(
              'flex flex-wrap gap-2',
              !isInfluencedByExpanded && 'max-h-[50px] overflow-hidden'
            )}
          >
            {influencedBy
              .slice(0, isInfluencedByExpanded ? undefined : INITIAL_SHOW_COUNT)
              .map(author => (
                <InfluencedAuthorItem key={author.id} author={author} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

function InfluencedAuthorsSkeleton() {
  return (
    <div className="flex flex-col gap-10">
      {Array.from({ length: 2 }).map((_, index) => (
        <div key={index} className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-6 w-10 rounded-full" />
          </div>
          <div className="flex max-h-[50px] flex-wrap gap-2 overflow-hidden">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="inline-flex h-[42px] w-[200px] items-center gap-3 rounded-lg bg-gray-100 px-3 py-2.5"
              >
                <Skeleton className="h-8 w-8 shrink-0 rounded-full" />
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function InfluencedAuthors(props: Props) {
  return (
    <Suspense fallback={<InfluencedAuthorsSkeleton />}>
      <InfluencedAuthorsContent {...props} />
    </Suspense>
  );
}
