'use client';

import { reviewApi } from '@/apis/review/review';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { DialogProps } from '@radix-ui/react-dialog';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { toast } from '../ui/sonner';
import LeaveConfirmDialog from './LeaveConfirmDialog';
import ReviewEditor from './ReviewEditor';

interface Props extends DialogProps {
  bookId: number;
  onOpenChange?: (open: boolean) => void;
}

export default function WriteReviewDialog({
  bookId,
  children,
  onOpenChange,
  ...props
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenLeaveConfirmDialog, setIsOpenLeaveConfirmDialog] =
    useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const queryClient = useQueryClient();

  const resetForm = () => {
    setTitle('');
    setContent('');
  };

  const { mutate: createReview, isPending } = useMutation({
    mutationFn: () => reviewApi.createReview(bookId, { title, content }),
    onSuccess: () => {
      // Invalidate book reviews query
      queryClient.invalidateQueries({ queryKey: ['book-reviews', bookId] });
      queryClient.invalidateQueries({ queryKey: ['book', bookId] });

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

    if (!content.trim()) {
      toast.error('내용을 입력해주세요.');
      return;
    }

    createReview();
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      resetForm();
    }

    setIsOpen(open);
    onOpenChange?.(open);
  };

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
        >
          <DialogHeader>
            <DialogTitle />
            <div className="flex items-center gap-2">
              <img
                src="https://contents.kyobobook.co.kr/sih/fit-in/400x0/pdt/9788970132099.jpg"
                className="h-[40px] rounded-sm"
              />
              <div className="flex flex-col">
                <p className="text-sm font-semibold">
                  차라투스트라는 이렇게 말했다
                </p>
                <p className="text-xs text-gray-500">
                  프리드리히 니체 · 민음사 · 2021
                </p>
              </div>
            </div>
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
              {isPending ? '제출 중...' : '제출하기'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <LeaveConfirmDialog
        open={isOpenLeaveConfirmDialog}
        onOpenChange={setIsOpenLeaveConfirmDialog}
      />
    </>
  );
}

WriteReviewDialog.Trigger = DialogTrigger;
