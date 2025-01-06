import { ThumbsUpIcon } from 'lucide-react';

import { MessageSquareIcon } from 'lucide-react';

interface Props {
  size?: 'small' | 'large';
}

export default function BookItem({ size = 'large' }: Props) {
  const isSmall = size === 'small';

  return (
    <div
      className={`flex ${isSmall ? 'w-[140px]' : 'w-[250px]'} group cursor-pointer flex-col gap-1`}
    >
      <div
        className={`relative ${isSmall ? 'h-[210px] w-[140px]' : 'h-[370px] w-[250px]'} overflow-hidden rounded-lg bg-gray-200`}
      >
        <img
          src={`https://picsum.photos/${isSmall ? '140/210' : '250/370'}`}
          alt="book"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
          width={isSmall ? 140 : 250}
          height={isSmall ? 210 : 370}
        />
      </div>
      <div className="flex flex-col gap-0.5">
        <p className={`font-semibold ${isSmall ? 'text-sm' : ''}`}>
          짜라투스트라는 이렇게 말했다
        </p>
        <p className={`${isSmall ? 'text-xs' : 'text-sm'} text-gray-500`}>
          프리드리히 니체 · 민음사 · 2021
        </p>

        <div
          className={`flex items-center gap-2 ${isSmall ? 'text-xs' : 'text-sm'} text-gray-500`}
        >
          <div className="flex items-center gap-1">
            <ThumbsUpIcon className="h-4 w-4" />
            <span>300</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquareIcon className="mt-0.5 h-4 w-4" />
            <span>300</span>
          </div>
        </div>
      </div>
    </div>
  );
}
