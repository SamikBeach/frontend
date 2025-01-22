'use client';

import { reviewApi } from '@/apis/review/review';
import ReviewEditor from '@/components/ReviewEditor/ReviewEditor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/sonner';
import { useReviewQueryData } from '@/hooks/queries/useReviewQueryData';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { isLexicalContentEmpty } from '@/utils/lexical';
import { useMutation } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import BookInfo from './BookInfo';
import LeaveConfirmDialog from './LeaveConfirmDialog';

export default function WriteReviewPage() {
  const searchParams = useSearchParams();
  const bookId = searchParams.get('bookId');
  const router = useRouter();
  const currentUser = useCurrentUser();
  const { createReviewDataQueryData } = useReviewQueryData();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isOpenLeaveConfirmDialog, setIsOpenLeaveConfirmDialog] =
    useState(false);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (title.trim() || !isLexicalContentEmpty(content)) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [title, content]);

  const { mutate: createReview, isPending } = useMutation({
    mutationFn: () => {
      if (!bookId) throw new Error('Book ID is required');
      return reviewApi.createReview(Number(bookId), { title, content });
    },
    onSuccess: response => {
      if (bookId && currentUser) {
        createReviewDataQueryData({
          bookId: Number(bookId),
          newReview: response.data,
          currentUser,
        });
      }

      toast.success('리뷰가 작성되었습니다.');
      router.back();
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

    createReview();
  };

  const handleBack = () => {
    if (title.trim() || !isLexicalContentEmpty(content)) {
      setIsOpenLeaveConfirmDialog(true);
      return;
    }
    router.back();
  };

  if (!bookId) {
    router.back();
    return null;
  }

  return (
    <>
      <div className="flex h-full flex-col gap-4 p-4">
        <Suspense>
          <BookInfo bookId={Number(bookId)} />
        </Suspense>
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
        <div className="mt-auto flex items-center justify-between">
          <Button variant="ghost" onClick={handleBack}>
            취소
          </Button>
          <Button onClick={handleSubmit} disabled={isPending}>
            {isPending ? '제출 중...' : '제출하기'}
          </Button>
        </div>
      </div>
      <LeaveConfirmDialog
        open={isOpenLeaveConfirmDialog}
        onOpenChange={setIsOpenLeaveConfirmDialog}
        onConfirm={() => {
          router.back();
        }}
      />
    </>
  );
}
