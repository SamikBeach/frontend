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

function InfluencedAuthorsContent({ authorId }: Props) {
  const [isInfluencedExpanded, setIsInfluencedExpanded] = useState(false);
  const [isInfluencedByExpanded, setIsInfluencedByExpanded] = useState(false);

  const { data: author } = useSuspenseQuery({
    queryKey: ['author', authorId],
    queryFn: () => authorApi.getAuthorDetail(authorId),
    select: response => response.data,
  });

  const { influenced, influencedBy } = author;

  if (influenced.length === 0 && influencedBy.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      {influenced.length > 0 && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-gray-900">
              {author.nameInKor}에게 영향을 준 작가
            </h2>
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
              {influenced.length}
            </span>
            {influenced.length > 3 && (
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
              'flex gap-2',
              isInfluencedExpanded ? 'flex-wrap' : 'overflow-hidden'
            )}
          >
            {influenced
              .slice(0, isInfluencedExpanded ? undefined : 3)
              .map(author => (
                <div key={author.id} className="w-[280px]">
                  <InfluencedAuthorItem author={author} />
                </div>
              ))}
          </div>
        </div>
      )}

      {influencedBy.length > 0 && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-gray-900">
              {author.nameInKor}에게 영향을 받은 작가
            </h2>
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
              {influencedBy.length}
            </span>
            {influencedBy.length > 3 && (
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
              'flex gap-2',
              isInfluencedByExpanded ? 'flex-wrap' : 'overflow-hidden'
            )}
          >
            {influencedBy
              .slice(0, isInfluencedByExpanded ? undefined : 3)
              .map(author => (
                <div key={author.id} className="w-[280px]">
                  <InfluencedAuthorItem author={author} />
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

function InfluencedAuthorsSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Skeleton className="h-7 w-64" />
          <Skeleton className="h-6 w-8 rounded-full" />
        </div>
        <div className="flex gap-2 overflow-hidden">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-12 w-[280px]" />
          ))}
        </div>
      </div>
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
