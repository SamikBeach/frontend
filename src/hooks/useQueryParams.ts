import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

/**
 * URL query parameter를 관리하기 위한 커스텀 훅
 *
 * @example
 * ```tsx
 * const { updateQueryParams } = useQueryParams();
 *
 * // 단일 파라미터 업데이트
 * updateQueryParams({ sort: 'recent' });
 *
 * // 여러 파라미터 동시 업데이트
 * updateQueryParams({ sort: 'recent', view: 'grid' });
 *
 * // 파라미터 삭제
 * updateQueryParams({ sort: undefined });
 * ```
 *
 * @returns {Object} query parameter 관련 유틸리티
 * @property {URLSearchParams} searchParams - 현재 URL의 query parameter
 * @property {Function} updateQueryParams - query parameter를 업데이트하는 함수
 */
export function useQueryParams() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  /**
   * URL query parameter를 업데이트하는 함수
   *
   * @param {Record<string, string | undefined>} updates - 업데이트할 파라미터 객체
   * - key: 파라미터 이름
   * - value: 파라미터 값 (undefined인 경우 해당 파라미터 삭제)
   */
  const updateQueryParams = useCallback(
    (updates: Record<string, string | undefined>) => {
      // 현재 URL의 모든 query parameter를 복사
      const current = new URLSearchParams(Array.from(searchParams.entries()));

      // 업데이트할 파라미터들을 순회하며 적용
      Object.entries(updates).forEach(([key, value]) => {
        if (!value) {
          current.delete(key);
        } else {
          current.set(key, value);
        }
      });

      // 업데이트된 query parameter로 URL 변경
      const search = current.toString();
      const query = search ? `?${search}` : '';
      router.push(`${pathname}${query}`, { scroll: false });
    },
    [searchParams, pathname, router]
  );

  return {
    searchParams,
    updateQueryParams,
  };
}
