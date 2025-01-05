'use client';

import { cn } from '@/lib/utils';

function Feed() {
  return <div className="max-w-[800px] bg-yellow-300">Feed</div>;
  return (
    <article className="border-b border-gray-100 bg-white p-6 transition-all hover:bg-gray-50">
      {/* Author Info */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={feed.author.image}
            alt={feed.author.name}
            className="h-12 w-12 rounded-full object-cover shadow-sm"
          />
          <div className="flex flex-col">
            <span className="font-semibold text-gray-900">
              {feed.author.name}
            </span>
            <span className="text-sm text-gray-500">{feed.timeAgo}</span>
          </div>
        </div>
        <button className="rounded-full p-2 text-gray-500 hover:bg-gray-100">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="1" />
            <circle cx="19" cy="12" r="1" />
            <circle cx="5" cy="12" r="1" />
          </svg>
        </button>
      </div>

      {/* Feed Title */}
      <h2 className="mb-4 text-xl font-bold text-gray-900">{feed.title}</h2>

      {/* Book Image and Info */}
      <div className="mb-6 flex gap-6">
        <div className="relative h-52 w-36 shrink-0 overflow-hidden rounded-lg shadow-md">
          <img
            src={
              feed.bookImage ||
              'https://covers.openlibrary.org/b/id/8739161-L.jpg'
            }
            alt={feed.bookTitle}
            className="h-full w-full object-cover"
            onError={e => {
              e.currentTarget.src =
                'https://covers.openlibrary.org/b/id/8739161-L.jpg';
            }}
          />
        </div>
        <div className="flex flex-col justify-center">
          <h3 className="mb-2 text-lg font-bold text-gray-900">
            {feed.bookTitle}
          </h3>
          <p className="text-sm text-gray-600">{feed.publisher}</p>
        </div>
      </div>

      {/* Interaction Buttons */}
      <div className="flex gap-6">
        <button
          className={cn(
            'flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium',
            'text-gray-700 hover:bg-gray-100'
          )}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
          </svg>
          <span>{feed.likes}</span>
        </button>
        <button
          className={cn(
            'flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium',
            'text-gray-700 hover:bg-gray-100'
          )}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span>{feed.comments}</span>
        </button>
      </div>
    </article>
  );
}

export default Feed;
