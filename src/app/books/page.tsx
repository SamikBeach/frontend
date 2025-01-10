'use client';

import { useHydrateBookAtoms } from '@/hooks/useHydrateBookAtoms';
import BookList from './BookList';
import Tabs from './Tabs/Tabs';

export default function BooksPage() {
  useHydrateBookAtoms();

  return (
    <>
      <div className="sticky top-[56px] z-10">
        <Tabs />
      </div>
      <BookList />
    </>
  );
}
