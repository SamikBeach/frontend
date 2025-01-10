'use client';

import { BookAtomsProvider } from '@/providers/BookAtomsProvider';
import BookList from './BookList';
import Tabs from './Tabs/Tabs';

export default function BooksPage() {
  return (
    <BookAtomsProvider>
      <div className="sticky top-[56px] z-10">
        <Tabs />
      </div>
      <BookList />
    </BookAtomsProvider>
  );
}
