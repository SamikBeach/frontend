import { BookIcon, MessageSquareIcon, ThumbsUpIcon } from 'lucide-react';

export default function SearchBarContent() {
  return (
    <div className="flex flex-col gap-6 py-2">
      {/* 작품 섹션 */}
      <section>
        <h2 className="mb-3 text-base font-semibold text-gray-900">작품</h2>
        <div className="flex flex-col gap-3">
          <div className="flex cursor-pointer gap-4 rounded-lg p-2 transition-colors hover:bg-gray-50">
            <img
              src="https://image.yes24.com/goods/102280491/XL"
              className="h-24 w-16 rounded-md object-cover shadow-sm"
              alt="짜라투스트라는 이렇게 말했다 표지"
            />
            <div>
              <h3 className="font-medium text-gray-900">
                짜라투스트라는 이렇게 말했다
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                프리드리히 니체 · 민음사 · 2021
              </p>
              <div className="mt-2 flex gap-3 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <ThumbsUpIcon className="h-3.5 w-3.5" />
                  300
                </span>
                <span className="flex items-center gap-1">
                  <MessageSquareIcon className="h-3.5 w-3.5" />
                  212
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 작가 섹션 */}
      <section>
        <h2 className="mb-3 text-base font-semibold text-gray-900">작가</h2>
        <div className="flex flex-col gap-3">
          <div className="flex cursor-pointer gap-4 rounded-lg p-2 transition-colors hover:bg-gray-50">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Nietzsche187a.jpg"
              className="h-12 w-12 rounded-full object-cover shadow-sm"
              alt="프리드리히 니체 사진"
            />
            <div>
              <h3 className="font-medium text-gray-900">
                프리드리히 니체
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                Friedrich Wilhelm Nietzsche
              </p>
              <div className="mt-2 flex gap-3 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <BookIcon className="h-3.5 w-3.5" />
                  12
                </span>
                <span className="flex items-center gap-1">
                  <ThumbsUpIcon className="h-3.5 w-3.5" />
                  300
                </span>
                <span className="flex items-center gap-1">
                  <MessageSquareIcon className="h-3.5 w-3.5" />
                  212
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
