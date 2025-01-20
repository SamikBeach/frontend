import { cn } from '@/utils/common';
import { Skeleton } from '../ui/skeleton';

interface Props {
  size?: 'small' | 'medium' | 'xsmall';
}

export default function BookGridItemSkeleton({ size = 'medium' }: Props) {
  return (
    <div
      className={cn('flex flex-col gap-3', {
        'w-[280px]': size === 'medium',
        'w-[160px]': size === 'small',
        'w-[110px]': size === 'xsmall',
      })}
    >
      <Skeleton
        className={cn('rounded-lg', {
          'h-[400px] w-[280px]': size === 'medium',
          'h-[230px] w-[160px]': size === 'small',
          'h-[160px] w-[110px]': size === 'xsmall',
        })}
      />
      <div className="flex flex-col gap-1.5">
        <div className="flex flex-col gap-0.5">
          <div className="space-y-1.5">
            <Skeleton
              className={cn('', {
                'h-[24px] w-[90%]': size === 'medium',
                'h-[18px] w-[85%]': size === 'small',
                'h-[14px] w-[80%]': size === 'xsmall',
              })}
            />
            <Skeleton
              className={cn('', {
                'h-[24px] w-[70%]': size === 'medium',
                'h-[18px] w-[65%]': size === 'small',
                'h-[14px] w-[60%]': size === 'xsmall',
              })}
            />
          </div>
          <Skeleton
            className={cn('', {
              'mt-0.5 h-[20px] w-[60%]': size === 'medium',
              'mt-0.5 h-[14px] w-[55%]': size === 'small',
              'mt-0.5 h-[12px] w-[50%]': size === 'xsmall',
            })}
          />
          <Skeleton
            className={cn('', {
              'mt-0.5 h-[20px] w-[50%]': size === 'medium',
              'mt-0.5 h-[14px] w-[45%]': size === 'small',
              'mt-0.5 h-[12px] w-[40%]': size === 'xsmall',
            })}
          />
          <div className="mt-1 flex items-center gap-1.5">
            <div className="flex items-center gap-0.5">
              <Skeleton
                className={cn('', {
                  'h-3.5 w-3.5': size === 'medium',
                  'h-3 w-3': size === 'small',
                  'h-2.5 w-2.5': size === 'xsmall',
                })}
              />
              <Skeleton
                className={cn('', {
                  'h-[16px] w-[24px]': size === 'medium',
                  'h-[14px] w-[20px]': size === 'small',
                  'h-[12px] w-[16px]': size === 'xsmall',
                })}
              />
            </div>
            <div className="flex items-center gap-0.5">
              <Skeleton
                className={cn('', {
                  'h-3.5 w-3.5': size === 'medium',
                  'h-3 w-3': size === 'small',
                  'h-2.5 w-2.5': size === 'xsmall',
                })}
              />
              <Skeleton
                className={cn('', {
                  'h-[16px] w-[24px]': size === 'medium',
                  'h-[14px] w-[20px]': size === 'small',
                  'h-[12px] w-[16px]': size === 'xsmall',
                })}
              />
            </div>
            <div className="flex items-center gap-0.5">
              <Skeleton
                className={cn('', {
                  'h-3.5 w-3.5': size === 'medium',
                  'h-3 w-3': size === 'small',
                  'h-2.5 w-2.5': size === 'xsmall',
                })}
              />
              <Skeleton
                className={cn('', {
                  'h-[16px] w-[24px]': size === 'medium',
                  'h-[14px] w-[20px]': size === 'small',
                  'h-[12px] w-[16px]': size === 'xsmall',
                })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
