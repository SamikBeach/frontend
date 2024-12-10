import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function RightSlot() {
  return (
    <Avatar className="h-8 w-8 cursor-pointer">
      <AvatarImage
        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        alt="User avatar"
        className="rounded-full"
      />
      <AvatarFallback>UN</AvatarFallback>
    </Avatar>
  );
}
