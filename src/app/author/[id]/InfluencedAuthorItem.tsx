'use client';

import { Author } from '@/apis/author/types';
import AuthorImage from '@/components/AuthorImage/AuthorImage';
import { MOBILE_BREAKPOINT } from '@/constants/responsive';
import { useDialogQuery } from '@/hooks/useDialogQuery';
import { formatAuthorLifespan } from '@/utils/date';
import { useRouter } from 'next/navigation';

interface Props {
  author: Author & { isWikiData?: boolean };
}

export default function InfluencedAuthorItem({ author }: Props) {
  const { open } = useDialogQuery({ type: 'author' });
  const router = useRouter();

  const handleClick = () => {
    if (author.isWikiData) {
      window.open(`https://en.wikipedia.org/wiki/${author.name}`, '_blank');
      return;
    }

    if (window.innerWidth < MOBILE_BREAKPOINT) {
      router.push(`/author/${author.id}`);
    } else {
      open(author.id);
    }
  };

  const lifespan = formatAuthorLifespan(
    author.bornDate,
    author.bornDateIsBc,
    author.diedDate,
    author.diedDateIsBc
  );

  return (
    <div
      className="inline-flex min-w-[160px] cursor-pointer items-center gap-3 whitespace-nowrap rounded-lg bg-white p-2 transition-colors hover:bg-gray-50"
      onClick={handleClick}
    >
      <AuthorImage
        imageUrl={author.imageUrl}
        name={author.nameInKor}
        width={32}
        height={32}
        className="shrink-0 rounded-full bg-gray-100 shadow-sm ring-1 ring-gray-200/50"
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-900">{author.nameInKor}</span>
          {author.isWikiData && (
            <span className="shrink-0 rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-medium text-blue-600">
              Wikipedia
            </span>
          )}
        </div>
        {lifespan && <span className="text-xs text-gray-500">{lifespan}</span>}
      </div>
    </div>
  );
}
