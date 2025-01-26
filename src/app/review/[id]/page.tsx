import { reviewApi } from '@/apis/review/review';
import { Metadata } from 'next';
import ReviewPageClient from './ReviewPageClient';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  console.log({ params });
  const reviewId = Number(params.id);
  const review = await reviewApi
    .getReviewDetail(reviewId)
    .then(res => res.data);

  const title = `${review.title} - ${review.user.nickname}의 리뷰`;
  const description = `${review.user.nickname}님이 작성한 ${review.book.title}에 대한 리뷰입니다.`;

  const openGraph: Metadata['openGraph'] = {
    title,
    description,
    type: 'article',
    siteName: '고전산책',
    locale: 'ko_KR',
    alternateLocale: 'en_US',
    url: `https://classicswalk.com/review/${reviewId}`,
    images: review.book.imageUrl ? [review.book.imageUrl] : [],
    authors: [review.user.nickname],
  };

  if (review.createdAt) {
    openGraph.publishedTime = new Date(review.createdAt).toISOString();
  }

  if (review.updatedAt) {
    openGraph.modifiedTime = new Date(review.updatedAt).toISOString();
  }

  return {
    title: `${title} | 고전산책`,
    description,
    openGraph,
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: review.book.imageUrl ? [review.book.imageUrl] : [],
    },
  };
}

export default async function ReviewPage({ params: { id } }: Props) {
  return <ReviewPageClient reviewId={Number(id)} />;
}
