import BookInfo from './AuthorInfo';
import RelativeBooks from './RelativeBooks';
import ReviewList from './ReviewList';

export default function BookPage() {
  return (
    <>
      <BookInfo />
      <RelativeBooks />
      <ReviewList />
    </>
  );
}
