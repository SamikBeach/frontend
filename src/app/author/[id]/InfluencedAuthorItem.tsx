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
      className="flex h-full cursor-pointer items-center gap-3 rounded-lg bg-white p-2 transition-colors hover:bg-gray-50"
      onClick={handleClick}
    >
      <AuthorImage
        imageUrl={author.imageUrl}
        name={author.nameInKor}
        width={32}
        height={32}
        className="rounded-full bg-gray-100 shadow-sm ring-1 ring-gray-200/50"
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-center gap-2">
          <span className="truncate font-medium text-gray-900">
            {author.nameInKor}
          </span>
        </div>
        {lifespan && (
          <span className="truncate text-xs text-gray-500">{lifespan}</span>
        )}
      </div>
    </div>
  );
}
