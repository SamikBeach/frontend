import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar';
import { Input } from '../ui/input';

export default function CommentEditor() {
  return (
    <div className="flex gap-2">
      <Avatar>
        <AvatarImage
          src="https://github.com/shadcn.png"
          className="h-8 w-8 rounded-full"
        />
        <AvatarFallback>CD</AvatarFallback>
      </Avatar>
      <Input placeholder="댓글을 입력해주세요." />
    </div>
  );
}
