import { MessageSquareIcon } from 'lucide-react';

export default function EmptyComments() {
  return (
    <div className="flex min-h-[200px] flex-col items-center justify-center gap-2 rounded-lg p-6">
      <MessageSquareIcon className="h-12 w-12 text-gray-300" />
      <div className="text-center">
        <p className="font-medium text-gray-600">아직 댓글이 없어요.</p>
        <p className="text-sm text-gray-500">첫 번째 댓글을 남겨보세요.</p>
      </div>
    </div>
  );
}
