import { Author } from '@/apis/author/types';
import { DialogTitle } from '@radix-ui/react-dialog';
import { MessageSquareIcon, ThumbsUpIcon } from 'lucide-react';
import { RefObject } from 'react';
import { Button } from '../ui/button';

interface Props {
  author: Author;
  reviewListRef: RefObject<HTMLDivElement | null>;
}

export default function AuthorInfo({ author, reviewListRef }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <div
          className={
            'group relative h-[140px] w-[140px] flex-shrink-0 cursor-pointer overflow-hidden rounded-full bg-gray-200'
          }
        >
          <img
            src={author.imageUrl || 'https://picsum.photos/140/140'}
            alt={author.name}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            width={140}
            height={140}
          />
        </div>
        <div className="flex w-full flex-col justify-between">
          <div className="flex flex-col gap-0.5">
            <DialogTitle>
              <p className="text-2xl font-bold">{author.nameInKor}</p>
            </DialogTitle>
            <p className="text-gray-500">{author.name}</p>
          </div>

          <div className="flex w-full">
            <div className="flex gap-2">
              <Button
                className="rounded-full"
                variant="outline"
                onClick={() =>
                  reviewListRef.current?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                <ThumbsUpIcon className="h-4 w-4" />
                <span>{author.likeCount}</span>
              </Button>
              <Button
                className="rounded-full"
                variant="outline"
                onClick={() =>
                  reviewListRef.current?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                <MessageSquareIcon className="h-4 w-4" />
                <span>{author.reviewCount}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
