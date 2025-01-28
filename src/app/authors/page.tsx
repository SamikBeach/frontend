import { Metadata } from 'next';
import AuthorsClient from './AuthorsClient';

export const metadata: Metadata = {
  title: '작가 목록',
  description: '고전 작가 목록',
  openGraph: {
    title: '작가 목록',
    description: '고전 작가 목록',
    url: 'https://classicswalk.com/authors',
  },
};

export default function AuthorsPage() {
  return <AuthorsClient />;
}
