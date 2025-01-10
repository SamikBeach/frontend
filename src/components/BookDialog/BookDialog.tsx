import { bookApi } from '@/apis/book/book';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useQuery } from '@tanstack/react-query';
import BookInfo from './BookInfo';
import RelativeBooks from './RelativeBooks';
import ReviewList from './ReviewList';

interface Props {
  bookId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function BookDialog({ bookId, open, onOpenChange }: Props) {
  const { data: book } = useQuery({
    queryKey: ['book', bookId],
    queryFn: () => bookApi.getBookDetail(bookId),
    select: data => data.data,
    enabled: open,
  });

  if (!book) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        overlayClassName="bg-black/10"
        className="flex h-[94vh] w-[900px] min-w-[900px] flex-col gap-8 overflow-y-auto p-10"
        aria-describedby={undefined}
        onOpenAutoFocus={e => e.preventDefault()}
      >
        <BookInfo book={book} />
        <RelativeBooks bookId={bookId} />
        <ReviewList bookId={bookId} reviewCount={book.reviewCount} />
      </DialogContent>
    </Dialog>
  );
}
