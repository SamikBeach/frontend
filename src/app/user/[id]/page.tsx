import { userApi } from '@/apis/user/user';
import { Metadata } from 'next';
import UserHistory from './UserHistory/UserHistory';
import UserInfo from './UserInfo';

type Props = {
  params: { id: string };
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const userId = Number(props.params.id);
  const user = await userApi.getUserDetail(userId).then(res => res.data);

  const title = `${user.nickname} - 프로필`;
  const description = `${user.nickname}의 독서 기록`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'profile',
      url: `https://classicswalk.com/user/${userId}`,
      images: user.imageUrl ? [user.imageUrl] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: user.imageUrl ? [user.imageUrl] : [],
    },
  };
}

export default function UserPage({ params }: Props) {
  const userId = Number(params.id);

  return (
    <>
      <UserInfo userId={userId} />
      <UserHistory userId={userId} />
    </>
  );
}
