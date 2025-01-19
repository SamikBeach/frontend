import { Author } from '@/apis/author/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CommandItem } from '@/components/ui/command';
import { MessageSquareIcon, ThumbsUpIcon } from 'lucide-react';
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

  const handleClick = () => {
    onClick();
    onOpenChange(false);

    router.push(`/author/${author.id}`);
  };

  return (
    <CommandItem
      value={author.nameInKor}
      onSelect={handleClick}
      className="group relative cursor-pointer"
    >
      <Avatar className="h-14 w-14 shrink-0">
        <AvatarImage
          src={author.imageUrl ?? undefined}
          alt={author.nameInKor}
          className="object-cover"
        />
        <AvatarFallback>{author.nameInKor[0]}</AvatarFallback>
      </Avatar>
      <div className="flex flex-1 flex-col gap-0.5">
        <div className="flex flex-col gap-0.5">
          <h4 className="text-sm font-medium">
            <Highlighter
              searchWords={[searchValue]}
              textToHighlight={author.nameInKor}
              highlightClassName="text-blue-500 bg-transparent font-bold"
            />
          </h4>
          <p className="text-xs text-muted-foreground/70">
            <Highlighter
              searchWords={[searchValue]}
              textToHighlight={author.name}
              highlightClassName="text-blue-500 bg-transparent font-bold"
            />
          </p>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground/70">
          <span className="flex items-center gap-0.5 text-xs">
            <ThumbsUpIcon className="!h-3 !w-3" />
            {author.likeCount}
          </span>
          <span className="flex items-center gap-0.5 text-xs">
            <MessageSquareIcon className="!h-3 !w-3" />
            {author.reviewCount}
          </span>
        </div>
      </div>
      {onDelete && <DeleteButton onClick={onDelete} />}
    </CommandItem>
  );
}
