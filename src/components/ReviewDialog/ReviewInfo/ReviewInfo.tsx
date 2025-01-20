import { PaginatedResponse } from '@/apis/common/types';
import { reviewApi } from '@/apis/review/review';
import { Review } from '@/apis/review/types';
import BookImage from '@/components/BookImage/BookImage';
import { CommentButton } from '@/components/CommentButton';
import { LikeButton } from '@/components/LikeButton';
import { UserAvatar } from '@/components/UserAvatar';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useDialogQuery } from '@/hooks/useDialogQuery';
import { DialogTitle } from '@radix-ui/react-dialog';
import {
  InfiniteData,
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { format } from 'date-fns';
import Link from 'next/link';
import { RefObject, Suspense, useState } from 'react';
import ReviewContent from '../../Review/ReviewContent';
import { toast } from '../../ui/sonner';
import { WriteReviewDialog } from '../../WriteReviewDialog';
import DeleteReviewDialog from '../DeleteReviewDialog';
import ReviewActions from '../ReviewActions';
import ReviewInfoSkeleton from './ReviewInfoSkeleton';

interface Props {
  reviewId: number;
  commentListRef: RefObject<HTMLDivElement | null>;
}

function ReviewInfoContent({ reviewId, commentListRef }: Props) {
  // ... existing code ...
}

export default function ReviewInfo(props: Props) {
  return (
    <Suspense fallback={<ReviewInfoSkeleton />}>
      <ReviewInfoContent {...props} />
    </Suspense>
  );
} 