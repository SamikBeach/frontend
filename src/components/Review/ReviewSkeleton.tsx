'use client';

import { Skeleton } from '@/components/ui/skeleton';

export function ReviewSkeleton() {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-32" />
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-3 w-20" />
      </div>

      <div className="flex flex-col gap-1">
        <div className="w-full">
          <Skeleton className="h-20 w-full" />
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex items-center gap-0.5 text-gray-500">
          <div className="flex items-center gap-0.5">
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-3 w-4" />
          </div>
          <div className="flex items-center gap-0.5">
            <Skeleton className="h-5 w-5" />
            <Skeleton className="h-3 w-4" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ReviewListSkeleton() {
  return (
    <div className="flex flex-col gap-8">
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
