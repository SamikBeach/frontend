'use client';

import { AtomsProvider } from '@/providers/AtomsProvider';
import BookList from './BookList';
import Tabs from './Tabs/Tabs';

export default function BooksPage() {
  return (
    <AtomsProvider>
      <div className="sticky top-[56px] z-10">
        <Tabs />
      </div>
      <BookList />
    </AtomsProvider>
  );
}
