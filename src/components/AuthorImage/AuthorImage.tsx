import { cn } from '@/lib/utils';
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
    className
  );

  const imageClasses = cn(
    'object-cover',
    hover && 'transition-transform duration-300 group-hover:scale-105'
  );

  if (imageUrl) {
    return (
      <div
        className={containerClasses}
        style={{ width, height }}
        onClick={onClick}
      >
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
        'flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 p-4',
        className
      )}
      style={{ width, height }}
      onClick={onClick}
    >
      <div className="flex flex-col items-center gap-3">
        <UserIcon className="h-8 w-8 text-gray-400" strokeWidth={1.5} />
      </div>
    </div>
  );
}
