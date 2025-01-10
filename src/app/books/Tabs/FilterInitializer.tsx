'use client';

import { authorApi } from '@/apis/author/author';
import {
  authorFilterAtom,
  bookSearchKeywordAtom,
  bookSortModeAtom,
  bookViewModeAtom,
} from '@/atoms/book';
import { useQueryParams } from '@/hooks/useQueryParams';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { useEffect } from 'react';

/**
 * URL query parameter를 기반으로 필터 상태를 초기화하는 컴포넌트
 *
 * 이 컴포넌트는 UI를 렌더링하지 않고, URL의 query parameter가 변경될 때마다
 * 해당하는 Jotai atom의 상태를 업데이트합니다.
 *
 * 처리하는 query parameter:
 * - q: 검색어
 * - sort: 정렬 방식 (popular, recent, alphabet)
 * - view: 보기 방식 (grid, list)
 * - authorId: 선택된 작가 ID
 *
 * @example
 * ```tsx
 * // 부모 컴포넌트에서 사용
 * return (
 *   <>
 *     <FilterInitializer />
 *     <YourComponent />
 *   </>
 * );
 * ```
 */
export function FilterInitializer() {
  const { searchParams } = useQueryParams();
  const [searchKeyword, setSearchKeyword] = useAtom(bookSearchKeywordAtom);
  const [sortMode, setSortMode] = useAtom(bookSortModeAtom);
  const [viewMode, setViewMode] = useAtom(bookViewModeAtom);
  const [selectedAuthor, setSelectedAuthor] = useAtom(authorFilterAtom);

  // 작가 목록을 가져오는 쿼리
  // authorId query parameter가 있을 때 해당하는 작가를 찾기 위해 사용
  const { data: authors } = useQuery({
    queryKey: ['authors'],
    queryFn: authorApi.getAllAuthors,
    select: response => response.data,
  });

  // URL query parameter가 변경될 때마다 상태 업데이트
  useEffect(() => {
    const q = searchParams.get('q');
    const sort = searchParams.get('sort');
    const view = searchParams.get('view');
    const authorId = searchParams.get('authorId');

    // 검색어 상태 업데이트
    if (q !== null && q !== searchKeyword) {
      setSearchKeyword(q);
    }

    // 정렬 방식 상태 업데이트
    if (sort !== null && sort !== sortMode) {
      setSortMode(sort as typeof sortMode);
    }

    // 보기 방식 상태 업데이트
    if (view !== null && view !== viewMode) {
      setViewMode(view as typeof viewMode);
    }

    // 선택된 작가 상태 업데이트
    // URL의 authorId와 현재 선택된 작가의 ID가 다른 경우에만 업데이트
    if (authorId !== (selectedAuthor?.id.toString() ?? null)) {
      const author = authors?.find(a => a.id.toString() === authorId);
      setSelectedAuthor(author);
    }
  }, [searchParams, authors]);

  return null;
}
