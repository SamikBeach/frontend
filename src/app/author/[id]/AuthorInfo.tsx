'use client';

import { Button } from '@/components/ui/button';
import { WriteReviewDialog } from '@/components/WriteReviewDialog';
import { Edit3Icon, MessageSquareIcon, ThumbsUpIcon } from 'lucide-react';

export default function AuthorInfo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <div
          className={
            'group relative h-[200px] w-[200px] flex-shrink-0 cursor-pointer overflow-hidden rounded-full bg-gray-200'
          }
        >
          <img
            src="https://picsum.photos/200/200"
            alt="author"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            width={200}
            height={200}
          />
        </div>

        <div className="flex w-full flex-col justify-between gap-4">
          <div className="flex flex-col gap-0.5">
            <p className="text-2xl font-bold">프리드리히 니체</p>
            <p className="text-gray-500">Friedrich Nietzsche</p>
          </div>

          <div className="flex w-full justify-between pr-6">
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

            <WriteReviewDialog>
              <WriteReviewDialog.Trigger asChild>
                <Button variant="outline">
                  <Edit3Icon />
                  리뷰 쓰기
                </Button>
              </WriteReviewDialog.Trigger>
            </WriteReviewDialog>
          </div>
        </div>
      </div>
    </div>
  );
}
