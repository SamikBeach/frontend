import { useCurrentUser } from '@/hooks/useCurrentUser';
import { cn } from '@/lib/utils';
import { ThumbsUpIcon } from 'lucide-react';
import { Button } from '../ui/button';

interface Props {
  isLiked: boolean;
  likeCount: number;
  onClick: (e: React.MouseEvent) => void;
  size?: 'sm' | 'md';
}

export function LikeButton({
  isLiked,
  likeCount,
  onClick,
  size = 'md',
}: Props) {
  const currentUser = useCurrentUser();

  return (
    <Button
      className={cn(
        'flex items-center gap-0.5 rounded-full',
        size === 'md' ? 'h-9 min-w-[72px]' : 'h-7 min-w-[54px] px-2.5',
        isLiked &&
          'border-gray-900 bg-gray-900 text-white hover:border-gray-700 hover:bg-gray-700'
      )}
      variant="outline"
      onClick={onClick}
      disabled={!currentUser}
    >
      <ThumbsUpIcon
        className={cn(
          'mr-1',
          size === 'md' ? 'h-4 w-4' : '!h-3.5 !w-3.5',
          isLiked && 'text-white'
        )}
      />
      <span
        className={cn(
          size === 'md' ? 'text-sm' : 'text-xs',
          isLiked && 'text-white'
        )}
      >
        {likeCount}
      </span>
    </Button>
  );
}
