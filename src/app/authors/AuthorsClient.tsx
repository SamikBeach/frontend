'use client';

import AuthorList from './AuthorList';
import Tabs from './Tabs/Tabs';

export default function AuthorsClient() {
  return (
    <>
      <div className="sticky top-[56px] z-10">
        <Tabs />
      </div>
      <AuthorList />
    </>
  );
}
