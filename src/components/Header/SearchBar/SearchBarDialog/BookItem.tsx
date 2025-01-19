import { Book } from '@/apis/book/types';
import { CommandItem } from '@/components/ui/command';
import { MessageSquareIcon, ThumbsUpIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Highlighter from 'react-highlight-words';
import DeleteButton from './DeleteButton';

interface Props {
  book: Book;
  onOpenChange: (open: boolean) => void;
  onClick: () => void;
  onDelete?: (e: React.MouseEvent) => void;
  searchValue?: string;
}

export default function BookItem({
  book,
  onOpenChange,
  onClick,
  onDelete,
  searchValue = '',
}: Props) {
  const router = useRouter();
  const searchWords = searchValue ? [searchValue] : [];

  const handleClick = () => {
    onClick();
    onOpenChange(false);

    router.push(`/book/${book.id}`);
  };

  return (
    <CommandItem
      value={book.title}
      onSelect={handleClick}
      className="group relative cursor-pointer data-[highlighted]:bg-gray-50"
    >
      <img
        src={book.imageUrl ?? undefined}
        alt={book.title}
        className="h-24 w-16 rounded-sm object-cover"
      />
      <div className="flex h-24 flex-1 flex-col justify-between py-1.5 pl-2">
        <div className="flex flex-col gap-1">
          <h4 className="line-clamp-1 text-sm font-medium">
            <Highlighter
              searchWords={searchWords}
              textToHighlight={book.title}
              highlightClassName="text-blue-500 bg-transparent font-bold"
            />
          </h4>
          <p className="line-clamp-1 text-xs text-gray-500">
            <Highlighter
              searchWords={searchWords}
              textToHighlight={book.authorBooks
                .map(ab => ab.author.nameInKor)
                .join(', ')}
              highlightClassName="text-blue-500 font-bold bg-transparent"
            />
          </p>
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <span className="flex items-center gap-0.5 text-xs">
            <ThumbsUpIcon className="!h-3 !w-3" />
            {book.likeCount}
          </span>
          <span className="flex items-center gap-0.5 text-xs">
            <MessageSquareIcon className="!h-3 !w-3" />
            {book.reviewCount}
          </span>
        </div>
      </div>
      {onDelete && <DeleteButton onClick={onDelete} />}
    </CommandItem>
  );
}
