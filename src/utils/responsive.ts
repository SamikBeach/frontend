import { MOBILE_BREAKPOINT } from '@/constants/responsive';

export function isMobileDevice() {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < MOBILE_BREAKPOINT;
}
