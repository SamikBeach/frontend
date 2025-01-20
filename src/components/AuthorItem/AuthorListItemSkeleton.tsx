import { Skeleton } from '@/components/ui/skeleton';

export default function AuthorListItemSkeleton() {
  return (
    <div className="flex gap-6 p-2">
      <Skeleton className="h-[120px] w-[120px] rounded-full" />
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex flex-col gap-1">
          <Skeleton className="h-5 w-1/3" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="mt-1 h-8 w-full" />
        </div>
        <div className="flex items-center gap-3">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-4 w-12" />
        </div>
      </div>
    </div>
  );
}
