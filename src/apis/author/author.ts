import { transformFilterParams } from '@/utils/api';
import axios from '../axios';
import type { Book } from '../book/types';
import type { PaginatedResponse, PaginationQuery } from '../common/types';
import { Review } from '../review/types';
import type { Author, AuthorDetail, AuthorSearchQuery } from './types';

export const authorApi = {
  /**
   * 작가 목록을 검색합니다.
   * @param params - 검색 조건 (이름, 시대 등으로 필터링 가능)
   * @returns 페이지네이션된 작가 목록
   */
  searchAuthors: (params: AuthorSearchQuery) =>
    axios.get<PaginatedResponse<Author>>('/author/search', {
      params: transformFilterParams(params),
    }),

  /**
   * 모든 작가 목록을 가져옵니다.
   * @returns 전체 작가 목록
   */
  getAllAuthors: () => axios.get<Author[]>('/author'),

  /**
   * 특정 작가의 상세 정보를 조회합니다.
   * @param authorId - 작가 ID
   * @returns 작가 상세 정보 (좋아요 여부 포함)
   */
  getAuthorDetail: (authorId: number) =>
    axios.get<AuthorDetail>(`/author/${authorId}`),

  /**
   * 작가 좋아요를 토글합니다.
   * @param authorId - 작가 ID
   * @returns 토글 후 좋아요 상태
   */
  toggleAuthorLike: (authorId: number) =>
    axios.post<{ liked: boolean }>(`/author/${authorId}/like`),

  /**
   * 특정 작가의 모든 책 목록을 조회합니다.
   * @param authorId - 작가 ID
   * @returns 책 목록
   */
  getAllAuthorBooks: (authorId: number) =>
    axios.get<Book[]>(`/author/${authorId}/books`),

  /**
   * 특정 작가의 리뷰 목록을 조회합니다.
   * @param authorId - 작가 ID
   * @param params - 페이지네이션 옵션
   * @returns 페이지네이션된 리뷰 목록
   */
  getAuthorReviews: (authorId: number, params: PaginationQuery) =>
    axios.get<PaginatedResponse<Review>>(`/author/${authorId}/reviews`, {
      params,
    }),
};
