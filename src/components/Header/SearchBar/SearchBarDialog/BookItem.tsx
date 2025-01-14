import { Book } from '@/apis/book/types';
import { CommandItem } from '@/components/ui/command';
import { MessageSquareIcon, ThumbsUpIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import DeleteButton from './DeleteButton';

interface Props {
  book: Book;
  onOpenChange: (open: boolean) => void;
  onClick: () => void;
  onDelete?: (e: React.MouseEvent) => void;
}

export default function BookItem({
  book,
  onOpenChange,
  onClick,
  onDelete,
}: Props) {
  const router = useRouter();

  const handleClick = () => {
    onClick();
    onOpenChange(false);

    router.push(`/book/${book.id}`);
  };

  return (
    <div className="group relative">
      <CommandItem
        value={book.title}
        onSelect={handleClick}
        className="cursor-pointer"
      >
        <img
          src={book.imageUrl ?? '/placeholder-book.png'}
          alt={book.title}
          className="h-[84px] w-[58px] rounded-[2px] object-cover shadow-sm"
        />
        <div className="flex flex-1 flex-col gap-1">
          <div>
            <h4 className="line-clamp-1 text-[15px] font-medium">
              {book.title}
            </h4>
            <p className="line-clamp-1 text-[13px] text-muted-foreground">
              {book.authorBooks.map(ab => ab.author.nameInKor).join(', ')}
            </p>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <ThumbsUpIcon className="h-3.5 w-3.5" />
              {book.likeCount}
            </span>
            <span className="flex items-center gap-1">
              <MessageSquareIcon className="h-3.5 w-3.5" />
              {book.reviewCount}
            </span>
          </div>
        </div>
      </CommandItem>
      {onDelete && <DeleteButton onClick={onDelete} />}
    </div>
  );
}
