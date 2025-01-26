import { authorApi } from '@/apis/author/author';
import { Author } from '@/apis/author/types';
import { bookApi } from '@/apis/book/book';
import { Book } from '@/apis/book/types';
import { reviewApi } from '@/apis/review/review';
import { Review } from '@/apis/review/types';
import { MetadataRoute } from 'next';

type ChangeFrequency =
  | 'always'
  | 'hourly'
  | 'daily'
  | 'weekly'
  | 'monthly'
  | 'yearly'
  | 'never';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://classicswalk.com';

  // 정적 라우트
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily' as ChangeFrequency,
      priority: 1,
    },
    {
      url: `${baseUrl}/books`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily' as ChangeFrequency,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/authors`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily' as ChangeFrequency,
      priority: 0.8,
    },
  ] as const;

  try {
    // 도서 페이지
    const books = await bookApi.searchBooks({}).then(res => res.data.data);
    const bookUrls = books.map((book: Book) => ({
      url: `${baseUrl}/book/${book.id}`,
      lastModified: book.updatedAt
        ? new Date(book.updatedAt).toISOString()
        : new Date().toISOString(),
      changeFrequency: 'weekly' as ChangeFrequency,
      priority: 0.6,
    }));

    // 작가 페이지
    const authors = await authorApi.searchAuthors({}).then(res => res.data.data);
    const authorUrls = authors.map((author: Author) => ({
      url: `${baseUrl}/author/${author.id}`,
      lastModified: author.updatedAt
        ? new Date(author.updatedAt).toISOString()
        : new Date().toISOString(),
      changeFrequency: 'weekly' as ChangeFrequency,
      priority: 0.6,
    }));

    // 리뷰 페이지
    const reviews = await reviewApi.searchReviews({}).then(res => res.data.data);
    const reviewUrls = reviews.map((review: Review) => ({
      url: `${baseUrl}/review/${review.id}`,
      lastModified: review.updatedAt
        ? new Date(review.updatedAt).toISOString()
        : new Date().toISOString(),
      changeFrequency: 'weekly' as ChangeFrequency,
      priority: 0.6,
    }));

    return [...routes, ...bookUrls, ...authorUrls, ...reviewUrls];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return [...routes];
  }
}
