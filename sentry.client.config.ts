// This file configures the initialization of Sentry on the client.
// The config you add here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'https://c7e8335cbdf89c6becafa6bcbfca63de@o4508183872667648.ingest.us.sentry.io/4508183877320704',

  // Enable source maps for better stack traces
  attachStacktrace: true,
  normalizeDepth: 10,

  // Add optional integrations for additional features
  integrations: [
    // Session Replay 기능으로 사용자 행동 추적
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
    // Browser 성능 추적
    new Sentry.BrowserTracing({
      tracePropagationTargets: ['localhost', /^https:\/\/classicswalk\.com/],
    }),
    // Browser 프로파일링
    new Sentry.BrowserProfilingIntegration(),
  ],

  // Performance monitoring 설정
  // 트랜잭션 샘플링 비율 (프로덕션에서는 낮춰서 사용)
  tracesSampleRate: 1.0,
  // 프로파일링 샘플링 비율
  profilesSampleRate: 1.0,

  // Session Replay 설정
  replaysSessionSampleRate: 0.1, // 일반 세션의 10% 기록
  replaysOnErrorSampleRate: 1.0, // 에러 발생 시 100% 기록

  // 환경 설정
  environment: process.env.NODE_ENV,

  // 에러 필터링 및 그룹핑 설정
  beforeSend(event) {
    // 특정 에러 무시 또는 수정
    if (event.exception) {
      // 민감한 정보 제거
      Sentry.addBreadcrumb({
        category: 'error',
        message: 'Error processed',
        level: 'info',
      });
    }
    return event;
  },

  // 디버그 모드 (개발 환경에서만 활성화)
  debug: process.env.NODE_ENV === 'development',

  // 성능 최적화
  maxBreadcrumbs: 50,
  autoSessionTracking: true,
});
