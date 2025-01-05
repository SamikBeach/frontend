import AuthorItem from './AuthorItem';

import BookItem from './BookItem';

export default function RecentSearchList() {
  return (
    <div className="flex flex-col gap-2">
      <div className="px-2 text-sm font-semibold">최근 검색</div>
      <div className="flex flex-col">
        <BookItem />
        <AuthorItem />
        <BookItem />
        <BookItem />
        <AuthorItem />
        <AuthorItem />
      </div>
    </div>
  );
}
