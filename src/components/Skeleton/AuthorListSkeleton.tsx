import AuthorGridItemSkeleton from '@/components/AuthorItem/AuthorGridItemSkeleton';
import AuthorListItemSkeleton from '@/components/AuthorItem/AuthorListItemSkeleton';

interface Props {
  viewMode: 'list' | 'grid';
  isLoading?: boolean;
}

export function AuthorListSkeleton({ viewMode, isLoading = true }: Props) {
  if (!isLoading) return null;

  if (viewMode === 'list') {
    return (
      <div className="flex flex-col gap-4 py-2">
        {[...Array(4)].map((_, i) => (
          <AuthorListItemSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-7 py-6">
      <div className="flex gap-6">
        {[...Array(4)].map((_, i) => (
          <AuthorGridItemSkeleton key={i} />
        ))}
      </div>
      <div className="flex flex-wrap gap-6">
        {[...Array(8)].map((_, i) => (
          <AuthorGridItemSkeleton key={i} size="small" />
        ))}
      </div>
    </div>
  );
}

export function AuthorInfiniteLoaderSkeleton({ viewMode }: Props) {
  return (
    <>
      <div className="md:hidden">
        <div className="flex flex-col gap-4 py-2">
          {[...Array(3)].map((_, i) => (
            <AuthorListItemSkeleton key={i} />
          ))}
        </div>
      </div>
      <div className="hidden md:block">
        {viewMode === 'list' ? (
          <div className="flex flex-col gap-4 py-2">
            {[...Array(3)].map((_, i) => (
              <AuthorListItemSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-7 py-6">
            <div className="flex flex-wrap gap-6">
              {[...Array(6)].map((_, i) => (
                <AuthorGridItemSkeleton key={i} size="small" />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
