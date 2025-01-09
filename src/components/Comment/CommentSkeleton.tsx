import { Skeleton } from '../ui/skeleton';

export function CommentItemSkeleton() {
  return (
    <div className="flex items-start gap-3 py-3">
      <Skeleton className="h-8 w-8 rounded-full" />
      <div className="flex w-full flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
        <Skeleton className="h-[72px] w-full rounded-lg" />
        <div className="flex items-center gap-2 px-1">
          <Skeleton className="h-3 w-8" />
          <Skeleton className="h-3 w-8" />
        </div>
      </div>
    </div>
  );
}

export default function CommentListSkeleton() {
  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex items-center gap-2">
        <Skeleton className="h-6 w-12" />
        <Skeleton className="h-5 w-8 rounded-full" />
      </div>
      <div className="flex flex-col">
        <CommentItemSkeleton />
        <CommentItemSkeleton />
        <CommentItemSkeleton />
      </div>
    </div>
  );
}
