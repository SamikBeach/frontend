import { useState } from 'react';

interface UseTextTruncatedReturn {
  isTruncated: boolean;
  handleMouseEnter: (e: React.MouseEvent<HTMLElement>) => void;
  handleMouseLeave: () => void;
}

export function useTextTruncated(): UseTextTruncatedReturn {
  const [isTruncated, setIsTruncated] = useState(false);

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    const element = e.currentTarget;
    setIsTruncated(element.scrollWidth > element.clientWidth);
  };

  const handleMouseLeave = () => {
    setIsTruncated(false);
  };

  return {
    isTruncated,
    handleMouseEnter,
    handleMouseLeave,
  };
}
