'use client';

import { Skeleton } from '@/components/ui/skeleton';

export function ReviewSkeleton() {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <Skeleton className="h-10 w-10 rounded-full" />
        <div className="flex w-full flex-col gap-1">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <div className="w-full">
          <Skeleton className="h-20 w-full" />
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-12" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-8" />
          <Skeleton className="h-4 w-8" />
        </div>
      </div>
    </div>
  );
}

export function ReviewListSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-2">
        <Skeleton className="h-6 w-12" />
        <Skeleton className="h-6 w-8 rounded-full" />
      </div>
      <div className="flex flex-col gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <ReviewSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
