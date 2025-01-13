import { searchApi } from '@/apis/search/search';
import { useSuspenseQuery } from '@tanstack/react-query';
import { Suspense } from 'react';
import RecentSearchList from './RecentSearchList';
import SearchResultList from './SearchResultList';

interface Props {
  keyword: string;
}

function SearchResults({ keyword }: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ['search', keyword],
    queryFn: () => searchApi.search(keyword),
  });

  return (
    <SearchResultList books={data?.data.books} authors={data?.data.authors} />
  );
}

export default function SearchBarDialogContent({ keyword }: Props) {
  if (keyword === '') {
    return <RecentSearchList />;
  }

  return (
    <Suspense
      fallback={
        <div className="flex h-[300px] items-center justify-center text-sm text-gray-500">
          검색 중...
        </div>
      }
    >
      <SearchResults keyword={keyword.trim()} />
    </Suspense>
  );
}
