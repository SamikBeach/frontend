import { searchApi } from '@/apis/search/search';
import { Spinner } from '@/components/ui/spinner';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Suspense } from 'react';
import RecentSearchList from './RecentSearchList';
import SearchResultList from './SearchResultList';

interface Props {
  keyword: string;
  onOpenChange: (open: boolean) => void;
}

function LoadingSpinner() {
  return (
    <div className="flex h-[300px] items-center justify-center">
      <Spinner size="lg" className="text-primary/50" />
    </div>
  );
}

function SearchResults({ keyword, onOpenChange }: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ['search', keyword],
    queryFn: () => searchApi.search(keyword),
    gcTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
  });

  return (
    <SearchResultList
      books={data?.data.books}
      authors={data?.data.authors}
      onOpenChange={onOpenChange}
    />
  );
}

export default function SearchBarDialogContent({
  keyword,
  onOpenChange,
}: Props) {
  if (!keyword.trim()) {
    return <RecentSearchList />;
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SearchResults keyword={keyword.trim()} onOpenChange={onOpenChange} />
    </Suspense>
  );
}
