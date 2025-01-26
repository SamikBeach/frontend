import { bookApi } from '@/apis/book/book';
import { Metadata } from 'next';
import { use } from 'react';
import BookPageClient from './BookPageClient';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const bookId = Number(params.id);
  const book = await bookApi.getBookDetail(bookId).then(res => res.data);

  const authorName = book.authorBooks[0]?.author.nameInKor ?? '작가 미상';
  const title = `${book.title} - ${authorName}`;
  const description =
    book.description ||
    `${authorName}의 도서 ${book.title}. ${book.publisher} 출판`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'book',
      siteName: '고전산책',
      locale: 'ko_KR',
      alternateLocale: 'en_US',
      url: `https://classicswalk.com/book/${bookId}`,
      images: book.imageUrl ? [book.imageUrl] : [],
      authors: [authorName],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: book.imageUrl ? [book.imageUrl] : [],
    },
  };
}

export default function BookPage(props: Props) {
  const params = use(props.params);
  return <BookPageClient bookId={Number(params.id)} />;
}
