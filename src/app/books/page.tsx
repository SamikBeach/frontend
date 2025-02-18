import { Metadata } from 'next';
import BookList from './BookList';
import Tabs from './Tabs/Tabs';

export const metadata: Metadata = {
  title: '도서 목록',
  description:
    '시간이 검증한 고전을 한눈에. 다양한 시대와 장르의 고전을 만나보세요',
  openGraph: {
    title: '도서 목록 | 고전산책',
    description:
      '시간이 검증한 고전을 한눈에. 다양한 시대와 장르의 고전을 만나보세요',
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
