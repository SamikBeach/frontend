import { Skeleton } from '../ui/skeleton';

export default function BookListItemSkeleton() {
  return (
    <div className="flex gap-6 p-3">
      <Skeleton className="h-[160px] w-[114px] rounded-lg" />
      <div className="flex flex-1 flex-col justify-between py-1">
        <div className="flex flex-col gap-1">
          <Skeleton className="h-[20px] w-[40%]" />
          <Skeleton className="h-[16px] w-[30%]" />
          <Skeleton className="h-[16px] w-[25%]" />
          <div className="mt-1 space-y-1">
            <Skeleton className="h-[14px] w-[95%]" />
            <Skeleton className="h-[14px] w-[90%]" />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Skeleton className="h-3.5 w-3.5" />
            <Skeleton className="h-[14px] w-[24px]" />
          </div>
          <div className="flex items-center gap-1">
            <Skeleton className="h-3.5 w-3.5" />
            <Skeleton className="h-[14px] w-[24px]" />
          </div>
        </div>
      </div>
    </div>
  );
}
