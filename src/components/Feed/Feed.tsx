'use client';

export interface Feed {
  id: number;
  author: {
    name: string;
    image: string;
  };
  timeAgo: string;
  title: string;
  bookImage: string;
  bookTitle: string;
  publisher: string;
  likes: number;
  comments: number;
}

function Feed({ feed }: { feed: Feed }) {
  return (
    <div className="border-b border-gray-200 p-4">
      {/* Author Info */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src={feed.author.image}
            alt={feed.author.name}
            className="h-10 w-10 rounded-full"
          />
          <span className="font-medium">{feed.author.name}</span>
          <span className="text-gray-500">{feed.timeAgo}</span>
        </div>
        <button className="text-gray-500">
          <span>⋯</span>
        </button>
      </div>

      {/* Feed Title */}
      <h2 className="mb-2 text-xl font-bold">{feed.title}</h2>

      {/* Book Image and Info */}
      <div className="mb-4 flex gap-4">
        <img
          src={feed.bookImage}
          alt={feed.bookTitle}
          className="h-48 w-32 object-cover"
        />
        <div>
          <h3 className="font-bold">{feed.bookTitle}</h3>
          <p className="text-gray-600">{feed.publisher}</p>
        </div>
      </div>

      {/* Interaction Buttons */}
      <div className="flex gap-4">
        <button className="flex items-center gap-2">
          <span>👍</span>
          <span>{feed.likes}</span>
        </button>
        <button className="flex items-center gap-2">
          <span>💬</span>
          <span>{feed.comments}</span>
        </button>
      </div>
    </div>
  );
}

export default Feed;
