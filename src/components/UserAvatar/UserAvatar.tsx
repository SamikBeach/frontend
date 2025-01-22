import { UserBase } from '@/apis/user/types';
import { cn } from '@/utils/common';
import { UserIcon } from 'lucide-react';
import Link from 'next/link';

interface Props {
  user: UserBase;
  size?: 'sm' | 'md' | 'lg';
  showNickname?: boolean;
  className?: string;
}

const getSizeClass = (size: 'sm' | 'md' | 'lg') => {
  switch (size) {
    case 'sm':
      return 'h-8 w-8 min-h-8 min-w-8';
    case 'md':
      return 'h-10 w-10 min-h-10 min-w-10';
    case 'lg':
      return 'h-12 w-12 min-h-12 min-w-12';
  }
};

export default function UserAvatar({
  user,
  size = 'md',
  showNickname = true,
  className,
}: Props) {
  const textSize = {
    sm: 'text-sm',
    md: 'text-sm',
    lg: 'text-base',
  }[size];

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <Link
      href={`/user/${user.id}`}
      className="flex items-center gap-2"
      onClick={handleClick}
    >
      {user.imageUrl ? (
        <div
          className={cn(
            'relative overflow-hidden',
            getSizeClass(size),
            className
          )}
        >
          <img
            src={user.imageUrl}
            alt={user.nickname ?? '사용자'}
            className="h-full w-full rounded-full object-cover"
          />
        </div>
      ) : (
        <div
          className={cn(
            'flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50',
            getSizeClass(size),
            className
          )}
        >
          <UserIcon className="h-1/2 w-1/2 text-gray-400" strokeWidth={1.5} />
        </div>
      )}
      {showNickname && (
        <p className={`font-medium ${textSize}`}>
          {user.nickname ?? '알 수 없음'}
        </p>
      )}
    </Link>
  );
}
