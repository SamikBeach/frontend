'use client';

import { PaginatedResponse } from '@/apis/common/types';
import { reviewApi } from '@/apis/review/review';
import { Comment as CommentType } from '@/apis/review/types';
import {
  CommentItemSkeleton,
  default as CommentListSkeleton,
} from '@/components/CommentItem/CommentSkeleton';
import {
  useSuspenseInfiniteQuery,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { RefObject, Suspense, useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import CommentItem from '../CommentItem/CommentItem';
import EmptyComments from './EmptyComments';

interface Props {
  ref: RefObject<HTMLDivElement | null>;
  reviewId: number;
  scrollableTarget: string;
}

function CommentListContent({ ref, reviewId, scrollableTarget }: Props) {
  const { data: review } = useSuspenseQuery({
    queryKey: ['review', reviewId],
    queryFn: () => reviewApi.getReviewDetail(reviewId),
    select: response => response.data,
  });

  const { data, fetchNextPage, hasNextPage } = useSuspenseInfiniteQuery<
    AxiosResponse<PaginatedResponse<CommentType>>,
    Error
  >({
    queryKey: ['comments', reviewId],
    queryFn: ({ pageParam = 1 }) => {
      return reviewApi.searchComments(reviewId, {
        page: pageParam as number,
        limit: 20,
      });
    },
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

  const comments = useMemo(
    () => data?.pages?.flatMap(page => page.data.data) ?? [],
    [data]
  );

  return (
    <div ref={ref} className="flex flex-1 flex-col gap-4">
      <div className="flex items-center gap-2">
        <h2 className="text-base font-semibold text-gray-900">댓글</h2>
        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
          {review.commentCount}
        </span>
      </div>
      {comments.length === 0 ? (
        <div className="flex-1">
          <EmptyComments />
        </div>
      ) : (
        <InfiniteScroll
          dataLength={comments.length}
          next={fetchNextPage}
          hasMore={hasNextPage ?? false}
          loader={
            <div className="py-2">
              <CommentItemSkeleton />
            </div>
          }
          scrollableTarget={scrollableTarget}
        >
          <div className="flex flex-col">
            {comments.map(comment => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
}

export default function CommentList(props: Props) {
  return (
    <Suspense fallback={<CommentListSkeleton />}>
      <CommentListContent {...props} />
    </Suspense>
  );
}
