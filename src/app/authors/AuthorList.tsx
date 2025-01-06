import { AuthorItem } from '../../components/AuthorItem';
import AuthorListItem from '../../components/AuthorItem/AuthorListItem';

export default function AuthorList() {
  // todo: list 모드 jotai atom으로 관리
  // eslint-disable-next-line no-constant-condition
  if (true) {
    return (
      <div className="flex flex-col gap-4">
        <AuthorListItem />
        <AuthorListItem />
        <AuthorListItem />
        <AuthorListItem />
        <AuthorListItem />
        <AuthorListItem />
        <AuthorListItem />
        <AuthorListItem />
        <AuthorListItem />
      </div>
    );
  }

  return (
    <>
      <div className="flex gap-6 pb-2">
        <AuthorItem />
        <AuthorItem />
        <AuthorItem />
        <AuthorItem />
      </div>
      <div className="flex flex-wrap gap-5 py-2">
        <AuthorItem size="small" />
        <AuthorItem size="small" />
        <AuthorItem size="small" />
        <AuthorItem size="small" />
        <AuthorItem size="small" />
        <AuthorItem size="small" />
        <AuthorItem size="small" />
        <AuthorItem size="small" />
        <AuthorItem size="small" />
        <AuthorItem size="small" />
        <AuthorItem size="small" />
        <AuthorItem size="small" />
      </div>
    </>
  );
}
