import { BookIcon, MessageSquareIcon, ThumbsUpIcon } from 'lucide-react';

export default function SearchBarContent() {
  return (
    <div className="flex max-h-[800px] flex-col gap-4 overflow-y-auto py-2">
      {/* 작품 섹션 */}
      <section>
        <h2 className="mb-2 text-base font-semibold text-gray-900">작품</h2>
        <div className="flex flex-col gap-2">
          <div className="flex cursor-pointer gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50">
            <img
              src="https://image.yes24.com/goods/102280491/XL"
              className="h-20 w-14 rounded-md object-cover shadow-sm"
              alt="짜라투스트라는 이렇게 말했다 표지"
            />
            <div>
              <h3 className="font-medium text-gray-900">
                짜라투스트라는 이렇게 말했다
              </h3>
              <p className="mt-0.5 text-sm text-gray-500">
                프리드리히 니체 · 민음사 · 2021
              </p>
              <div className="mt-1.5 flex gap-2 text-sm text-gray-600">
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
          <div className="flex cursor-pointer gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50">
            <img
              src="https://image.yes24.com/goods/102280491/XL"
              className="h-20 w-14 rounded-md object-cover shadow-sm"
              alt="도덕의 계보학 표지"
            />
            <div>
              <h3 className="font-medium text-gray-900">도덕의 계보학</h3>
              <p className="mt-0.5 text-sm text-gray-500">
                프리드리히 니체 · 창비 · 2020
              </p>
              <div className="mt-1.5 flex gap-2 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <ThumbsUpIcon className="h-3.5 w-3.5" />
                  250
                </span>
                <span className="flex items-center gap-1">
                  <MessageSquareIcon className="h-3.5 w-3.5" />
                  180
                </span>
              </div>
            </div>
          </div>
          <div className="flex cursor-pointer gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50">
            <img
              src="https://image.yes24.com/goods/102280491/XL"
              className="h-20 w-14 rounded-md object-cover shadow-sm"
              alt="선악의 저편 표지"
            />
            <div>
              <h3 className="font-medium text-gray-900">선악의 저편</h3>
              <p className="mt-0.5 text-sm text-gray-500">
                프리드리히 니체 · 을유문화사 · 2019
              </p>
              <div className="mt-1.5 flex gap-2 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <ThumbsUpIcon className="h-3.5 w-3.5" />
                  280
                </span>
                <span className="flex items-center gap-1">
                  <MessageSquareIcon className="h-3.5 w-3.5" />
                  195
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 작가 섹션 */}
      <section>
        <h2 className="mb-2 text-base font-semibold text-gray-900">작가</h2>
        <div className="flex flex-col gap-2">
          <div className="flex cursor-pointer gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Nietzsche187a.jpg"
              className="h-10 w-10 rounded-full object-cover shadow-sm"
              alt="프리드리히 니체 사진"
            />
            <div>
              <h3 className="font-medium text-gray-900">프리드리히 니체</h3>
              <p className="mt-0.5 text-sm text-gray-500">
                Friedrich Wilhelm Nietzsche
              </p>
              <div className="mt-1.5 flex gap-2 text-sm text-gray-600">
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
          <div className="flex cursor-pointer gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Kafka1906_cropped.jpg/800px-Kafka1906_cropped.jpg"
              className="h-10 w-10 rounded-full object-cover shadow-sm"
              alt="프란츠 카프카 사진"
            />
            <div>
              <h3 className="font-medium text-gray-900">프란츠 카프카</h3>
              <p className="mt-0.5 text-sm text-gray-500">Franz Kafka</p>
              <div className="mt-1.5 flex gap-2 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <BookIcon className="h-3.5 w-3.5" />8
                </span>
                <span className="flex items-center gap-1">
                  <ThumbsUpIcon className="h-3.5 w-3.5" />
                  250
                </span>
                <span className="flex items-center gap-1">
                  <MessageSquareIcon className="h-3.5 w-3.5" />
                  180
                </span>
              </div>
            </div>
          </div>
          <div className="flex cursor-pointer gap-3 rounded-lg p-2 transition-colors hover:bg-gray-50">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Albert_Camus_1957.jpg/800px-Albert_Camus_1957.jpg"
              className="h-10 w-10 rounded-full object-cover shadow-sm"
              alt="알베르 카뮈 사진"
            />
            <div>
              <h3 className="font-medium text-gray-900">알베르 카뮈</h3>
              <p className="mt-0.5 text-sm text-gray-500">Albert Camus</p>
              <div className="mt-1.5 flex gap-2 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <BookIcon className="h-3.5 w-3.5" />
                  10
                </span>
                <span className="flex items-center gap-1">
                  <ThumbsUpIcon className="h-3.5 w-3.5" />
                  280
                </span>
                <span className="flex items-center gap-1">
                  <MessageSquareIcon className="h-3.5 w-3.5" />
                  195
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
