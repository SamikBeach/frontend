import { Review } from '@/components/Review';

export default function ReviewList() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm font-semibold">리뷰 4</p>
      <Review />
      <Review />
      <Review />
      <Review />
      <Review />
      <Review />
      <Review />
    </div>
  );
}
