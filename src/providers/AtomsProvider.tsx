'use client';

import {
  authorGenreAtom,
  authorSearchKeywordAtom,
  authorSortModeAtom,
  authorViewModeAtom,
} from '@/atoms/author';
import {
  authorIdAtom,
  bookGenreAtom,
  bookSearchKeywordAtom,
  bookSortModeAtom,
  bookViewModeAtom,
} from '@/atoms/book';

import { useQueryParams } from '@/hooks/useQueryParams';
import { useSetAtom } from 'jotai';
import { useHydrateAtoms } from 'jotai/utils';
import { ReactNode, useEffect } from 'react';

interface Props {
  children: ReactNode;
}

/**
 * URL 검색 파라미터를 기반으로 전역 상태(atom)를 관리하는 Provider 컴포넌트
 * 책과 작가 관련 필터링, 정렬, 뷰 모드 등의 상태를 URL과 동기화
 */
export function AtomsProvider({ children }: Props) {
  // URL의 검색 파라미터 가져오기
  const { searchParams } = useQueryParams();

  // 책 관련 atom setter 함수들
  const setBookSearchKeyword = useSetAtom(bookSearchKeywordAtom);
  const setBookSortMode = useSetAtom(bookSortModeAtom);
  const setBookViewMode = useSetAtom(bookViewModeAtom);
  const setAuthorId = useSetAtom(authorIdAtom);
  const setBookGenre = useSetAtom(bookGenreAtom);

  // 작가 관련 atom setter 함수들
  const setAuthorSearchKeyword = useSetAtom(authorSearchKeywordAtom);
  const setAuthorSortMode = useSetAtom(authorSortModeAtom);
  const setAuthorViewMode = useSetAtom(authorViewModeAtom);
  const setAuthorGenre = useSetAtom(authorGenreAtom);

  // URL 파라미터가 변경될 때마다 관련 atom 값들을 업데이트
  useEffect(() => {
    // 책 관련 상태 업데이트
    setBookSearchKeyword(searchParams.get('q') ?? '');
    setBookSortMode(
      (searchParams.get('sort') as 'popular' | 'recent' | 'alphabet') ??
        'popular'
    );
    setBookViewMode((searchParams.get('view') as 'grid' | 'list') ?? 'grid');
    setAuthorId(searchParams.get('authorId') ?? undefined);
    setBookGenre(
      (searchParams.get('genre') as
        | 'all'
        | 'philosophy'
        | 'science'
        | 'economics') ?? 'all'
    );

    // 작가 관련 상태 업데이트
    setAuthorSearchKeyword(searchParams.get('q') ?? '');
    setAuthorSortMode(
      (searchParams.get('sort') as 'popular' | 'recent' | 'alphabet') ??
        'popular'
    );
    setAuthorViewMode((searchParams.get('view') as 'grid' | 'list') ?? 'grid');
    setAuthorGenre(
      (searchParams.get('genre') as
        | 'all'
        | 'philosophy'
        | 'science'
        | 'economics') ?? 'all'
    );
  }, [
    searchParams,
    setBookSearchKeyword,
    setBookSortMode,
    setBookViewMode,
    setAuthorId,
    setBookGenre,
    setAuthorSearchKeyword,
    setAuthorSortMode,
    setAuthorViewMode,
    setAuthorGenre,
  ]);

  // 앱이 처음 로드될 때 atom들의 초기값을 URL 파라미터 기반으로 설정
  useHydrateAtoms([
    // 책 관련 atom 초기화
    [bookSearchKeywordAtom, searchParams.get('q') ?? ''],
    [
      bookSortModeAtom,
      (searchParams.get('sort') as 'popular' | 'recent' | 'alphabet') ??
        'popular',
    ],
    [bookViewModeAtom, (searchParams.get('view') as 'grid' | 'list') ?? 'grid'],
    [authorIdAtom, searchParams.get('authorId') ?? undefined],
    [
      bookGenreAtom,
      (searchParams.get('genre') as
        | 'all'
        | 'philosophy'
        | 'science'
        | 'economics') ?? 'all',
    ],

    // 작가 관련 atom 초기화
    [authorSearchKeywordAtom, searchParams.get('q') ?? ''],
    [
      authorSortModeAtom,
      (searchParams.get('sort') as 'popular' | 'recent' | 'alphabet') ??
        'popular',
    ],
    [
      authorViewModeAtom,
      (searchParams.get('view') as 'grid' | 'list') ?? 'grid',
    ],
    [
      authorGenreAtom,
      (searchParams.get('genre') as
        | 'all'
        | 'philosophy'
        | 'science'
        | 'economics') ?? 'all',
    ],
  ]);

  return children;
}
