import { Edit3Icon } from 'lucide-react';

import { MessageSquareIcon } from 'lucide-react';

import { DialogTitle } from '@radix-ui/react-dialog';
import { ThumbsUpIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { WriteReviewDialog } from '../WriteReviewDialog';

export default function BookInfo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <div
          className={
            'group relative h-[210px] w-[140px] flex-shrink-0 cursor-pointer overflow-hidden rounded-lg bg-gray-200'
          }
        >
          <img
            src="https://picsum.photos/140/210"
            alt="book"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            width={140}
            height={210}
          />
        </div>
        <div className="flex w-full flex-col justify-between">
          <div className="flex flex-col gap-0.5">
            <DialogTitle>
              <p className="text-2xl font-bold">차라투스트라는 이렇게 말했다</p>
            </DialogTitle>
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
