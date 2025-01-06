import { Comment } from '@/components/Comment';

export default function CommentList() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm font-semibold">댓글 4</p>
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
      <Comment />
    </div>
  );
}
