import {
  authorIdAtom,
  bookSearchKeywordAtom,
  bookSortModeAtom,
  bookViewModeAtom,
} from '@/atoms/book';
import { useHydrateAtoms } from 'jotai/utils';
import { useSearchParams } from 'next/navigation';

/**
 * URL query parameter를 기반으로 atom들을 초기화하는 훅
 *
 * 이 훅은 최상위 페이지 컴포넌트에서 한 번만 호출되어야 합니다.
 * 하위 컴포넌트들은 이미 초기화된 atom 값들을 사용하게 됩니다.
 *
 * 초기화되는 atom들:
 * - bookViewModeAtom: 'view' parameter (기본값: 'grid')
 * - bookSearchKeywordAtom: 'q' parameter (기본값: '')
 * - bookSortModeAtom: 'sort' parameter (기본값: 'popular')
 * - authorIdAtom: 'authorId' parameter (기본값: undefined)
 */
export function useInitializeAtoms() {
  const searchParams = useSearchParams();

  useHydrateAtoms([
    [bookViewModeAtom, (searchParams.get('view') as any) ?? 'grid'],
    [bookSearchKeywordAtom, searchParams.get('q') ?? ''],
    [bookSortModeAtom, (searchParams.get('sort') as any) ?? 'popular'],
    [authorIdAtom, searchParams.get('authorId') ?? undefined],
  ]);
}
