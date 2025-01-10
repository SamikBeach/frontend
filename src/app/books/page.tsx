'use client';

import { useInitializeAtoms } from '@/hooks/useInitializeAtoms';
import BookList from './BookList';
import Tabs from './Tabs/Tabs';

export default function BooksPage() {
  useInitializeAtoms();

  return (
    <>
      <Tabs />
      <BookList />
    </>
  );
}
