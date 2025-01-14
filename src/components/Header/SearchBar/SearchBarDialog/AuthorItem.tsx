import { Author } from '@/apis/author/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CommandItem } from '@/components/ui/command';
import { MessageSquareIcon, ThumbsUpIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import DeleteButton from './DeleteButton';

interface Props {
  author: Author;
  onOpenChange: (open: boolean) => void;
  onClick: () => void;
  onDelete?: (e: React.MouseEvent) => void;
}

export default function AuthorItem({
  author,
  onOpenChange,
  onClick,
  onDelete,
}: Props) {
  const router = useRouter();

  const handleClick = () => {
    onClick();
    onOpenChange(false);

    router.push(`/author/${author.id}`);
  };

  return (
    <div className="group relative">
      <CommandItem
        value={author.nameInKor}
        onSelect={handleClick}
        className="cursor-pointer"
      >
        <Avatar className="h-11 w-11 shrink-0">
          <AvatarImage
            src={author.imageUrl ?? undefined}
            alt={author.nameInKor}
            className="object-cover"
          />
          <AvatarFallback>{author.nameInKor[0]}</AvatarFallback>
        </Avatar>
        <div className="flex flex-1 flex-col gap-1">
          <div>
            <h4 className="text-[15px] font-medium">{author.nameInKor}</h4>
            <p className="text-[13px] text-muted-foreground">{author.name}</p>
          </div>
          <div className="flex items-center gap-2.5 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <ThumbsUpIcon className="h-3.5 w-3.5" />
              {author.likeCount}
            </span>
            <span className="flex items-center gap-1">
              <MessageSquareIcon className="h-3.5 w-3.5" />
              {author.reviewCount}
            </span>
          </div>
        </div>
      </CommandItem>
      {onDelete && <DeleteButton onClick={onDelete} />}
    </div>
  );
}
