import { userApi } from '@/apis/user/user';
import { Metadata } from 'next';
import { use } from 'react';
import UserClient from './UserClient';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const userId = Number(params.id);
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

export default function UserPage(props: Props) {
  const params = use(props.params);
  return <UserClient userId={Number(params.id)} />;
}
