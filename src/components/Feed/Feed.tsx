'use client';

import { MessageSquareIcon, ThumbsUpIcon } from 'lucide-react';
import { useState } from 'react';
import { ReviewDialog } from '../ReviewDialog';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';

function Feed() {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <div
        className="flex max-w-[800px] gap-2 rounded-lg p-4 hover:cursor-pointer hover:bg-gray-100"
        onClick={() => setOpenDialog(true)}
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="font-medium">BonggeunJeong</div>
            <div className="text-muted-foreground">1일 전</div>
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col gap-1">
              <img
                src="https://picsum.photos/200/300"
                alt="feed"
                className="min-w-[200px] rounded-lg"
                width={200}
              />
              <div>
                <p className="font-semibold">짜라투스트라는 이렇게 말했다</p>
                <p className="text-sm text-gray-500">
                  프리드리히 니체 · 민음사 · 2021
                </p>
              </div>
            </div>

            <div className="flex h-full flex-col justify-between">
              <div>
                <p className="text-lg font-semibold">
                  인간은 극복되어야 할 존재다
                </p>
                <p className="text-gray-600">
                  인간은 밧줄이다. 짐승과 초인 사이에 걸쳐진 밧줄이다. 심연 위에
                  걸쳐진 위험한 건너감이요, 위험한 도상이요, 위험한
                  뒤돌아봄이요, 위험한 전율이요, 위험한 멈춤이다. 인간은
                  밧줄이다. 짐승과 초인 사이에 걸쳐진 밧줄이다. 심연 위에 걸쳐진
                  위험한 건너감이요, 위험한 도상이요, 위험한 뒤돌아봄이요,
                  위험한 전율이요, 위험한 멈춤이다.
                </p>
              </div>

              <div className="flex justify-end gap-2">
                <Button className="rounded-full" variant="outline">
                  <ThumbsUpIcon className="h-4 w-4" />
                  <span>300</span>
                </Button>
                <Button className="rounded-full" variant="outline">
                  <MessageSquareIcon className="h-4 w-4" />
                  <span>300</span>
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
