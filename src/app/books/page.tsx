'use client';

import BookList from './BookList';
import Tabs from './Tabs/Tabs';

export default function BooksPage() {
  return (
    <>
      <div className="sticky top-[56px] z-10">
        <Tabs />
      </div>
      <BookList />
    </>
  );
}
