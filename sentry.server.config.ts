// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.SENTRY_DSN,

  // Enable source maps for better stack traces
  // 소스맵을 활성화하여 실제 소스코드 위치를 정확하게 추적
  attachStacktrace: true,
  normalizeDepth: 10,

  // Add integrations for additional features
  integrations: [
    // Node 성능 추적
    new Sentry.Integrations.Http({ tracing: true }),
    new Sentry.Integrations.Express(),
    new Sentry.Integrations.Prisma(),
  ],

  // Performance monitoring 설정
  // 트랜잭션 샘플링 비율 (프로덕션에서는 낮춰서 사용)
  tracesSampleRate: 1.0,

  // 환경 설정
  environment: process.env.NODE_ENV,

  // 에러 필터링 및 그룹핑 설정
  beforeSend(event) {
    // 민감한 정보 제거
    if (event.request?.headers) {
      delete event.request.cookies;
      delete event.request.headers['authorization'];
    }
    return event;
  },

  // 디버그 모드 (개발 환경에서만 활성화)
  debug: process.env.NODE_ENV === 'development',

  // 성능 최적화
  maxBreadcrumbs: 50,

  // 서버 사이드 컨텍스트 추가
  serverName: process.env.HOSTNAME || 'unknown',
});
