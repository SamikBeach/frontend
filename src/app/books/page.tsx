'use client';

import { AtomsProvider } from '@/hooks/useInitializeAtoms';
import BookList from './BookList';
import Tabs from './Tabs/Tabs';

export default function BooksPage() {
  return (
    <AtomsProvider>
      <Tabs />
      <BookList />
    </AtomsProvider>
  );
}
