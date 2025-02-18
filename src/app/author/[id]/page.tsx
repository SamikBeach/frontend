import { authorApi } from '@/apis/author/author';
import { formatAuthorLifespan } from '@/utils/date';
import { Metadata } from 'next';
import { use } from 'react';
import AuthorPageClient from './AuthorPageClient';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const authorId = Number(params.id);
  const { data: author } = await authorApi.getAuthorDetail(authorId);

  const title = `${author.nameInKor} - 작가 프로필`;
  const lifespan = formatAuthorLifespan(
    author.bornDate,
    author.bornDateIsBc,
    author.diedDate,
    author.diedDateIsBc
  );

  const description = [
    `${author.nameInKor} 작가의 프로필과 작품 목록.`,
    `${author.bookCount}개의 책과 ${author.reviewCount}개의 리뷰.`,
    lifespan,
  ].join(' ');

  const metadata: Metadata = {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'profile',
      siteName: '고전산책',
      locale: 'ko_KR',
      alternateLocale: 'en_US',
      url: `https://classicswalk.com/author/${authorId}`,
      images: author.imageUrl ? [author.imageUrl] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: author.imageUrl ? [author.imageUrl] : [],
    },
  };

  return metadata;
}

export default function AuthorPage(props: Props) {
  const params = use(props.params);
  return <AuthorPageClient authorId={Number(params.id)} />;
}
