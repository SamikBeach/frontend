import { Transition, Variants } from 'framer-motion';

const ease = [0.4, 0, 0.2, 1];

export const reviewItemAnimation = {
  initial: { opacity: 0, height: 0, marginBottom: 0 },
  animate: { opacity: 1, height: 'auto', marginBottom: '1rem' },
  exit: { opacity: 0, height: 0, marginBottom: 0 },
  transition: {
    duration: 0.2,
    ease,
    height: {
      duration: 0.2,
      ease,
    },
    opacity: {
      duration: 0.15,
    },
  },
};

export const commentItemAnimation = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
  transition: {
    duration: 0.2,
    ease,
  },
};

export const feedItemAnimation = {
  initial: false,
  exit: {
    opacity: 0,
    height: 0,
    transition: {
      height: {
        duration: 0.2,
        ease,
      },
      opacity: {
        duration: 0.15,
      },
    },
  },
};

// 공통 트랜지션 설정
export const defaultTransition: Transition = {
  duration: 0.3,
  ease: 'easeInOut',
};

// 아이콘 회전 애니메이션
export const rotateAnimation: Variants = {
  initial: { rotate: 0 },
  expanded: { rotate: 180 },
};

// 확장/축소 애니메이션 (컨텐츠용)
export const expandAnimation: Variants = {
  collapsed: {
    opacity: 0,
    height: 0,
    marginTop: 0,
  },
  expanded: {
    opacity: 1,
    height: 'auto',
    marginTop: 4,
  },
};

// 아이템 스케일 애니메이션
export const itemAnimation: Variants = {
  collapsed: {
    opacity: 0,
    scale: 0.95,
  },
  expanded: {
    opacity: 1,
    scale: 1,
  },
};
