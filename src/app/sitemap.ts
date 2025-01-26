import { authorApi } from '@/apis/author/author';
import { Author } from '@/apis/author/types';
import { bookApi } from '@/apis/book/book';
import { Book } from '@/apis/book/types';
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
  const baseUrl = 'https://classicswalk.com';

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

  return [...routes, ...bookUrls, ...authorUrls];
}
