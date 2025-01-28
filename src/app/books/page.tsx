import { Metadata } from 'next';
import BookList from './BookList';
import Tabs from './Tabs/Tabs';

export const metadata: Metadata = {
  title: '도서 목록',
  description: '고전 도서 목록',
  openGraph: {
    title: '도서 목록 | 고전산책',
    description: '고전 도서 목록',
    url: 'https://classicswalk.com/books',
  },
};

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
