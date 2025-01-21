import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function TermsDialog({ open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>이용약관</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-8 py-4">
          <section>
            <h2 className="mb-4 text-xl font-semibold">제1조 (목적)</h2>
            <p className="text-gray-600">
              이 약관은 회사가 제공하는 독서 커뮤니티 서비스의 이용과 관련하여
              회사와 회원 간의 권리, 의무 및 책임사항을 규정함을 목적으로
              합니다.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold">제2조 (정의)</h2>
            <div className="flex flex-col gap-2 text-gray-600">
              <p>
                1. &quot;서비스&quot;란 회사가 제공하는 모든 서비스를
                의미합니다.
              </p>
              <p>
                2. &quot;회원&quot;이란 서비스에 가입하여 이용하는 모든 사용자를
                의미합니다.
              </p>
              <p>
                3. &quot;리뷰&quot;란 회원이 서비스 내에서 작성하는 모든 형태의
                게시물을 의미합니다.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold">제3조 (약관의 효력)</h2>
            <div className="flex flex-col gap-2 text-gray-600">
              <p>
                1. 회사는 이 약관의 내용을 회원이 쉽게 알 수 있도록 서비스 초기
                화면에 게시합니다.
              </p>
              <p>
                2. 회사는 필요한 경우 관련 법령을 위배하지 않는 범위에서 이
                약관을 개정할 수 있습니다.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold">
              제4조 (서비스의 제공)
            </h2>
            <div className="flex flex-col gap-2 text-gray-600">
              <p>1. 회사는 다음과 같은 서비스를 제공합니다.</p>
              <ul className="ml-4 list-disc">
                <li>도서 정보 제공 서비스</li>
                <li>도서 리뷰 작성 및 공유 서비스</li>
                <li>작가 정보 제공 서비스</li>
                <li>회원 간 커뮤니케이션 서비스</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold">제5조 (회원의 의무)</h2>
            <div className="flex flex-col gap-2 text-gray-600">
              <p>1. 회원은 다음 행위를 하여서는 안 됩니다.</p>
              <ul className="ml-4 list-disc">
                <li>타인의 정보 도용</li>
                <li>회사가 게시한 정보의 변경</li>
                <li>서비스를 이용하여 얻은 정보의 무단 복제, 배포, 방송</li>
                <li>회사나 제3자의 저작권 등 지적재산권 침해</li>
                <li>회사나 제3자의 명예를 손상시키거나 업무를 방해하는 행위</li>
              </ul>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}
