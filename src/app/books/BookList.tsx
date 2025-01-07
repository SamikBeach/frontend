import { BookItem } from '../../components/BookItem';
import BookListItem from '../../components/BookItem/BookListItem';

export default function BookList() {
  // todo: list 모드 jotai atom으로 관리
  // eslint-disable-next-line no-constant-condition
  if (true) {
    return (
      <div className="flex flex-col gap-4">
        <BookListItem />
        <BookListItem />
        <BookListItem />
        <BookListItem />
        <BookListItem />
        <BookListItem />
        <BookListItem />
        <BookListItem />
        <BookListItem />
      </div>
    );
  }

  return (
    <>
      <div className="flex gap-6 pb-2">
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
