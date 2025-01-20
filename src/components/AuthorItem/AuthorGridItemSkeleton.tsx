import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

interface Props {
  size?: 'medium' | 'small';
}

export default function AuthorGridItemSkeleton({ size = 'medium' }: Props) {
  return (
    <div
      className={cn('flex flex-col gap-3', {
        'w-[280px]': size === 'medium',
        'w-[160px]': size === 'small',
      })}
    >
      <Skeleton
        className={cn('aspect-square rounded-full', {
          'h-[280px] w-[280px]': size === 'medium',
          'h-[160px] w-[160px]': size === 'small',
        })}
      />
      <div className="flex flex-col gap-1.5">
        <div className="flex flex-col gap-0.5">
          <Skeleton
            className={cn('h-5 w-full', {
              'h-6': size === 'medium',
            })}
          />
          <Skeleton
            className={cn('h-4 w-3/4', {
              'h-5': size === 'medium',
            })}
          />
          <div className="mt-1 flex items-center gap-1.5">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-12" />
          </div>
        </div>
      </div>
    </div>
  );
}
