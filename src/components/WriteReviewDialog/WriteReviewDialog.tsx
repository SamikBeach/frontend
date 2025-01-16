'use client';

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
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Suspense, useEffect, useState } from 'react';
import ReviewEditor from '../ReviewEditor/ReviewEditor';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { toast } from '../ui/sonner';
import { BookInfo, BookInfoSkeleton } from './BookInfo';
import LeaveConfirmDialog from './LeaveConfirmDialog';

interface Props extends DialogProps {
  bookId?: number;
  reviewId?: number;
  onOpenChange?: (open: boolean) => void;
  initialTitle?: string;
  initialContent?: string;
  isEditMode?: boolean;
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
