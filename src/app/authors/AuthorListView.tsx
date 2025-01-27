import { Author } from '@/apis/author/types';
import { AuthorListItem } from '@/components/AuthorItem';
import { cn } from '@/utils/common';

interface Props {
  authors: Author[];
  className?: string;
}

export default function AuthorListView({ authors, className }: Props) {
  return (
    <div className={cn('flex flex-col', className)}>
      {authors.map(author => (
        <AuthorListItem key={author.id} author={author} />
      ))}
    </div>
  );
}
