import { searchApi } from '@/apis/search/search';
import { userApi } from '@/apis/user/user';
import { isLoggedInAtom } from '@/atoms/auth';
import { Spinner } from '@/components/ui/spinner';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
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

function SearchGuide() {
  return (
    <div className="flex h-[300px] items-center justify-center text-sm text-muted-foreground">
      책이나 작가의 이름을 검색해보세요
    </div>
  );
}

function RecentSearches({
  onOpenChange,
}: {
  onOpenChange: (open: boolean) => void;
}) {
  const isLoggedIn = useAtomValue(isLoggedInAtom);

  if (!isLoggedIn) {
    return <SearchGuide />;
  }

  const { data } = useSuspenseQuery({
    queryKey: ['recentSearches'],
    queryFn: userApi.getRecentSearches,
    select: data => data.data,
    staleTime: 0,
  });

  const handleItemClick = async (bookId?: number, authorId?: number) => {
    try {
      await userApi.saveSearch({ bookId, authorId });
    } catch (error) {
      console.error('Failed to save search history:', error);
    }
  };

  if (!data?.length) {
    return (
      <div className="flex h-[300px] items-center justify-center text-sm text-muted-foreground">
        최근 검색 기록이 없습니다
      </div>
    );
  }

  return (
    <RecentSearchList
      searches={data}
      onOpenChange={onOpenChange}
      onItemClick={handleItemClick}
    />
  );
}

function SearchResults({ keyword, onOpenChange }: Props) {
  const { data } = useSuspenseQuery({
    queryKey: ['search', keyword],
    queryFn: async () => {
      const response = await searchApi.search(keyword);
      return response.data;
    },
  });

  const handleItemClick = async (bookId?: number, authorId?: number) => {
    try {
      await userApi.saveSearch({ bookId, authorId });
    } catch (error) {
      console.error('Failed to save search history:', error);
    }
  };

  return (
    <SearchResultList
      books={data.books}
      authors={data.authors}
      onOpenChange={onOpenChange}
      onItemClick={handleItemClick}
    />
  );
}

export default function SearchBarDialogContent({
  keyword,
  onOpenChange,
}: Props) {
  if (!keyword.trim()) {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <RecentSearches onOpenChange={onOpenChange} />
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SearchResults keyword={keyword.trim()} onOpenChange={onOpenChange} />
    </Suspense>
  );
}
