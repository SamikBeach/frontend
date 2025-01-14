import { searchApi } from '@/apis/search/search';
import { userApi } from '@/apis/user/user';
import { isLoggedInAtom } from '@/atoms/auth';
import { CommandEmpty, CommandList } from '@/components/ui/command';
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
    <CommandEmpty className="flex h-[300px] items-center justify-center text-sm text-muted-foreground">
      책이나 작가의 이름을 검색해보세요
    </CommandEmpty>
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
      <CommandEmpty className="flex h-[300px] items-center justify-center text-sm text-muted-foreground">
        최근 검색 기록이 없습니다
      </CommandEmpty>
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
      return await searchApi.search(keyword);
    },
    select: data => data.data,
  });

  const handleItemClick = async (bookId?: number, authorId?: number) => {
    try {
      await userApi.saveSearch({ bookId, authorId });
    } catch (error) {
      console.error('Failed to save search history:', error);
    }
  };

  const books = data?.books ?? [];
  const authors = data?.authors ?? [];

  if (books.length === 0 && authors.length === 0) {
    return (
      <CommandEmpty className="flex h-[300px] items-center justify-center text-sm text-muted-foreground">
        검색 결과가 없습니다
      </CommandEmpty>
    );
  }

  return (
    <SearchResultList
      books={books}
      authors={authors}
      onOpenChange={onOpenChange}
      onItemClick={handleItemClick}
    />
  );
}

export default function SearchBarDialogContent({
  keyword,
  onOpenChange,
}: Props) {
  const trimmedKeyword = keyword.trim();
  const isEmpty = !trimmedKeyword;

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <>
        {isEmpty ? (
          <CommandList className="max-h-[1300px]">
            <RecentSearches onOpenChange={onOpenChange} />
          </CommandList>
        ) : (
          <CommandList className={`max-h-[1300px] min-h-[300px]`}>
            <SearchResults
              keyword={trimmedKeyword}
              onOpenChange={onOpenChange}
            />
          </CommandList>
        )}
      </>
    </Suspense>
  );
}
