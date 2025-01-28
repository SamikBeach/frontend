import { sendGAEvent } from '@/components/GoogleAnalytics';
import { useCallback } from 'react';

/**
 * Google Analytics 이벤트 추적을 위한 커스텀 훅
 *
 * 주요 기능:
 * 1. 도서 관련 이벤트 추적
 * 2. 작곡가 관련 이벤트 추적
 * 3. 사용자 상호작용 추적
 * 4. 검색 이벤트 추적
 */
export const useAnalytics = () => {
  /**
   * 도서 조회 이벤트
   */
  const trackBookView = useCallback(
    (bookData: { id: string; title: string; author?: string }) => {
      sendGAEvent({
        action: 'view_book',
        category: 'content',
        label: bookData.title,
        book_id: bookData.id,
        author: bookData.author,
      });
    },
    []
  );

  /**
   * 작곡가 프로필 조회 이벤트
   */
  const trackAuthorView = useCallback(
    (authorData: { id: string; name: string; category?: string }) => {
      sendGAEvent({
        action: 'view_author',
        category: 'content',
        label: authorData.name,
        author_id: authorData.id,
        author_category: authorData.category,
      });
    },
    []
  );

  /**
   * 검색 이벤트
   */
  const trackSearch = useCallback(
    (searchData: {
      term: string;
      category?: string;
      results_count?: number;
    }) => {
      sendGAEvent({
        action: 'search',
        category: 'engagement',
        label: searchData.term,
        search_category: searchData.category,
        results_count: searchData.results_count,
      });
    },
    []
  );

  /**
   * 사용자 상호작용 이벤트
   */
  const trackInteraction = useCallback(
    (interactionData: {
      action: string;
      category?: string;
      label?: string;
      value?: number;
    }) => {
      sendGAEvent({
        action: interactionData.action,
        category: interactionData.category || 'interaction',
        label: interactionData.label,
        value: interactionData.value,
      });
    },
    []
  );

  return {
    trackBookView,
    trackAuthorView,
    trackSearch,
    trackInteraction,
  };
};

// 사용 예시:
/*
const { trackBookView, trackAuthorView, trackSearch, trackInteraction } = useAnalytics();

// 1. 도서 조회 추적
trackBookView({
  id: 'BOOK_123',
  title: '모차르트: 교향곡 전집',
  author: '모차르트',
});

// 2. 작곡가 프로필 조회 추적
trackAuthorView({
  id: 'AUTHOR_456',
  name: '모차르트',
  category: 'Classical',
});

// 3. 검색 이벤트 추적
trackSearch({
  term: '모차르트 교향곡',
  category: 'books',
  results_count: 15,
});

// 4. 사용자 상호작용 추적
trackInteraction({
  action: 'like_book',
  category: 'engagement',
  label: 'BOOK_123',
});
*/
