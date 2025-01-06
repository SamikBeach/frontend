import BookInfo from './BookInfo';
import RelativeBooks from './RelativeBooks';

export default function BookPage() {
  return (
    <div className="flex flex-col gap-6 py-4">
      <BookInfo />
      <RelativeBooks />
    </div>
  );
}
