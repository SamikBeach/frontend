/**
 * Google Analytics 4 (GA4) 통합 컴포넌트
 *
 * 주요 기능:
 * 1. 페이지 조회 추적
 * 2. 사용자 행동 이벤트 추적
 * 3. 사용자 프로필 정보
 * 4. 맞춤 이벤트 추적
 */

'use client';

import { GoogleAnalytics as NextGoogleAnalytics } from '@next/third-parties/google';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

// GA4 타입 정의
type GtagFunction = (
  command: string,
  action: string,
  params?: {
    [key: string]: any;
    page_path?: string;
    event_category?: string;
    event_label?: string;
    value?: number;
  }
) => void;

declare global {
  interface Window {
    gtag: GtagFunction;
  }
}

// GA4 이벤트 타입 정의
interface GAEvent {
  action: string;
  category?: string;
  label?: string;
  value?: number;
  [key: string]: any;
}

/**
 * GA4 이벤트 전송 함수
 * @param event 전송할 이벤트 데이터
 */
export const sendGAEvent = (event: GAEvent) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', event.action, {
      event_category: event.category,
      event_label: event.label,
      value: event.value,
      ...event,
    });
  }
};

/**
 * 사용자 프로필 설정 함수
 * @param userId 사용자 ID
 * @param properties 추가 프로필 속성
 */
export const setUserProfile = (
  userId: string,
  properties?: Record<string, any>
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GA_ID ?? '', {
      user_id: userId,
      ...properties,
    });
  }
};

export default function GoogleAnalytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 페이지 조회 자동 추적
  useEffect(() => {
    if (pathname) {
      // 페이지 조회 이벤트 전송
      sendGAEvent({
        action: 'page_view',
        page_path: pathname,
        page_search: searchParams?.toString(),
      });
    }
  }, [pathname, searchParams]);

  return (
    <>
      <NextGoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID ?? ''} />
    </>
  );
}

// 사용 예시:
/*
// 1. 일반 이벤트 추적
sendGAEvent({
  action: 'button_click',
  category: 'engagement',
  label: 'sign_up_button',
});

// 2. 사용자 프로필 설정
setUserProfile('USER_12345', {
  user_type: 'premium',
  membership_level: 'gold',
});
*/
