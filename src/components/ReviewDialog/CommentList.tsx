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
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-1 flex-col gap-4">
      <p className="text-sm font-semibold">댓글 {commentCount}</p>
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
            <div className="flex h-20 items-center justify-center">
              Loading...
            </div>
          }
          scrollableTarget={scrollableTarget}
        >
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
        </InfiniteScroll>
      )}
    </div>
  );
}
