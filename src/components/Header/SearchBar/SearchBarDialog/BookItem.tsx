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
    <CommandItem
      value={book.title}
      onSelect={handleClick}
      className="group relative cursor-pointer"
    >
      <img
        src={book.imageUrl ?? undefined}
        alt={book.title}
        className="h-20 w-14 rounded-sm object-cover"
      />
      <div className="flex h-20 flex-1 flex-col justify-between py-1">
        <div>
          <h4 className="line-clamp-1 text-xs font-medium">{book.title}</h4>
          <p className="line-clamp-1 text-xs text-muted-foreground/70">
            {book.authorBooks.map(ab => ab.author.nameInKor).join(', ')}
          </p>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground/70">
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
