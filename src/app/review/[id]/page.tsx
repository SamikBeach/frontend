import { reviewApi } from '@/apis/review/review';
import { Metadata } from 'next';
import { use } from 'react';
import ReviewPageClient from './ReviewPageClient';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const reviewId = Number(params.id);
  const review = await reviewApi
    .getReviewDetail(reviewId)
    .then(res => res.data);

  const title = `${review.title} - ${review.user.nickname}`;
  const description =
    review.content || `${review.title}. ${review.user.nickname} 작성`;

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
    title,
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

export default function ReviewPage(props: Props) {
  const params = use(props.params);
  return <ReviewPageClient reviewId={Number(params.id)} />;
}
