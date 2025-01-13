import { UserSearch } from '@/apis/user/types';
import AuthorItem from './AuthorItem';
import BookItem from './BookItem';

interface Props {
  searches: UserSearch[];
  onOpenChange: (open: boolean) => void;
  onItemClick: (bookId?: number, authorId?: number) => void;
}

export default function RecentSearchList({
  searches,
  onOpenChange,
  onItemClick,
}: Props) {
  return (
    <div className="flex flex-col pt-2">
      <h3 className="px-2 text-sm font-semibold text-foreground">최근 검색</h3>
      <div className="flex flex-col">
        {searches.map(search => (
          <div key={search.id}>
            {search.book && (
              <BookItem
                book={search.book}
                onOpenChange={onOpenChange}
                onClick={() => onItemClick(search.book?.id, undefined)}
              />
            )}
            {search.author && (
              <AuthorItem
                author={search.author}
                onOpenChange={onOpenChange}
                onClick={() => onItemClick(undefined, search.author?.id)}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
