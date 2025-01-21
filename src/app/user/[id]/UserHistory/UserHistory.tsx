'use client';

import AuthorGridItemSkeleton from '@/components/AuthorItem/AuthorGridItemSkeleton';
import BookGridItemSkeleton from '@/components/BookItem/BookGridItemSkeleton';
import { ReviewSkeleton } from '@/components/Review/ReviewSkeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useQueryParams } from '@/hooks/useQueryParams';
import { Suspense } from 'react';
import BookList from './Lists/BookList';
import { ReviewList } from './Lists/ReviewList';

interface Props {
  userId: number;
}

import AuthorList from './Lists/AuthorList';
export default function UserHistory({ userId }: Props) {
  const { searchParams, updateQueryParams } = useQueryParams();
  const currentTab = searchParams.get('tab') ?? 'review';

  const handleTabChange = (value: string) => {
    updateQueryParams({ tab: value });
  };

  return (
    <Tabs value={currentTab} onValueChange={handleTabChange}>
      <TabsList className="mb-4">
        <TabsTrigger value="review">리뷰</TabsTrigger>
        <TabsTrigger value="books">좋아한 책</TabsTrigger>
        <TabsTrigger value="authors">좋아한 작가</TabsTrigger>
      </TabsList>
      <TabsContent value="review" className="mt-2 flex flex-col gap-6">
        <Suspense
          fallback={
            <div className="flex flex-col gap-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <ReviewSkeleton key={i} />
              ))}
            </div>
          }
        >
          <ReviewList userId={userId} />
        </Suspense>
      </TabsContent>
      <TabsContent value="books" className="mt-0 flex flex-col gap-6">
        <p className="text-lg font-semibold">책</p>
        <Suspense
          fallback={
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap gap-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <BookGridItemSkeleton key={i} size="small" />
                ))}
              </div>
            </div>
          }
        >
          <BookList userId={userId} />
        </Suspense>
      </TabsContent>
      <TabsContent value="authors" className="mt-0 flex flex-col gap-6">
        <p className="text-lg font-semibold">작가</p>
        <Suspense
          fallback={
            <div className="flex flex-col gap-2">
              <div className="flex flex-wrap gap-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <AuthorGridItemSkeleton key={i} size="small" />
                ))}
              </div>
            </div>
          }
        >
          <AuthorList userId={userId} />
        </Suspense>
      </TabsContent>
    </Tabs>
  );
}
