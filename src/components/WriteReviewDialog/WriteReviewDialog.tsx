'use client';

import { Author } from '@/apis/author/types';
import { Book } from '@/apis/book/types';
import { PaginatedResponse } from '@/apis/common/types';
import { reviewApi } from '@/apis/review/review';
import { Review } from '@/apis/review/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { isLexicalContentEmpty } from '@/utils/lexical';
import { DialogProps } from '@radix-ui/react-dialog';
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { Suspense, useEffect, useState } from 'react';
import ReviewEditor from '../ReviewEditor/ReviewEditor';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { toast } from '../ui/sonner';
import { BookInfo, BookInfoSkeleton } from './BookInfo';
import LeaveConfirmDialog from './LeaveConfirmDialog';

interface Props extends DialogProps {
  bookId?: number;
  authorId?: number;
  reviewId?: number;
  onOpenChange?: (open: boolean) => void;
  initialTitle?: string;
  initialContent?: string;
  isEditMode?: boolean;
}

export default function WriteReviewDialog({
  bookId,
  authorId,
  reviewId,
  children,
  onOpenChange,
  initialTitle = '',
  initialContent = '',
  isEditMode = false,
  ...props
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenLeaveConfirmDialog, setIsOpenLeaveConfirmDialog] =
    useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [content, setContent] = useState(initialContent);

  const queryClient = useQueryClient();
  const currentUser = useCurrentUser();

  useEffect(() => {
    setTitle(initialTitle);
    setContent(initialContent);
  }, [initialTitle, initialContent]);

  const resetForm = () => {
    setTitle(initialTitle);
    setContent(initialContent);
  };

  const { mutate: updateReview, isPending: isUpdatePending } = useMutation({
    mutationFn: () => {
      if (!reviewId) {
        throw new Error('Review ID is required');
      }

      return reviewApi.updateReview(reviewId, { title, content });
    },
    onSuccess: updatedReview => {
      queryClient.setQueryData<AxiosResponse<Review>>(
        ['review', reviewId],
        updatedReview
      );

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
      }

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

        queryClient.setQueryData<AxiosResponse<Author>>(
          ['author', authorId],
          old => {
            if (!old) return old;
            return old;
          }
        );
      }

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

      toast.success('리뷰가 수정되었습니다.');
      resetForm();

      setIsOpen(false);
      onOpenChange?.(false);
    },
    onError: () => {
      toast.error('리뷰 수정에 실패했습니다.');
    },
  });

  const { mutate: createReview, isPending: isCreatePending } = useMutation({
    mutationFn: () => {
      if (!bookId) {
        throw new Error('Book ID is required');
      }

      return reviewApi.createReview(bookId, { title, content });
    },
    onSuccess: newReview => {
      if (bookId) {
        const bookData = queryClient.getQueryData<AxiosResponse<Book>>([
          'book',
          bookId,
        ])?.data;
        if (!bookData) return;

        queryClient.setQueriesData<
          InfiniteData<AxiosResponse<PaginatedResponse<Review>>>
        >({ queryKey: ['book-reviews', bookId] }, old => {
          if (!old) return old;

          if (!currentUser) return old;

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
                          ...newReview.data,
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

        queryClient.setQueriesData<
          InfiniteData<AxiosResponse<PaginatedResponse<Review>>>
        >({ queryKey: ['reviews'] }, oldData => {
          if (!oldData) return oldData;

          if (!currentUser) return oldData;

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
                          ...newReview.data,
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

      toast.success('리뷰가 작성되었습니다.');
      resetForm();

      setIsOpen(false);
      onOpenChange?.(false);
    },
    onError: () => {
      toast.error('리뷰 작성에 실패했습니다.');
    },
  });

  const handleSubmit = () => {
    if (!title.trim()) {
      toast.error('제목을 입력해주세요.');
      return;
    }

    if (isLexicalContentEmpty(content)) {
      toast.error('내용을 입력해주세요.');
      return;
    }

    if (isEditMode) {
      updateReview();
    } else {
      createReview();
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      if (title.trim() || !isLexicalContentEmpty(content)) {
        setIsOpenLeaveConfirmDialog(true);

        return;
      }
      resetForm();
    }

    setIsOpen(open);
    onOpenChange?.(open);
  };

  const handleConfirmLeave = () => {
    resetForm();
    setIsOpen(false);
    setIsOpenLeaveConfirmDialog(false);
    onOpenChange?.(false);
  };

  const isPending = isEditMode ? isUpdatePending : isCreatePending;

  return (
    <>
      <Dialog
        {...props}
        open={props.open ?? isOpen}
        onOpenChange={handleOpenChange}
      >
        {children}
        <DialogContent
          className="flex h-[84vh] w-[800px] min-w-[800px] flex-col gap-4 overflow-y-auto p-10"
          overlayClassName="bg-black/50"
          aria-describedby={undefined}
          onPointerDownOutside={e => {
            if (!isLexicalContentEmpty(content) || title.trim() !== '') {
              e.preventDefault();
            }
          }}
        >
          <DialogHeader>
            <DialogTitle />
            {bookId && (
              <Suspense fallback={<BookInfoSkeleton />}>
                <BookInfo bookId={bookId} />
              </Suspense>
            )}
          </DialogHeader>
          <Input
            placeholder="제목"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <ReviewEditor
            content={content}
            onChange={setContent}
            placeholder="내용을 입력하세요..."
          />
          <div className="flex justify-end">
            <Button onClick={handleSubmit} disabled={isPending}>
              {isPending ? '제출 중...' : isEditMode ? '수정하기' : '제출하기'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <LeaveConfirmDialog
        open={isOpenLeaveConfirmDialog}
        onOpenChange={setIsOpenLeaveConfirmDialog}
        onConfirm={handleConfirmLeave}
      />
    </>
  );
}

WriteReviewDialog.Trigger = DialogTrigger;
