import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquareIcon, ThumbsUpIcon } from 'lucide-react';

export default function AuthorListItem() {
  return (
    <div className="flex items-center gap-6">
      <Avatar className="h-20 w-20 cursor-pointer">
        <AvatarImage
          src="https://github.com/shadcn.png"
          className="transition-transform duration-300 hover:scale-110"
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex h-20 flex-col justify-between">
        <div>
          <div className="flex items-center gap-1">
            <p className="font-semibold">데이비드 흄</p>
            <p className="text-sm text-gray-500">David Hume</p>
          </div>
          <p className="text-sm">
            가낟라마바사아자가낟라마바사아자가낟라마바사아자가낟라마바사아자
            가낟라마바사아자가낟라마바사아자가낟라마바사아자가낟라마바사아자가낟라마바사아자가낟라마바사아자가낟라마바사아자
          </p>
        </div>
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
