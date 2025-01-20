import { AuthorDetail } from '@/apis/author/types';
import { Book, BookDetail } from '@/apis/book/types';
import { PaginatedResponse } from '@/apis/common/types';
import { Review } from '@/apis/review/types';
import { UserBase } from '@/apis/user/types';
import { InfiniteData, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

interface UpdateLikeParams {
  reviewId: number;
  isOptimistic: boolean;
  currentStatus?: {
    isLiked: boolean;
    likeCount: number;
  };
}

interface UpdateReviewParams {
  reviewId: number;
  bookId?: number;
  authorId?: number;
  updatedReview: AxiosResponse<Review>;
}

interface DeleteReviewParams {
  reviewId: number;
  bookId: number;
  authorId?: number;
}

interface CreateReviewParams {
  bookId: number;
  newReview: Review;
  currentUser: UserBase;
}

export function useReviewQueryData() {
  const queryClient = useQueryClient();

  function updateReviewLike({
    reviewId,
    isOptimistic,
    currentStatus,
  }: UpdateLikeParams) {
    // 리뷰 목록 쿼리 데이터 업데이트
    queryClient.setQueriesData<
      InfiniteData<AxiosResponse<PaginatedResponse<Review>>>
    >(
      {
        queryKey: ['reviews'],
        exact: false,
      },
      function updateListData(oldData) {
        if (!oldData) return oldData;
        return {
          ...oldData,
          pages: oldData.pages.map(page => ({
            ...page,
            data: {
              ...page.data,
              data: page.data.data.map(function updateItem(review: Review) {
                if (review.id !== reviewId) return review;
                return {
                  ...review,
                  isLiked: isOptimistic
                    ? !review.isLiked
                    : (currentStatus?.isLiked ?? review.isLiked),
                  likeCount: isOptimistic
                    ? review.isLiked
                      ? review.likeCount - 1
                      : review.likeCount + 1
                    : (currentStatus?.likeCount ?? review.likeCount),
                };
              }),
            },
          })),
        };
      }
    );

    // 단일 리뷰 쿼리 데이터 업데이트
    queryClient.setQueryData<AxiosResponse<Review>>(
      ['review', reviewId],
      function updateDetailData(oldData) {
        if (!oldData) return oldData;

        if (isOptimistic) {
          return {
            ...oldData,
            data: {
              ...oldData.data,
              isLiked: !oldData.data.isLiked,
              likeCount: oldData.data.isLiked
                ? oldData.data.likeCount - 1
                : oldData.data.likeCount + 1,
            },
          };
        }

        // Rollback case
        return {
          ...oldData,
          data: {
            ...oldData.data,
            isLiked: currentStatus?.isLiked ?? oldData.data.isLiked,
            likeCount: currentStatus?.likeCount ?? oldData.data.likeCount,
          },
        };
      }
    );
  }

  function updateReviewData({
    reviewId,
    bookId,
    authorId,
    updatedReview,
  }: UpdateReviewParams) {
    // 단일 리뷰 업데이트
    queryClient.setQueryData<AxiosResponse<Review>>(
      ['review', reviewId],
      updatedReview
    );

    // 책의 리뷰 목록 업데이트
    if (bookId) {
      queryClient.setQueriesData<
        InfiniteData<AxiosResponse<PaginatedResponse<Review>>>
      >({ queryKey: ['book-reviews', bookId] }, old => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map(page => ({
            ...page,
            data: {
              ...page.data,
              data: page.data.data.map(review =>
                review.id === reviewId
                  ? {
                      ...review,
                      ...updatedReview.data,
                    }
                  : review
              ),
            },
          })),
        };
      });
    }

    // 작가의 리뷰 목록 업데이트
    if (authorId) {
      queryClient.setQueriesData<
        InfiniteData<AxiosResponse<PaginatedResponse<Review>>>
      >({ queryKey: ['author-reviews', authorId] }, old => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map(page => ({
            ...page,
            data: {
              ...page.data,
              data: page.data.data.map(review =>
                review.id === reviewId
                  ? {
                      ...review,
                      ...updatedReview.data,
                    }
                  : review
              ),
            },
          })),
        };
      });
    }

    // 전체 리뷰 목록 업데이트
    queryClient.setQueriesData<
      InfiniteData<AxiosResponse<PaginatedResponse<Review>>>
    >({ queryKey: ['reviews'] }, oldData => {
      if (!oldData) return oldData;
      return {
        ...oldData,
        pages: oldData.pages.map((page, index) =>
          index === 0
            ? {
                ...page,
                data: {
                  ...page.data,
                  data: [
                    {
                      ...oldData.pages[0].data.data[0],
                      ...updatedReview.data,
                    },
                    ...page.data.data.filter(
                      review => review.id !== updatedReview.data.id
                    ),
                  ],
                  meta: {
                    ...page.data.meta,
                    totalItems: page.data.meta.totalItems + 1,
                  },
                },
              }
            : page
        ),
      };
    });
  }

  function deleteReviewData({
    reviewId,
    bookId,
    authorId,
  }: DeleteReviewParams) {
    // 책의 리뷰 목록 업데이트
    queryClient.setQueriesData<
      InfiniteData<AxiosResponse<PaginatedResponse<Review>>>
    >({ queryKey: ['book-reviews', bookId] }, old => {
      if (!old) return old;
      return {
        ...old,
        pages: old.pages.map(page => ({
          ...page,
          data: {
            ...page.data,
            data: page.data.data.filter((r: Review) => r.id !== reviewId),
          },
        })),
      };
    });

    // 작가의 리뷰 목록 업데이트
    if (authorId) {
      queryClient.setQueriesData<
        InfiniteData<AxiosResponse<PaginatedResponse<Review>>>
      >({ queryKey: ['author-reviews', authorId] }, old => {
        if (!old) return old;
        return {
          ...old,
          pages: old.pages.map(page => ({
            ...page,
            data: {
              ...page.data,
              data: page.data.data.filter((r: Review) => r.id !== reviewId),
            },
          })),
        };
      });

      // 작가 상세 정보의 리뷰 카운트 업데이트
      queryClient.setQueryData<AxiosResponse<AuthorDetail>>(
        ['author', authorId],
        old => {
          if (!old) return old;
          return {
            ...old,
            data: {
              ...old.data,
              reviewCount: (old.data.reviewCount ?? 0) - 1,
            },
          };
        }
      );
    }

    // 책 상세 정보의 리뷰 카운트 업데이트
    queryClient.setQueryData<AxiosResponse<BookDetail>>(
      ['book', bookId],
      old => {
        if (!old) return old;
        return {
          ...old,
          data: {
            ...old.data,
            reviewCount: (old.data.reviewCount ?? 0) - 1,
          },
        };
      }
    );
  }

  function createReviewData({
    bookId,
    newReview,
    currentUser,
  }: CreateReviewParams) {
    const bookData = queryClient.getQueryData<AxiosResponse<Book>>([
      'book',
      bookId,
    ])?.data;
    if (!bookData) return;

    // 책의 리뷰 목록 업데이트
    queryClient.setQueriesData<
      InfiniteData<AxiosResponse<PaginatedResponse<Review>>>
    >({ queryKey: ['book-reviews', bookId] }, old => {
      if (!old) return old;

      return {
        ...old,
        pages: old.pages.map((page, index) =>
          index === 0
            ? {
                ...page,
                data: {
                  ...page.data,
                  data: [
                    {
                      ...newReview,
                      book: bookData,
                      user: currentUser,
                    },
                    ...page.data.data,
                  ],
                  meta: {
                    ...page.data.meta,
                    totalItems: page.data.meta.totalItems + 1,
                  },
                },
              }
            : page
        ),
      };
    });

    // 책 상세 정보의 리뷰 카운트 업데이트
    queryClient.setQueryData<AxiosResponse<Book>>(['book', bookId], old => {
      if (!old) return old;
      return {
        ...old,
        data: {
          ...old.data,
          reviewCount: old.data.reviewCount + 1,
        },
      };
    });

    // 전체 리뷰 목록 업데이트
    queryClient.setQueriesData<
      InfiniteData<AxiosResponse<PaginatedResponse<Review>>>
    >({ queryKey: ['reviews'] }, oldData => {
      if (!oldData) return oldData;

      return {
        ...oldData,
        pages: oldData.pages.map((page, index) =>
          index === 0
            ? {
                ...page,
                data: {
                  ...page.data,
                  data: [
                    {
                      ...newReview,
                      book: bookData,
                      user: currentUser,
                    },
                    ...page.data.data,
                  ],
                  meta: {
                    ...page.data.meta,
                    totalItems: page.data.meta.totalItems + 1,
                  },
                },
              }
            : page
        ),
      };
    });
  }

  return {
    updateReviewLike,
    updateReviewData,
    deleteReviewData,
    createReviewData,
  };
}
