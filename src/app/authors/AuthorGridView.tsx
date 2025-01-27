import { Author } from '@/apis/author/types';
import { AuthorGridItem } from '@/components/AuthorItem';
import { cn } from '@/utils/common';

interface Props {
  authors: Author[];
  className?: string;
}

export default function AuthorGridView({ authors, className }: Props) {
  return (
    <div className={cn('flex flex-col gap-10 py-6', className)}>
      {authors.length > 0 && (
        <div className="flex min-w-max gap-6 overflow-auto pb-2">
          {authors.slice(0, 4).map(author => (
            <AuthorGridItem key={author.id} author={author} />
          ))}
        </div>
      )}
      <div className="flex flex-wrap gap-6 py-2">
        {authors.slice(4).map(author => (
          <AuthorGridItem key={author.id} author={author} size="small" />
        ))}
      </div>
    </div>
  );
}
