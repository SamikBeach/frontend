import { MessageSquareIcon } from 'lucide-react';

export default function EmptyReviews() {
  return (
    <div className="flex flex-col items-center gap-2 py-12">
      <MessageSquareIcon className="h-12 w-12 stroke-gray-400" />
      <p className="text-sm text-gray-500">아직 리뷰가 없어요.</p>
    </div>
  );
}
