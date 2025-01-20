import { cn } from '@/utils/common';
import { MessageSquareIcon } from 'lucide-react';
import { Button } from '../ui/button';

interface Props {
  commentCount: number;
  onClick?: () => void;
  size?: 'sm' | 'md';
}

export function CommentButton({ commentCount, onClick, size = 'md' }: Props) {
  return (
    <Button
      className={cn(
        'flex items-center gap-0.5 rounded-full',
        size === 'md' ? 'h-9 min-w-[72px]' : 'h-7 min-w-[54px] px-2.5 text-xs'
      )}
      variant="outline"
      onClick={onClick}
    >
      <MessageSquareIcon
        className={cn(
          'mr-1 mt-0.5',
          size === 'md' ? 'h-4 w-4' : '!h-3.5 !w-3.5'
        )}
      />
      <span className={cn('text-sm', size === 'sm' && 'text-xs')}>
        {commentCount}
      </span>
    </Button>
  );
}
