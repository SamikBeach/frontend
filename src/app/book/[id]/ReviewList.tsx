'use client';

import { bookApi } from '@/apis/book/book';
import { PaginatedResponse } from '@/apis/common/types';
import { Review as ReviewType } from '@/apis/review/types';
import { Review } from '@/components/Review';
import EmptyReviews from '@/components/Review/EmptyReviews';
import {
  ReviewListSkeleton,
  ReviewSkeleton,
} from '@/components/Review/ReviewSkeleton';
import { Checkbox } from '@/components/ui/checkbox';
import { reviewItemAnimation } from '@/constants/animations';
import {
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { ForwardedRef, Suspense, forwardRef, useMemo, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

interface Props {
  bookId: number;
  scrollableTarget: string;
}

function ReviewListContent({ bookId, scrollableTarget }: Props) {
  const [includeOtherTranslations, setIncludeOtherTranslations] = useState(false);

  const { data: book } = useSuspenseQuery({
    queryKey: ['book', bookId],
    queryFn: () => bookApi.getBookDetail(bookId),
    select: response => response.data,
  });

  const { data, fetchNextPage, hasNextPage } = useSuspenseInfiniteQuery<
    AxiosResponse<PaginatedResponse<ReviewType>>,
    Error
  >({
    queryKey: ['book-reviews', bookId, includeOtherTranslations],
    queryFn: ({ pageParam = 1 }) =>
      bookApi.searchBookReviews(bookId, {
        page: pageParam as number,
        limit: 20,
      }, includeOtherTranslations),
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
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold text-gray-900">리뷰</h2>
          <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
            {book.reviewCount}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="includeOtherTranslations"
            checked={includeOtherTranslations}
            onCheckedChange={(checked: boolean) => setIncludeOtherTranslations(checked)}
          />
          <label
            htmlFor="includeOtherTranslations"
            className="text-sm leading-none text-gray-600 peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            다른 번역서의 리뷰도 함께 보기
          </label>
        </div>
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
          <AnimatePresence mode="popLayout" initial={false}>
            <div className="flex flex-col gap-2">
              {reviews.map(review => (
                <motion.div
                  key={review.id}
                  layout="position"
                  {...reviewItemAnimation}
                >
                  <Review review={review} />
                </motion.div>
              ))}
            </div>
          </AnimatePresence>
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
