import { Skeleton } from '@/components/ui/skeleton';

export default function ReviewInfoSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-start justify-between gap-8">
        <div className="flex flex-col gap-2">
          <Skeleton className="h-9 w-96" />
          <div className="flex items-center gap-1">
            <div className="flex items-center gap-2">
              <Skeleton className="h-7 w-7 rounded-full" />
              <Skeleton className="h-5 w-20" />
            </div>
            <Skeleton className="h-5 w-2" />
            <Skeleton className="h-5 w-36" />
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 rounded-lg bg-gray-50 p-2.5">
          <Skeleton className="h-14 w-10 rounded-sm" />
          <div className="flex flex-col gap-0.5">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      </div>

      <div className="mb-8 flex flex-col gap-1">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-2/3" />
      </div>

      <div className="flex justify-center gap-2">
        <Skeleton className="h-9 w-20" />
        <Skeleton className="h-9 w-20" />
      </div>
    </div>
  );
}
