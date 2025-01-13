import { Author } from '@/apis/author/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LibraryIcon, MessageSquareIcon, ThumbsUpIcon } from 'lucide-react';

interface Props {
  author: Author;
}

export default function AuthorItem({ author }: Props) {
  return (
    <div className="flex items-center gap-3 rounded-md p-3 hover:cursor-pointer hover:bg-gray-100">
      <Avatar className="h-14 w-14">
        <AvatarImage src={author.imageUrl ?? 'https://picsum.photos/200/300'} />
        <AvatarFallback>{author.nameInKor.slice(0, 2)}</AvatarFallback>
      </Avatar>

      <div className="flex h-full flex-col justify-between py-1">
        <div>
          <p className="text-sm font-semibold">{author.nameInKor}</p>
          <p className="text-xs text-gray-500">{author.name}</p>
        </div>
        <div className="flex gap-2 text-sm text-gray-600">
          <span className="flex items-center gap-0.5">
            <ThumbsUpIcon className="h-3 w-3 stroke-gray-500" />
            <p className="text-xs text-gray-500">{author.likeCount}</p>
          </span>
          <span className="flex items-center gap-0.5">
            <MessageSquareIcon className="h-3 w-3 stroke-gray-500" />
            <p className="text-xs text-gray-500">{author.reviewCount}</p>
          </span>
          <span className="flex items-center gap-0.5">
            <LibraryIcon className="h-3 w-3 stroke-gray-500" />
            <p className="text-xs text-gray-500">{author.bookCount ?? 0}</p>
          </span>
        </div>
      </div>
    </div>
  );
}
