import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LibraryIcon, ThumbsUpIcon } from 'lucide-react';

import { MessageSquareIcon } from 'lucide-react';

export default function AuthorItem() {
  return (
    <div className="flex items-center gap-3 rounded-md px-2 py-1.5 hover:cursor-pointer hover:bg-gray-100">
      <Avatar className="h-14 w-14">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      <div className="flex h-full flex-col justify-between py-1">
        <div>
          <p className="text-sm font-semibold">프리드리히 니체</p>
          <p className="text-xs text-gray-500">Friedrich Wilhelm Nietzsche</p>
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
          <span className="flex items-center gap-0.5">
            <LibraryIcon className="h-3 w-3 stroke-gray-500" />
            <p className="text-xs text-gray-500">212</p>
          </span>
        </div>
      </div>
    </div>
  );
}
