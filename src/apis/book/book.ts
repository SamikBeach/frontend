import { transformFilterParams } from '@/utils/api';
import axios from '../axios';
import type {
  ChatRequest,
  ChatWithBookResponse,
  PaginatedResponse,
  PaginationQuery,
  YouTubeVideo,
} from '../common/types';
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
    axios.get<PaginatedResponse<Book>>(`/book/${bookId}/related/search`, {
      params,
    }),

  /**
   * 같은 저자가 쓴 모든 다른 책들의 목록을 조회합니다.
   * 페이지네이션 없이 전체 목록을 반환합니다.
   * @param bookId - 책 ID
   * @returns 관련된 모든 책 목록
   */
  getAllRelatedBooks: (bookId: number) =>
    axios.get<Book[]>(`/book/${bookId}/related`),

  /**
   * 특정 책에 대한 리뷰 목록을 조회합니다.
   * @param bookId - 책 ID
   * @param params - 페이지네이션 옵션
   * @param includeOtherTranslations - 다른 번역서의 리뷰도 함께 가져올지 여부
   * @returns 페이지네이션된 리뷰 목록
   */
  searchBookReviews: (
    bookId: number,
    params: PaginationQuery,
    includeOtherTranslations = false
  ) =>
    axios.get<PaginatedResponse<Review>>(`/book/${bookId}/reviews`, {
      params: { ...params, includeOtherTranslations },
    }),

  /**
   * 책 관련 YouTube 동영상을 가져옵니다.
   * @param bookId - 책 ID
   * @param maxResults - 최대 결과 수 (기본값: 5)
   * @returns YouTube 동영상 목록
   */
  getBookVideos: (bookId: number, maxResults = 5) =>
    axios.get<YouTubeVideo[]>(`/book/${bookId}/videos`, {
      params: { maxResults },
    }),

  /**
   * 책과 대화합니다.
   * @param bookId - 책 ID
   * @param request - 채팅 메시지 및 대화 기록
   * @param signal - AbortSignal 객체 (요청 취소용)
   * @returns AI 응답
   */
  chatWithBook: (bookId: number, request: ChatRequest, signal?: AbortSignal) =>
    axios.post<ChatWithBookResponse>(`/book/${bookId}/chat`, request, {
      signal,
    }),
};
