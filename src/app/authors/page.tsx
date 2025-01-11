'use client';

import { useHydrateAuthorAtoms } from '@/hooks/useHydrateAuthorAtoms';
import AuthorList from './AuthorList';
import Tabs from './Tabs/Tabs';

export default function AuthorsPage() {
  useHydrateAuthorAtoms();

  return (
    <>
      <div className="sticky top-[56px] z-10">
        <Tabs />
      </div>
      <AuthorList />
    </>
  );
}
