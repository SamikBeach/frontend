import { Metadata } from 'next';
import AuthorList from './AuthorList';
import Tabs from './Tabs/Tabs';

export const metadata: Metadata = {
  title: '작가 목록',
  description: '고전 작가 목록',
  openGraph: {
    title: '작가 목록 | 고전산책',
    description: '고전 작가 목록',
    url: 'https://classicswalk.com/authors',
  },
};

export default function AuthorsPage() {
  return (
    <>
      <div className="sticky top-[56px] z-10">
        <Tabs />
      </div>
      <AuthorList />
    </>
  );
}
