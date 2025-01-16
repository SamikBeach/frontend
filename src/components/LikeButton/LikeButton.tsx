import { useCurrentUser } from '@/hooks/useCurrentUser';
import { ThumbsUpIcon } from 'lucide-react';
import { Button } from '../ui/button';

interface Props {
  isLiked: boolean;
  likeCount: number;
  onClick: (e: React.MouseEvent) => void;
}

export function LikeButton({ isLiked, likeCount, onClick }: Props) {
  const currentUser = useCurrentUser();

  return (
    <Button
      className={`min-w-[72px] rounded-full ${
        isLiked
          ? 'border-gray-900 bg-gray-900 text-white hover:border-gray-700 hover:bg-gray-700'
          : ''
      }`}
      variant="outline"
      onClick={onClick}
      disabled={!currentUser}
    >
      <ThumbsUpIcon className={`h-4 w-4 ${isLiked ? 'text-white' : ''}`} />
      <span className={isLiked ? 'text-white' : ''}>{likeCount}</span>
    </Button>
  );
}
