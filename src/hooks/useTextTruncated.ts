import { useState } from 'react';

/**
 * 텍스트가 컨테이너를 넘어가는지(잘리는지) 확인하는 훅입니다.
 *
 * @returns {UseTextTruncatedReturn}
 * - isTruncated: 텍스트가 잘리는지 여부
 * - handleMouseEnter: 마우스가 요소에 진입할 때 텍스트 잘림 여부를 체크
 * - handleMouseLeave: 마우스가 요소를 벗어날 때 상태 초기화
 *
 * @example
 * ```tsx
 * function Component() {
 *   const { isTruncated, handleMouseEnter, handleMouseLeave } = useTextTruncated();
 *
 *   return (
 *     <div
 *       className="truncate"
 *       onMouseEnter={handleMouseEnter}
 *       onMouseLeave={handleMouseLeave}
 *     >
 *       {isTruncated ? '텍스트가 잘립니다' : '긴 텍스트 내용...'}
 *     </div>
 *   );
 * }
 * ```
 */
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
