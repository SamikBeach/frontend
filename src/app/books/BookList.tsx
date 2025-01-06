import { BigBookItem } from './BookItem';

export default function BookList() {
  return (
    <div className="flex gap-6 py-4">
      <BigBookItem />
      <BigBookItem />
      <BigBookItem />
      <BigBookItem />
    </div>
  );
}
