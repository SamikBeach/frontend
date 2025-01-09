import { PaginatedResponse } from '@/apis/common/types';
import { reviewApi } from '@/apis/review/review';
import { Comment as CommentType } from '@/apis/review/types';
import { Comment } from '@/components/Comment';
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useMemo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import EmptyComments from './EmptyComments';

interface Props {
  reviewId: number;
  commentCount: number;
  scrollableTarget: string;
}

export default function CommentList({
  reviewId,
  commentCount,
  scrollableTarget,
}: Props) {
  const { data, fetchNextPage, isLoading, hasNextPage } = useInfiniteQuery<
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
    placeholderData: keepPreviousData,
  });

  const comments = useMemo(
    () => data?.pages?.flatMap(page => page.data.data) ?? [],
    [data]
  );

  if (isLoading) {
    return (
      <div className="flex h-20 items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex items-center gap-2">
        <h2 className="text-base font-semibold text-gray-900">댓글</h2>
        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
          {commentCount}
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
            <div className="flex h-16 items-center justify-center text-sm text-gray-500">
              Loading...
            </div>
          }
          scrollableTarget={scrollableTarget}
        >
          <div className="flex flex-col">
            {comments.map(comment => (
              <Comment
                key={comment.id}
                content={comment.content}
                user={comment.user}
                likeCount={comment.likeCount}
                isLiked={comment.isLiked}
                createdAt={comment.createdAt}
              />
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
}
