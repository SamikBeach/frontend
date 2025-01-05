import { useState } from 'react';
import AuthorItem from './AuthorItem';
import BookItem from './BookItem';

export default function SearchBarDialogContent() {
  // TODO: jotai atom으로 변경
  const [searchValue, _] = useState('');

  if (searchValue === '') {
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

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <div className="px-2 text-sm font-semibold">작품</div>

          <div className="flex flex-col">
            <BookItem />
            <BookItem />
            <BookItem />
          </div>
        </div>

        <div className="text-sm font-semibold">작가</div>

        <div className="flex flex-col">
          <AuthorItem />
          <AuthorItem />
          <AuthorItem />
        </div>
      </div>
    </>
  );
}
