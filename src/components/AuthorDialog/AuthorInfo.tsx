import { MessageSquareIcon } from 'lucide-react';

import { DialogTitle } from '@radix-ui/react-dialog';
import { ThumbsUpIcon } from 'lucide-react';
import { Button } from '../ui/button';

export default function AuthorInfo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <div
          className={
            'group relative h-[140px] w-[140px] flex-shrink-0 cursor-pointer overflow-hidden rounded-full bg-gray-200'
          }
        >
          <img
            src="https://picsum.photos/140/140"
            alt="author"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            width={140}
            height={140}
          />
        </div>
        <div className="flex w-full flex-col justify-between">
          <div className="flex flex-col gap-0.5">
            <DialogTitle>
              <p className="text-2xl font-bold">프리드리히 니체</p>
            </DialogTitle>
            <p className="text-gray-500">Friedrich Nietzsche</p>
          </div>

          <div className="flex w-full">
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
          </div>
        </div>
      </div>
    </div>
  );
}
