import UserHistory from './UserHistory';
import UserInfo from './UserInfo';

export default function BookPage() {
  return (
    <div className="flex flex-col gap-6 py-4">
      <UserInfo />
      <UserHistory />
    </div>
  );
}
