import { ThumbsUpIcon } from 'lucide-react';

import { MessageSquareIcon } from 'lucide-react';

export default function BookItem() {
  return (
    <div className="flex gap-3 rounded-md p-3 hover:cursor-pointer hover:rounded-md hover:bg-gray-100">
      <img
        src="https://contents.kyobobook.co.kr/sih/fit-in/400x0/pdt/9788970132099.jpg"
        className="h-20 w-14 rounded-sm object-cover"
        alt="짜라투스트라는 이렇게 말했다 표지"
      />
      <div className="flex flex-col justify-between">
        <div>
          <p className="text-sm font-semibold">짜라투스트라는 이렇게 말했다</p>
          <p className="text-xs text-gray-500">
            프리드리히 니체 · 민음사 · 2021
          </p>
        </div>
        <div className="flex gap-2 text-sm text-gray-600">
          <span className="flex items-center gap-0.5">
            <ThumbsUpIcon className="h-3 w-3 stroke-gray-500" />
            <p className="text-xs text-gray-500">300</p>
          </span>
          <span className="flex items-center gap-0.5">
            <MessageSquareIcon className="mt-0.5 h-3 w-3 stroke-gray-500" />
            <p className="text-xs text-gray-500">212</p>
          </span>
        </div>
      </div>
    </div>
  );
}
