'use client';

import { authorApi } from '@/apis/author/author';
import { PaginatedResponse } from '@/apis/common/types';
import { Review as ReviewType } from '@/apis/review/types';
import { Review } from '@/components/Review';
import EmptyReviews from '@/components/Review/EmptyReviews';
import {
  ReviewListSkeleton,
  ReviewSkeleton,
} from '@/components/Review/ReviewSkeleton';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { ForwardedRef, Suspense, forwardRef, useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

interface Props {
  authorId: number;
  reviewCount: number;
  scrollableTarget: string;
}

function ReviewListContent({ authorId, reviewCount, scrollableTarget }: Props) {
  const { data, fetchNextPage, hasNextPage } = useSuspenseInfiniteQuery<
    AxiosResponse<PaginatedResponse<ReviewType>>,
    Error
  >({
    queryKey: ['author-reviews', authorId],
    queryFn: ({ pageParam = 1 }) =>
      authorApi.getAuthorReviews(authorId, {
        page: pageParam as number,
        limit: 20,
      }),
    initialPageParam: 1,
    getNextPageParam: param => {
      const nextParam = param.data.links.next;
      const query = nextParam?.split('?')[1];
      const pageParam = query
        ?.split('&')
        .find(q => q.startsWith('page'))
        ?.split('=')[1];

      return pageParam;
    },
  });

  const reviews = useMemo(
    () => data?.pages?.flatMap(page => page.data.data) ?? [],
    [data]
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <h2 className="text-base font-semibold text-gray-900">리뷰</h2>
        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
          {reviewCount}
        </span>
      </div>
      {reviews.length === 0 ? (
        <div className="flex-1">
          <EmptyReviews />
        </div>
      ) : (
        <InfiniteScroll
          dataLength={reviews.length}
          next={fetchNextPage}
          hasMore={hasNextPage ?? false}
          loader={
            <div className="py-2">
              <ReviewSkeleton />
            </div>
          }
          scrollableTarget={scrollableTarget}
        >
          <div className="flex flex-col gap-2">
            {reviews.map(review => (
              <Review key={review.id} review={review} />
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
}

const ReviewList = forwardRef(function ReviewList(
  props: Props,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <div ref={ref}>
      <Suspense fallback={<ReviewListSkeleton />}>
        <ReviewListContent {...props} />
      </Suspense>
    </div>
  );
});

export default ReviewList;
