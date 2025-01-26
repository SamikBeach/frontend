'use client';

import {
  authorGenreAtom,
  authorSearchKeywordAtom,
  authorSortModeAtom,
  eraIdAtom,
} from '@/atoms/author';
import {
  authorIdAtom,
  bookGenreAtom,
  bookSearchKeywordAtom,
  bookSortModeAtom,
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
  const setAuthorId = useSetAtom(authorIdAtom);
  const setBookGenre = useSetAtom(bookGenreAtom);

  // 작가 관련 atom setter 함수들
  const setAuthorSearchKeyword = useSetAtom(authorSearchKeywordAtom);
  const setAuthorSortMode = useSetAtom(authorSortModeAtom);
  const setAuthorGenre = useSetAtom(authorGenreAtom);
  const setEraId = useSetAtom(eraIdAtom);

  // URL 파라미터가 변경될 때마다 관련 atom 값들을 업데이트
  useEffect(() => {
    // 책 관련 상태 업데이트
    setBookSearchKeyword(searchParams.get('q') ?? '');
    setBookSortMode(
      (searchParams.get('sort') as 'popular' | 'recent' | 'alphabet') ??
        'popular'
    );
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
    setAuthorGenre(
      (searchParams.get('genre') as
        | 'all'
        | 'philosophy'
        | 'science'
        | 'economics') ?? 'all'
    );
    setEraId(searchParams.get('eraId') ?? undefined);
  }, [
    searchParams,
    setBookSearchKeyword,
    setBookSortMode,
    setAuthorId,
    setBookGenre,
    setAuthorSearchKeyword,
    setAuthorSortMode,
    setAuthorGenre,
    setEraId,
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
      authorGenreAtom,
      (searchParams.get('genre') as
        | 'all'
        | 'philosophy'
        | 'science'
        | 'economics') ?? 'all',
    ],
    [eraIdAtom, searchParams.get('eraId') ?? undefined],
  ]);

  return children;
}
