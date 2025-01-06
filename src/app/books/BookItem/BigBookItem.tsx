import { ThumbsUpIcon } from 'lucide-react';

import { MessageSquareIcon } from 'lucide-react';

export default function BigBookItem() {
  return (
    <div className="flex flex-col gap-1">
      <div className="relative h-[370px] min-w-[250px] overflow-hidden rounded-lg bg-gray-200">
        <img
          src="https://picsum.photos/250/370"
          alt="book"
          className="absolute inset-0 h-full w-full object-cover"
          width={250}
          height={370}
        />
      </div>
      <div className="flex flex-col gap-0.5">
        <p className="font-semibold">짜라투스트라는 이렇게 말했다</p>
        <p className="text-sm text-gray-500">프리드리히 니체 · 민음사 · 2021</p>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <ThumbsUpIcon className="h-4 w-4" />
            <span>300</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquareIcon className="mt-0.5 h-4 w-4" />
            <span>300</span>
          </div>
        </div>
      </div>
    </div>
  );
}
