export default function UserInfo() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <div
          className={
            'group relative h-[200px] w-[200px] flex-shrink-0 cursor-pointer overflow-hidden rounded-full bg-gray-200'
          }
        >
          <img
            src="https://picsum.photos/200/200"
            alt="user"
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            width={200}
            height={200}
          />
        </div>

        <div className="flex w-full flex-col justify-between gap-4">
          <div className="flex flex-col gap-0.5">
            <p className="text-2xl font-bold">BonggeunJeong</p>
          </div>
        </div>
      </div>
    </div>
  );
}
