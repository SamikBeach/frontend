import * as Sentry from '@sentry/nextjs';
import React from 'react';

interface Props {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface State {
  hasError: boolean;
  eventId: string | null;
}

/**
 * Sentry 에러 바운더리 컴포넌트
 * - React 컴포넌트 트리에서 발생하는 JavaScript 에러를 감지하고 Sentry에 보고
 * - 에러 발생 시 폴백 UI를 표시하고 사용자 피드백을 수집
 */
class SentryErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, eventId: null };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    Sentry.withScope(scope => {
      scope.setExtra('componentStack', errorInfo.componentStack);
      const eventId = Sentry.captureException(error);
      this.setState({ eventId });
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
            <h1 className="mb-4 text-2xl font-bold text-red-600">
              죄송합니다. 오류가 발생했습니다.
            </h1>
            <p className="mb-6 text-gray-600">
              문제가 지속되면 관리자에게 문의해주세요.
            </p>
            <button
              className="rounded bg-blue-500 px-4 py-2 text-white transition-colors hover:bg-blue-600"
              onClick={() => {
                Sentry.showReportDialog({
                  eventId: this.state.eventId || undefined,
                });
              }}
            >
              문제 보고하기
            </button>
            <button
              className="mt-4 rounded bg-gray-500 px-4 py-2 text-white transition-colors hover:bg-gray-600"
              onClick={() => {
                window.location.reload();
              }}
            >
              페이지 새로고침
            </button>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default SentryErrorBoundary;
