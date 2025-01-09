import { Skeleton } from '../../ui/skeleton';

export default function FeedSkeleton() {
  return (
    <div className="relative mb-11 flex max-w-[800px] rounded-lg p-4">
      <div className="flex flex-1 flex-col gap-3">
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-24" />
        </div>

        <div className="flex gap-6">
          <div className="flex-shrink-0">
            <Skeleton className="h-[300px] w-[200px] rounded-lg" />
            <div className="mt-2">
              <Skeleton className="h-5 w-[200px]" />
              <Skeleton className="mt-1 h-4 w-[200px]" />
            </div>
          </div>

          <div className="flex h-full flex-1 flex-col justify-between">
            <div>
              <Skeleton className="mb-2 h-6 w-[300px]" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="mt-2 h-4 w-[90%]" />
              <Skeleton className="mt-2 h-4 w-[95%]" />
              <Skeleton className="mt-2 h-4 w-[85%]" />
              <Skeleton className="mt-2 h-4 w-[92%]" />
            </div>

            <div className="flex justify-end gap-2">
              <Skeleton className="h-9 w-[72px] rounded-full" />
              <Skeleton className="h-9 w-[72px] rounded-full" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute right-4 top-4">
        <Skeleton className="h-8 w-8 rounded-md" />
      </div>
    </div>
  );
}
