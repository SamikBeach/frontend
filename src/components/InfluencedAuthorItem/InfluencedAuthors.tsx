'use client';

import { authorApi } from '@/apis/author/author';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useSuspenseQuery } from '@tanstack/react-query';
import { ChevronDownIcon, LayoutGridIcon } from 'lucide-react';
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

  const displayInfluenced = isInfluencedExpanded
    ? influenced
    : influenced.slice(0, 3);
  const displayInfluencedBy = isInfluencedByExpanded
    ? influencedBy
    : influencedBy.slice(0, 3);

  return (
    <div className="flex flex-col gap-10">
      {influenced.length > 0 && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-gray-900">
                {author.nameInKor.trim()}에게 영향을 준 작가
              </h2>
              <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                {influenced.length}
              </span>
            </div>
            {influenced.length > 3 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsInfluencedExpanded(!isInfluencedExpanded)}
                className="h-8 gap-1.5 rounded-md px-3 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              >
                {isInfluencedExpanded ? (
                  <>
                    <ChevronDownIcon className="h-4 w-4" />
                    접기
                  </>
                ) : (
                  <>
                    <LayoutGridIcon className="h-4 w-4" />
                    전체보기
                  </>
                )}
              </Button>
            )}
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
            {displayInfluenced.map(author => (
              <div key={author.id}>
                <InfluencedAuthorItem author={author} />
              </div>
            ))}
          </div>
        </div>
      )}

      {influencedBy.length > 0 && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-gray-900">
                {author.nameInKor.trim()}에게 영향을 받은 작가
              </h2>
              <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                {influencedBy.length}
              </span>
            </div>
            {influencedBy.length > 3 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  setIsInfluencedByExpanded(!isInfluencedByExpanded)
                }
                className="h-8 gap-1.5 rounded-md px-3 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900"
              >
                {isInfluencedByExpanded ? (
                  <>
                    <ChevronDownIcon className="h-4 w-4" />
                    접기
                  </>
                ) : (
                  <>
                    <LayoutGridIcon className="h-4 w-4" />
                    전체보기
                  </>
                )}
              </Button>
            )}
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
            {displayInfluencedBy.map(author => (
              <div key={author.id}>
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
    <div className="flex flex-col gap-10">
      {Array.from({ length: 2 }).map((_, index) => (
        <div key={index} className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="h-7 w-64" />
              <Skeleton className="h-5 w-8 rounded-full" />
            </div>
            <Skeleton className="h-8 w-24 rounded-md" />
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="flex h-[50px] items-center gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3"
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
