import { authorApi } from '@/apis/author/author';
import { Metadata } from 'next';
import AuthorPageClient from './AuthorPageClient';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const authorId = Number(params.id);
  const author = await authorApi
    .getAuthorDetail(authorId)
    .then(res => res.data);

  const title = `${author.nameInKor} - 작가 프로필`;
  const description = `작가 ${author.nameInKor}의 프로필과 작품 목록을 확인하세요.`;

  return {
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
}

export default async function AuthorPage({ params: { id } }: Props) {
  return <AuthorPageClient authorId={Number(id)} />;
}
