import { cn } from '@/utils/common';
import { UserIcon } from 'lucide-react';

interface Props {
  imageUrl?: string | null;
  name: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  hover?: boolean;
  onClick?: () => void;
}

const getSizeClass = (size: number) => {
  switch (size) {
    case 24:
      return 'h-6 w-6 min-h-6 min-w-6';
    case 32:
      return 'h-8 w-8 min-h-8 min-w-8';
    case 40:
      return 'h-10 w-10 min-h-10 min-w-10';
    case 48:
      return 'h-12 w-12 min-h-12 min-w-12';
    case 64:
      return 'h-16 w-16 min-h-16 min-w-16';
    case 80:
      return 'h-20 w-20 min-h-20 min-w-20';
    case 96:
      return 'h-24 w-24 min-h-24 min-w-24';
    case 120:
      return 'h-[120px] w-[120px] min-h-[120px] min-w-[120px]';
    default:
      return `h-[${size}px] w-[${size}px] min-h-[${size}px] min-w-[${size}px]`;
  }
};

export default function AuthorImage({
  imageUrl,
  name,
  width = 120,
  height = 120,
  className,
  priority = false,
  hover = true,
  onClick,
}: Props) {
  const containerClasses = cn(
    'relative overflow-hidden',
    hover && 'group',
    getSizeClass(width),
    className
  );

  const imageClasses = cn(
    'h-full w-full object-cover rounded-inherit',
    hover && 'transition-transform duration-300 group-hover:scale-105'
  );

  if (imageUrl) {
    return (
      <div className={containerClasses} onClick={onClick}>
        <img
          src={imageUrl}
          alt={name}
          width={width}
          height={height}
          className={imageClasses}
          loading={priority ? 'eager' : 'lazy'}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50',
        getSizeClass(width),
        className
      )}
      onClick={onClick}
    >
      <UserIcon className="h-1/2 w-1/2 text-gray-400" strokeWidth={1.5} />
    </div>
  );
}
