'use client';

import { PaginatedResponse } from '@/apis/common/types';
import { Review as ReviewType } from '@/apis/review/types';
import { userApi } from '@/apis/user/user';
import { Review } from '@/components/Review';
import { ReviewListSkeleton } from '@/components/Review/ReviewSkeleton';
import { useDialogQuery } from '@/hooks/useDialogQuery';
import { isMobileDevice } from '@/utils/responsive';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

interface Props {
  userId: number;
}

export default function ReviewList({ userId }: Props) {
  const { open } = useDialogQuery({ type: 'review' });
  const router = useRouter();

  const { data, fetchNextPage, hasNextPage } = useSuspenseInfiniteQuery<
    AxiosResponse<PaginatedResponse<ReviewType>>,
    Error
  >({
    queryKey: ['user-reviews', userId],
    queryFn: ({ pageParam = 1 }) =>
      userApi.getUserReviews(userId, {
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

  if (reviews.length === 0) {
    return <div>아직 작성한 리뷰가 없습니다.</div>;
  }

  return (
    <InfiniteScroll
      dataLength={reviews.length}
      next={fetchNextPage}
      hasMore={hasNextPage ?? false}
      loader={<ReviewListSkeleton />}
    >
      <div className="flex flex-col gap-8">
        {reviews.map(review => (
          <Review
            key={review.id}
            review={review}
            hideUserInfo
            showBookInfo
            onClickTitle={() => {
              if (isMobileDevice()) {
                router.push(`/review/${review.id}`);
                return;
              }
              open(review.id);
            }}
            disableClickActions
          />
        ))}
      </div>
    </InfiniteScroll>
  );
}
