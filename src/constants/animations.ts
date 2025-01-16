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
