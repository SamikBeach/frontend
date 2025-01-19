import { Skeleton } from '@/components/ui/skeleton';

export default function FeedSkeleton() {
  return (
    <div className="relative mb-4 flex max-w-[700px] gap-4 rounded-lg bg-white p-5">
      <div className="flex flex-1 flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-10 w-10 rounded-full" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>

        <div className="flex gap-5">
          <div className="flex-shrink-0">
            <Skeleton className="h-[180px] w-[120px] rounded-md" />
            <div className="mt-2 max-w-[120px] space-y-1">
              <Skeleton className="h-[18px] w-full" />
              <Skeleton className="h-[14px] w-full" />
            </div>
          </div>

          <div className="flex flex-1 flex-col justify-between">
            <div>
              <Skeleton className="mb-2 h-[28px] w-3/4" />
              <div className="space-y-2">
                <Skeleton className="h-[18px] w-full" />
                <Skeleton className="h-[18px] w-full" />
                <Skeleton className="h-[18px] w-full" />
                <Skeleton className="h-[18px] w-3/4" />
              </div>
            </div>

            <div className="mt-[90px] flex justify-end gap-3">
              <Skeleton className="h-9 w-[70px] rounded-full" />
              <Skeleton className="h-9 w-[70px] rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
