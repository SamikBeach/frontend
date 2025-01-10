import { MessageSquareIcon } from 'lucide-react';
import { Button } from '../ui/button';

interface Props {
  commentCount: number;
  onClick?: () => void;
}

export function CommentButton({ commentCount, onClick }: Props) {
  return (
    <Button
      className={`min-w-[72px] rounded-full`}
      variant="outline"
      onClick={onClick}
    >
      <MessageSquareIcon className="h-4 w-4" />
      <span>{commentCount}</span>
    </Button>
  );
}
