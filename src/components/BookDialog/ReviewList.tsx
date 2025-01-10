'use client';

import { bookApi } from '@/apis/book/book';
import { Review } from '@/components/Review';
import { useQuery } from '@tanstack/react-query';

interface Props {
  bookId: number;
  reviewCount: number;
}

export default function ReviewList({ bookId, reviewCount }: Props) {
  const { data: reviews } = useQuery({
    queryKey: ['reviews', bookId],
    queryFn: () => bookApi.searchBookReviews(bookId, { page: 1, limit: 20 }),
    select: data => data.data.data,
  });

  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm font-semibold">리뷰 {reviewCount}</p>
      {reviews?.map(review => <Review key={review.id} review={review} />)}
    </div>
  );
}
