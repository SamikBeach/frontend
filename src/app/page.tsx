import { Metadata } from 'next';
import HomePage from './@home/page';

export const metadata: Metadata = {
  description: '시대를 초월한 지혜, 고전과 함께하는 새로운 독서 경험',
  openGraph: {
    title: '고전산책',
    description: '시대를 초월한 지혜, 고전과 함께하는 새로운 독서 경험',
    url: 'https://classicswalk.com',
    images: ['/images/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: '고전산책',
    description: '시대를 초월한 지혜, 고전과 함께하는 새로운 독서 경험',
    images: ['/images/og-image.png'],
  },
};

export default function Page() {
  return <HomePage />;
}
