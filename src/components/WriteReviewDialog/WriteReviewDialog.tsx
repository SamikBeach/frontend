'use client';

import { bookApi } from '@/apis/book/book';
import { BookDetail } from '@/apis/book/types';
import { reviewApi } from '@/apis/review/review';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { isLexicalContentEmpty } from '@/utils/lexical';
import { DialogProps } from '@radix-ui/react-dialog';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { Suspense, useEffect, useState } from 'react';
import ReviewEditor from '../ReviewEditor/ReviewEditor';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Skeleton } from '../ui/skeleton';
import { toast } from '../ui/sonner';
import LeaveConfirmDialog from './LeaveConfirmDialog';

interface Props extends DialogProps {
  bookId?: number;
  reviewId?: number;
  onOpenChange?: (open: boolean) => void;
  initialTitle?: string;
  initialContent?: string;
  isEditMode?: boolean;
}

function BookInfo({ bookId }: { bookId: number }) {
  const { data: book } = useSuspenseQuery<
    AxiosResponse<BookDetail>,
    Error,
    BookDetail
  >({
    queryKey: ['book', bookId],
    queryFn: () => bookApi.getBookDetail(bookId),
    select: response => response.data,
  });

  return (
    <div className="flex items-center gap-2">
      <img
        src={book.imageUrl ?? 'https://picsum.photos/200/300'}
        className="h-[40px] rounded-sm"
        alt={book.title}
      />
      <div className="flex flex-col">
        <p className="text-sm font-semibold">{book.title}</p>
        <p className="text-xs text-gray-500">
          {book.authorBooks
            .map(
              (authorBook: { author: { nameInKor: string } }) =>
                authorBook.author.nameInKor
            )
            .join(', ')}{' '}
          · {book.publisher} · {book.publicationDate?.split('-')[0]}
        </p>
      </div>
    </div>
  );
}

function BookInfoSkeleton() {
  return (
    <div className="flex items-center gap-2">
      <Skeleton className="h-[40px] w-[40px] rounded-sm" />
      <div className="flex flex-col gap-1">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-48" />
      </div>
    </div>
  );
}

export default function WriteReviewDialog({
  bookId,
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['book-reviews', bookId] });
      queryClient.invalidateQueries({ queryKey: ['book', bookId] });
      queryClient.invalidateQueries({ queryKey: ['reviews'] });

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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['book-reviews', bookId] });
      queryClient.invalidateQueries({ queryKey: ['book', bookId] });
      queryClient.invalidateQueries({ queryKey: ['reviews'] });

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
