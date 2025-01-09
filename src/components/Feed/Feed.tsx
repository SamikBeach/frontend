'use client';

import { Book } from '@/apis/book/types';
import { Review } from '@/apis/review/types';
import { User } from '@/apis/user/types';
import { MessageSquareIcon, MoreHorizontal, ThumbsUpIcon } from 'lucide-react';
import { useState } from 'react';
import { ReviewDialog } from '../ReviewDialog';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import EditDropdownMenu from './EditDropdownMenu';

interface FeedProps {
  review: Review;
  user: User;
  book: Book;
}

function Feed({ review, user, book }: FeedProps) {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <div
        className="flex max-w-[800px] gap-2 rounded-lg p-4 hover:cursor-pointer hover:bg-gray-100"
        onClick={() => setOpenDialog(true)}
      >
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>{user.nickname[0]}</AvatarFallback>
              </Avatar>
              <div className="font-medium">{user.nickname}</div>
              <div className="text-muted-foreground">
                {new Date(review.createdAt).toLocaleDateString()}
              </div>
            </div>
            <EditDropdownMenu>
              <EditDropdownMenu.Trigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:bg-gray-200"
                >
                  <MoreHorizontal className="h-4 w-4 text-gray-500" />
                </Button>
              </EditDropdownMenu.Trigger>
            </EditDropdownMenu>
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col gap-1">
              <div className="relative h-[300px] min-w-[200px] overflow-hidden rounded-lg bg-gray-200">
                <img
                  src={book.imageUrl ?? 'https://picsum.photos/200/300'}
                  alt={book.title}
                  className="absolute inset-0 h-full w-full object-cover"
                  width={200}
                  height={300}
                />
              </div>
              <div>
                <p className="font-semibold">{book.title}</p>
                <p className="text-sm text-gray-500">
                  {book.authorBooks.map(author => author.name).join(', ')} ·{' '}
                  {book.publisher} · {book.publicationDate?.split('-')[0]}
                </p>
              </div>
            </div>

            <div className="flex h-full flex-col justify-between">
              <div>
                <p className="text-lg font-semibold">{review.title}</p>
                <p className="text-gray-600">{review.content}</p>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  className="rounded-full"
                  variant="outline"
                  onClick={e => e.stopPropagation()}
                >
                  <ThumbsUpIcon className="h-4 w-4" />
                  <span>{review.likeCount}</span>
                </Button>
                <Button className="rounded-full" variant="outline">
                  <MessageSquareIcon className="h-4 w-4" />
                  <span>{review.commentCount}</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ReviewDialog open={openDialog} onOpenChange={setOpenDialog} />
    </>
  );
}

export default Feed;
