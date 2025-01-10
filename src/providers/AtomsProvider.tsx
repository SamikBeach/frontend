import {
  BookCategory,
  BookSortMode,
  BookViewMode,
  authorIdAtom,
  bookCategoryAtom,
  bookSearchKeywordAtom,
  bookSortModeAtom,
  bookViewModeAtom,
} from '@/atoms/book';
import { Provider, createStore } from 'jotai';
import { useSearchParams } from 'next/navigation';
import { ReactNode } from 'react';

function isValidViewMode(value: string | null): value is BookViewMode {
  return value === 'grid' || value === 'list';
}

function isValidSortMode(value: string | null): value is BookSortMode {
  return value === 'popular' || value === 'recent' || value === 'alphabet';
}

function isValidCategory(value: string | null): value is BookCategory {
  return (
    value === 'all' ||
    value === 'philosophy' ||
    value === 'science' ||
    value === 'economy'
  );
}

/**
 * URL query parameter를 기반으로 atom들을 초기화하는 Provider 컴포넌트
 *
 * 이 컴포넌트는 최상위 페이지 컴포넌트에서 한 번만 사용되어야 합니다.
 * 하위 컴포넌트들은 이미 초기화된 atom 값들을 사용하게 됩니다.
 *
 * 초기화되는 atom들:
 * - bookViewModeAtom: 'view' parameter (기본값: 'grid')
 * - bookSearchKeywordAtom: 'q' parameter (기본값: '')
 * - bookSortModeAtom: 'sort' parameter (기본값: 'popular')
 * - authorIdAtom: 'authorId' parameter (기본값: undefined)
 * - bookCategoryAtom: 'category' parameter (기본값: 'all')
 */
export function AtomsProvider({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams();
  const store = createStore();

  const view = searchParams.get('view');
  const sort = searchParams.get('sort');
  const category = searchParams.get('category');

  store.set(bookViewModeAtom, isValidViewMode(view) ? view : 'grid');
  store.set(bookSearchKeywordAtom, searchParams.get('q') ?? '');
  store.set(bookSortModeAtom, isValidSortMode(sort) ? sort : 'popular');
  store.set(authorIdAtom, searchParams.get('authorId') ?? undefined);
  store.set(bookCategoryAtom, isValidCategory(category) ? category : 'all');

  return <Provider store={store}>{children}</Provider>;
}
