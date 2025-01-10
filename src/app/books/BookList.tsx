'use client';

import { bookApi } from '@/apis/book/book';
import { authorFilterAtom } from '@/atoms/book';
import { Empty } from '@/components/Empty';
import { useQuery } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { useSearchParams } from 'next/navigation';
import BookGridView from './BookGridView';

export default function BookList() {
  const searchParams = useSearchParams();
  const searchKeyword = searchParams.get('keyword') ?? '';
  const selectedAuthor = useAtomValue(authorFilterAtom);

  const { data: books, isLoading } = useQuery({
    queryKey: ['books', searchKeyword, selectedAuthor?.id],
    queryFn: () =>
      bookApi.searchBooks({
        search: searchKeyword,
        searchBy: searchKeyword ? ['title'] : undefined,
        filter: selectedAuthor
          ? {
              'authorBooks.author.id': selectedAuthor.id,
            }
          : undefined,
      }),
    select: response => response.data.data,
  });

  if (isLoading) {
    return null;
  }

  if (!books?.length && searchKeyword) {
    return (
      <Empty
        icon="search"
        title="검색 결과가 없습니다."
        description="다른 검색어로 다시 시도해보세요."
      />
    );
  }

  return <BookGridView books={books ?? []} />;
}
