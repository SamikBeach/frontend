export default function SupportPage() {
  return (
    <main className="mx-auto max-w-[680px] px-4 py-10">
      <h1 className="mb-8 text-2xl font-bold">고객지원</h1>

      <div className="flex flex-col gap-8">
        <section>
          <h2 className="mb-4 text-xl font-semibold">자주 묻는 질문 (FAQ)</h2>
          <div className="flex flex-col gap-4">
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="mb-2 font-medium">
                Q. 고전산책은 어떤 서비스인가요?
              </h3>
              <p className="text-gray-600">
                고전산책은 철학을 깊이 있게 탐구하는 독자들을 위한 서비스입니다.
                철학자, 원전, 그리고 한국어 번역서 정보를 한곳에서 확인할 수
                있으며, 다른 독자들과 리뷰를 나누고 소통할 수 있습니다.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="mb-2 font-medium">
                Q. 철학자나 책 정보는 어떻게 찾나요?
              </h3>
              <p className="text-gray-600">
                상단의 검색창에서 철학자 이름이나 책 제목을 검색할 수 있습니다.
                또는 철학자/책 목록에서 직접 찾아볼 수도 있어요. 각 철학자의
                상세 페이지에서는 관련된 원전과 번역서 정보도 함께 확인하실 수
                있습니다.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="mb-2 font-medium">Q. 리뷰는 어떻게 작성하나요?</h3>
              <p className="text-gray-600">
                책 상세 페이지에서 리뷰 작성 버튼을 클릭하여 리뷰를 남길 수
                있습니다. 로그인한 사용자만 리뷰 작성이 가능하며, 다른 사용자의
                리뷰에 좋아요를 누르거나 댓글을 달 수도 있습니다.
              </p>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <h3 className="mb-2 font-medium">Q. 회원가입은 어떻게 하나요?</h3>
              <p className="text-gray-600">
                상단 메뉴의 &apos;로그인&apos; 버튼을 클릭한 후, 회원가입을
                선택하시면 됩니다. 이메일 인증 후 간단한 정보 입력으로 가입이
                완료됩니다.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold">문의하기</h2>
          <div className="rounded-lg border border-gray-200 p-6">
            <p className="mb-4 text-gray-600">
              서비스 이용 중 궁금하신 점이나 문제가 있으시다면 아래 이메일로
              문의해 주세요. 평일 기준 24시간 이내에 답변 드리도록 하겠습니다.
            </p>
            <div className="flex flex-col gap-2">
              <div>
                <h3 className="font-medium">일반 문의</h3>
                <p className="text-gray-600">jungcome7@gmail.com</p>
              </div>
              <div>
                <h3 className="font-medium">콘텐츠 제보 및 수정 요청</h3>
                <p className="text-gray-600">jungcome7@gmail.com</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold">앱 정보</h2>
          <div className="rounded-lg border border-gray-200 p-6">
            <div className="flex flex-col gap-2 text-gray-600">
              <p>앱 버전: 1.0.0</p>
              <p>최소 지원 OS: iOS 15.0 이상</p>
              <p>© 2025 bong. All rights reserved.</p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
