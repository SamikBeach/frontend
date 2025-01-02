'use client';

import { Feed } from '@/components/Feed';

export default function Page() {
  const feeds = [
    {
      id: 1,
      author: {
        name: 'Bonggeun',
        image: '/profile.jpg',
      },
      timeAgo: '3일 전',
      title: '이거 정말 좋아요',
      bookImage: '/book1.jpg',
      bookTitle: '차라투스트라는 이렇게 말했다',
      publisher: '프리드리히 니체 · 민음사',
      likes: 300,
      comments: 212,
    },
    // ... more posts
  ];
  return (
    <>
      <div className="mx-auto max-w-2xl">
        <Tabs />
        {feeds.map(feed => (
          <Feed key={feed.id} feed={feed} />
        ))}
      </div>
    </>
  );
}

function Tabs() {
  return (
    <div className="flex gap-2 border-b border-gray-200 p-4">
      <button className="rounded-full bg-gray-100 px-4 py-2">인기순</button>
      <button className="rounded-full bg-gray-100 px-4 py-2">최신순</button>
    </div>
  );
}
