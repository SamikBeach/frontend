import { Metadata } from 'next';
import AuthorsClient from './AuthorsClient';

export const metadata: Metadata = {
  title: '작가 목록',
  description:
    '시대별 주요 작가들을 한눈에. 관심 있는 작가의 작품을 찾아보세요.',
  openGraph: {
    title: '작가 목록',
    description:
      '시대별 주요 작가들을 한눈에. 관심 있는 작가의 작품을 찾아보세요.',
    url: 'https://classicswalk.com/authors',
  },
};

export default function AuthorsPage() {
  return <AuthorsClient />;
}
