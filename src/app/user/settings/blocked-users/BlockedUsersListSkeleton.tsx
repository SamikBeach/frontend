import { Skeleton } from '@/components/ui/skeleton';

export default function BlockedUsersListSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton className="h-9 w-36" />
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-lg border p-4"
          >
            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-4 w-24" />
            </div>
            <Skeleton className="h-8 w-20" />
          </div>
        ))}
      </div>
    </div>
  );
}
