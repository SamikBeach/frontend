import { cn } from '@/lib/utils';
import { BookIcon } from 'lucide-react';

interface Props {
  imageUrl?: string | null;
  title: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

export default function BookImage({
  imageUrl,
  title,
  width = 120,
  height = 180,
  className,
  priority = false,
}: Props) {
  if (imageUrl) {
    return (
      <img
        src={imageUrl}
        alt={title}
        width={width}
        height={height}
        className={cn('object-cover', className)}
        loading={priority ? 'eager' : 'lazy'}
      />
    );
  }

  return (
    <div
      className={cn(
        'flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 p-4',
        className
      )}
      style={{ width, height }}
    >
      <div className="flex flex-col items-center gap-3">
        <div className="rounded-lg bg-white/50 p-3 shadow-sm">
          <BookIcon className="h-8 w-8 text-gray-400" strokeWidth={1.5} />
        </div>
      </div>
    </div>
  );
}
