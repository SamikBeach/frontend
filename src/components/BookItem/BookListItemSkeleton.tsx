import { Skeleton } from '../ui/skeleton';

export default function BookListItemSkeleton() {
  return (
    <div className="flex gap-4">
      <Skeleton className="h-[120px] w-[86px] rounded-lg" />
      <div className="flex flex-1 flex-col justify-between py-1">
        <div className="flex flex-col gap-1">
          <Skeleton className="h-[24px] w-[40%]" />
          <Skeleton className="h-[18px] w-[30%]" />
          <div className="space-y-1">
            <Skeleton className="h-[16px] w-[95%]" />
            <Skeleton className="h-[16px] w-[90%]" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-[16px] w-[24px]" />
          </div>
          <div className="flex items-center gap-1">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-[16px] w-[24px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
