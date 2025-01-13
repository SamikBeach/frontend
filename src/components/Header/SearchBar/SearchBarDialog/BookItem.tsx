import { Book } from '@/apis/book/types';
import { MessageSquareIcon, ThumbsUpIcon } from 'lucide-react';

interface Props {
  book: Book;
}

export default function BookItem({ book }: Props) {
  return (
    <div className="flex items-center gap-3 rounded-md p-3 hover:cursor-pointer hover:bg-gray-100">
      <div className="relative h-[80px] w-[56px] overflow-hidden rounded-sm bg-gray-200">
        <img
          src={book.imageUrl ?? 'https://picsum.photos/200/300'}
          alt={book.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </div>

      <div className="flex h-full flex-col justify-between py-1">
        <div>
          <p className="text-sm font-semibold">{book.title}</p>
          <p className="text-xs text-gray-500">
            {book.authorBooks.map(ab => ab.author.nameInKor).join(', ')}
          </p>
        </div>
        <div className="flex gap-2 text-sm text-gray-600">
          <span className="flex items-center gap-0.5">
            <ThumbsUpIcon className="h-3 w-3 stroke-gray-500" />
            <p className="text-xs text-gray-500">{book.likeCount}</p>
          </span>
          <span className="flex items-center gap-0.5">
            <MessageSquareIcon className="h-3 w-3 stroke-gray-500" />
            <p className="text-xs text-gray-500">{book.reviewCount}</p>
          </span>
        </div>
      </div>
    </div>
  );
}
