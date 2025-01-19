import { Author } from '@/apis/author/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CommandItem } from '@/components/ui/command';
import { LibraryIcon, MessageSquareIcon, ThumbsUpIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Highlighter from 'react-highlight-words';
import DeleteButton from './DeleteButton';

interface Props {
  author: Author;
  onOpenChange: (open: boolean) => void;
  onClick: () => void;
  onDelete?: (e: React.MouseEvent) => void;
  searchValue?: string;
}

export default function AuthorItem({
  author,
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

    router.push(`/author/${author.id}`);
  };

  return (
    <CommandItem
      value={author.nameInKor}
      onSelect={handleClick}
      className="group relative cursor-pointer data-[highlighted]:bg-gray-50"
    >
      <Avatar className="h-16 w-16 shrink-0">
        <AvatarImage
          src={author.imageUrl ?? undefined}
          alt={author.nameInKor}
          className="object-cover"
        />
        <AvatarFallback>{author.nameInKor[0]}</AvatarFallback>
      </Avatar>
      <div className="flex flex-1 flex-col gap-1 py-1 pl-2">
        <div className="flex flex-col gap-1">
          <h4 className="text-sm font-medium">
            <Highlighter
              searchWords={searchWords}
              textToHighlight={author.nameInKor}
              highlightClassName="text-blue-500 bg-transparent font-bold"
            />
          </h4>
          <p className="text-xs text-gray-500">
            <Highlighter
              searchWords={searchWords}
              textToHighlight={author.name}
              highlightClassName="text-blue-500 bg-transparent font-bold"
            />
          </p>
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          <span className="flex items-center gap-0.5 text-xs">
            <ThumbsUpIcon className="!h-3 !w-3" />
            {author.likeCount}
          </span>
          <span className="flex items-center gap-0.5 text-xs">
            <MessageSquareIcon className="!h-3 !w-3" />
            {author.reviewCount}
          </span>
          <span className="flex items-center gap-0.5 text-xs">
            <LibraryIcon className="!h-3 !w-3" />
            {author.reviewCount}
          </span>
        </div>
      </div>
      {onDelete && <DeleteButton onClick={onDelete} />}
    </CommandItem>
  );
}
