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
import { reviewItemAnimation } from '@/constants/animations';
import {
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { ForwardedRef, Suspense, forwardRef, useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

interface Props {
  authorId: number;
  scrollableTarget: string;
}

function ReviewListContent({ authorId, scrollableTarget }: Props) {
  const { data: author } = useSuspenseQuery({
    queryKey: ['author', authorId],
    queryFn: () => authorApi.getAuthorDetail(authorId),
    select: response => response.data,
  });

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
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-gray-900">리뷰</h2>
          <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-600">
            {author.reviewCount}
          </span>
        </div>
      </div>

      {reviews.length === 0 ? (
        <div className="flex-1 rounded-2xl border border-gray-100 p-8">
          <EmptyReviews />
        </div>
      ) : (
        <InfiniteScroll
          dataLength={reviews.length}
          next={fetchNextPage}
          hasMore={hasNextPage ?? false}
          loader={
            <div className="py-3">
              <ReviewSkeleton />
            </div>
          }
          scrollableTarget={scrollableTarget}
          className="flex flex-col gap-4"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            <div className="flex flex-col">
              {reviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  layout="position"
                  {...reviewItemAnimation}
                  className={`rounded-2xl border border-gray-100 bg-white p-5 transition-all hover:border-gray-200 hover:shadow-sm ${
                    index !== reviews.length - 1 ? 'mb-6' : ''
                  }`}
                >
                  <Review review={review} showBookInfo />
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
        </InfiniteScroll>
      )}

      {hasNextPage && (
        <div className="flex justify-center pt-2">
          <button
            onClick={() => fetchNextPage()}
            className="rounded-full border border-gray-200 px-6 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            더 보기
          </button>
        </div>
      )}
    </div>
  );
}

const ReviewList = forwardRef(function ReviewList(
  props: Props,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <div ref={ref} className="py-4">
      <Suspense fallback={<ReviewListSkeleton />}>
        <ReviewListContent {...props} />
      </Suspense>
    </div>
  );
});

export default ReviewList;
