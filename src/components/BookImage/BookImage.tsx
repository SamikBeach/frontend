import { cn } from '@/utils/common';
import { BookIcon } from 'lucide-react';

interface Props {
  imageUrl?: string | null;
  title: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  hover?: boolean;
  onClick?: () => void;
}

const getSizeClass = (width: number, height: number) => {
  switch (width) {
    case 24:
      return 'h-9 w-6 min-h-9 min-w-6';
    case 32:
      return 'h-12 w-8 min-h-12 min-w-8';
    case 40:
      return 'h-15 w-10 min-h-15 min-w-10';
    case 48:
      return 'h-18 w-12 min-h-18 min-w-12';
    case 64:
      return 'h-24 w-16 min-h-24 min-w-16';
    case 80:
      return 'h-30 w-20 min-h-30 min-w-20';
    case 96:
      return 'h-36 w-24 min-h-36 min-w-24';
    case 120:
      return 'h-[180px] w-[120px] min-h-[180px] min-w-[120px]';
    default:
      return `h-[${height}px] w-[${width}px] min-h-[${height}px] min-w-[${width}px]`;
  }
};

export default function BookImage({
  imageUrl,
  title,
  width = 120,
  height = 180,
  className,
  priority = false,
  hover = true,
  onClick,
}: Props) {
  const containerClasses = cn(
    'relative overflow-hidden rounded-lg',
    hover && 'group',
    getSizeClass(width, height),
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
          alt={title}
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
        getSizeClass(width, height),
        className
      )}
      onClick={onClick}
    >
      <BookIcon className="h-1/2 w-1/2 text-gray-400" strokeWidth={1.5} />
    </div>
  );
}
