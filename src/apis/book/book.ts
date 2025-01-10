import { transformFilterParams } from '@/utils/api';
import axios from '../axios';
import type { PaginatedResponse, PaginationQuery } from '../common/types';
import type { Review } from '../review/types';
import type { Book, BookDetail, BookSearchQuery } from './types';

export const bookApi = {
  /**
   * 책 목록을 검색합니다.
   * @param params - 검색 조건 (제목, 출판사, ISBN 등으로 필터링 가능)
   * @returns 페이지네이션된 책 목록
   */
  searchBooks: (params: BookSearchQuery) =>
    axios.get<PaginatedResponse<Book>>('/book/search', {
      params: transformFilterParams(params),
    }),

  /**
   * 특정 책의 상세 정보를 조회합니다.
   * @param bookId - 책 ID
   * @returns 책 상세 정보 (좋아요 여부 포함)
   */
  getBookDetail: (bookId: number) => axios.get<BookDetail>(`/book/${bookId}`),

  /**
   * 책 좋아요를 토글합니다.
   * @param bookId - 책 ID
   * @returns 토글 후 좋아요 상태
   */
  toggleBookLike: (bookId: number) =>
    axios.post<{ liked: boolean }>(`/book/${bookId}/like`),

  /**
   * 특정 책과 관련된 다른 책들을 조회합니다. (같은 저자의 다른 책들)
   * @param bookId - 책 ID
   * @param params - 페이지네이션 옵션
   * @returns 페이지네이션된 관련 책 목록
   */
  searchRelatedBooks: (bookId: number, params: PaginationQuery) =>
    axios.get<PaginatedResponse<Book>>(`/book/${bookId}/related`, { params }),

  /**
   * 특정 책에 대한 리뷰 목록을 조회합니다.
   * @param bookId - 책 ID
   * @param params - 페이지네이션 옵션
   * @returns 페이지네이션된 리뷰 목록
   */
  searchBookReviews: (bookId: number, params: PaginationQuery) =>
    axios.get<PaginatedResponse<Review>>(`/book/${bookId}/reviews`, { params }),
};
