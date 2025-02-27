import axios from '../axios';
import {
  ChatWithAuthorRequest,
  ChatWithAuthorResponse,
  ChatWithBookRequest,
  ChatWithBookResponse,
} from './types';

export const aiApi = {
  /**
   * 작가와 대화합니다.
   * @param authorId - 작가 ID
   * @param request - 채팅 메시지 및 대화 기록
   * @param signal - AbortSignal 객체 (요청 취소용)
   * @returns AI 응답
   */
  chatWithAuthor: (
    authorId: number,
    request: ChatWithAuthorRequest,
    signal?: AbortSignal
  ) =>
    axios.post<ChatWithAuthorResponse>(`/ai/author/${authorId}/chat`, request, {
      signal,
    }),

  /**
   * 책과 대화합니다.
   * @param bookId - 책 ID
   * @param request - 채팅 메시지 및 대화 기록
   * @param signal - AbortSignal 객체 (요청 취소용)
   * @returns AI 응답
   */
  chatWithBook: (
    bookId: number,
    request: ChatWithBookRequest,
    signal?: AbortSignal
  ) =>
    axios.post<ChatWithBookResponse>(`/book/${bookId}/chat`, request, {
      signal,
    }),
};
