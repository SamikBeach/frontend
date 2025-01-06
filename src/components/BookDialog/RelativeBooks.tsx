export default function RelativeBooks() {
  return (
    <div className="flex flex-col gap-3">
      <p className="text-lg font-semibold">이 책의 다른 번역서</p>
      <div className="flex gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <BookItem key={index} />
        ))}
      </div>
    </div>
  );
}

function BookItem() {
  return (
    <div className="group relative h-[160px] w-[110px] flex-shrink-0 cursor-pointer overflow-hidden rounded-lg bg-gray-200">
      <img
        src="https://picsum.photos/110/160"
        alt="book"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        width={110}
        height={160}
      />
    </div>
  );
}
