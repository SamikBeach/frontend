import { Edit3Icon } from 'lucide-react';

import { MessageSquareIcon } from 'lucide-react';

import { ThumbsUpIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';

export default function BookInfo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <div
          className={
            'group relative h-[300px] w-[200px] flex-shrink-0 cursor-pointer overflow-hidden rounded-lg bg-gray-200'
          }
        >
          <img
            src="https://picsum.photos/200/300"
            alt="book"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            width={200}
            height={300}
          />
        </div>

        <div className="flex w-full flex-col justify-between gap-4">
          <div className="flex flex-col gap-0.5">
            <p className="text-2xl font-bold">차라투스트라는 이렇게 말했다</p>
            <p className="text-gray-500">프리드리히 니체 · 민음사 · 2021</p>
          </div>

          <div className="flex w-full justify-between">
            <div className="flex gap-2">
              <Button className="rounded-full" variant="outline">
                <ThumbsUpIcon className="h-4 w-4" />
                <span>300</span>
              </Button>
              <Button className="rounded-full" variant="outline">
                <MessageSquareIcon className="h-4 w-4" />
                <span>300</span>
              </Button>
            </div>

            <Button variant="outline">
              <Edit3Icon />
              리뷰 쓰기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
