import { BookItem } from './BookItem';

export default function BookList() {
  return (
    <>
      <div className="flex gap-6 py-4">
        <BookItem />
        <BookItem />
        <BookItem />
        <BookItem />
      </div>
      <div className="flex flex-wrap gap-3 py-2">
        <BookItem size="small" />
        <BookItem size="small" />
        <BookItem size="small" />
        <BookItem size="small" />
        <BookItem size="small" />
        <BookItem size="small" />
        <BookItem size="small" />
        <BookItem size="small" />
        <BookItem size="small" />
        <BookItem size="small" />
        <BookItem size="small" />
        <BookItem size="small" />
      </div>
    </>
  );
}
