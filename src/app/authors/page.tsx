'use client';

import { AuthorAtomsProvider } from '@/providers/AuthorAtomsProvider';
import AuthorList from './AuthorList';
import Tabs from './Tabs/Tabs';

export default function AuthorsPage() {
  return (
    <AuthorAtomsProvider>
      <div className="sticky top-[56px] z-10">
        <Tabs />
      </div>
      <AuthorList />
    </AuthorAtomsProvider>
  );
}
