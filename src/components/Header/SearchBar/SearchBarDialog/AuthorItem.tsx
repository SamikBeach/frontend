import { Author } from '@/apis/author/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MessageSquareIcon, ThumbsUpIcon } from 'lucide-react';
import Link from 'next/link';

interface Props {
  author: Author;
  onOpenChange: (open: boolean) => void;
  onClick: () => void;
}

export default function AuthorItem({ author, onOpenChange, onClick }: Props) {
  const handleClick = () => {
    onClick();
    onOpenChange(false);
  };

  return (
    <Link
      href={`/author/${author.id}`}
      className="flex items-center gap-3 rounded-md p-2 hover:bg-accent"
      onClick={handleClick}
    >
      <Avatar className="h-11 w-11">
        <AvatarImage
          src={author.imageUrl ?? undefined}
          alt={author.nameInKor}
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
    </Link>
  );
}
