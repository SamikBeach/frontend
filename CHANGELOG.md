# 🚦 CHANGELOG

## [1.43.1](https://github.com/SamikBeach/frontend/compare/1.43.0...1.43.1) (2025-01-16)


### Bug Fixes

* CommentItem 스타일 수정 ([70db063](https://github.com/SamikBeach/frontend/commit/70db063d3149e3822f72d44c053f23a960a8c60e))
* Review 스타일 수정 ([e54c298](https://github.com/SamikBeach/frontend/commit/e54c298daeb56275d6b9f03a113f73bc761307fa))
* WriteReviewDialog 수정 시 초기값 업데이트 문제 해결 ([e13330a](https://github.com/SamikBeach/frontend/commit/e13330a1c8bce7f2277a61b3d23a40c6f5142931))

# [1.43.0](https://github.com/SamikBeach/frontend/compare/1.42.0...1.43.0) (2025-01-16)


### Bug Fixes

* fix lint ([8b72d11](https://github.com/SamikBeach/frontend/commit/8b72d11e3ade4a0165c6c0d66118fb04c5b45f43))
* ReviewEditor에 불필요한 코드 제거 ([839b1fb](https://github.com/SamikBeach/frontend/commit/839b1fba0dc60b65671b7bebdd354b11301d70c6))
* 더보기 스타일 수정 ([1e4e2b2](https://github.com/SamikBeach/frontend/commit/1e4e2b21f957df9e2680b9c5eae3655b7518a40b))
* 리뷰 리스트에 애니메이션 적용 ([8fe3a3e](https://github.com/SamikBeach/frontend/commit/8fe3a3e566a6449921793f50047591585204ef9e))
* 리뷰 좋아요/삭제 시 쿼리 업데이트 로직 개선 ([df4d838](https://github.com/SamikBeach/frontend/commit/df4d838962d1af374b6be57a79e062781aca8198))
* 리스트 버튼 제거 ([890ef0f](https://github.com/SamikBeach/frontend/commit/890ef0f5357236b3d2175c5cc1b4189260efbe81))


### Features

* @lexical/utils 패키지 추가 ([7f9615b](https://github.com/SamikBeach/frontend/commit/7f9615b0118e1e7f86af01bb2238d4a0bc6c204b))
* Feed 컴포넌트에서 Lexical 컨텐츠 파싱 지원 ([24e67c4](https://github.com/SamikBeach/frontend/commit/24e67c47eb8ab05b6d71f0d76e14408c9ea6d922))
* ReviewEditor 스타일 수정 ([c6314d5](https://github.com/SamikBeach/frontend/commit/c6314d53eda9e8126e5fd10eb111b1c079b451b1))
* WriteReviewDialog API 연동 ([7bbdb4b](https://github.com/SamikBeach/frontend/commit/7bbdb4be1d0ef30eeadca3e3b6f20600b9436c9d))
* 리뷰 더보기 버튼 표시 로직 개선 ([e8e8a3b](https://github.com/SamikBeach/frontend/commit/e8e8a3bc0f64966cc763692959c2ff43207f1720))
* 리뷰 작성 취소 시 확인 다이얼로그 추가 ([2d99ac4](https://github.com/SamikBeach/frontend/commit/2d99ac407aabfa154bb043ec3d00f69beb7f8f33))
* 리뷰 컨텐츠를 Lexical 에디터로 표시하도록 변경 ([3ae93fd](https://github.com/SamikBeach/frontend/commit/3ae93fddda4c0fd011faa379f551d7d2a3864bd0))
* 작가 다이얼로그에 리뷰/코멘트 기능 추가 ([00ba6ec](https://github.com/SamikBeach/frontend/commit/00ba6ecb56be17c891df9e48a1526ff49433ba94))
* 텍스트 포맷 버튼 토글 상태 개선 ([f416171](https://github.com/SamikBeach/frontend/commit/f416171fe9a7b6d7a6fc3d1cd79fae2eeb35127e))

# [1.42.0](https://github.com/SamikBeach/frontend/compare/1.41.0...1.42.0) (2025-01-16)


### Bug Fixes

* DeleteConfirmDialog 사용하도록 수정 ([418fab3](https://github.com/SamikBeach/frontend/commit/418fab3485ffb4ca19a6c5bc6e0f467d614a884f))
* insertMention를 queueMicrotask로 감싸기 ([b153c07](https://github.com/SamikBeach/frontend/commit/b153c07d179bcf714baf2aeb8071dd117918fdac))
* 리뷰의 답글 달기 토글 기능 복구 ([3f710ea](https://github.com/SamikBeach/frontend/commit/3f710eab54e8c6ea3e62ac5e0cec60843c9351ca))
* 불필요한 인자 제거 ([fa77b7d](https://github.com/SamikBeach/frontend/commit/fa77b7d6e8ded79f0c3b08ec81a7b40d245c1bfc))
* 아이콘 스타일 수정 ([66b0c20](https://github.com/SamikBeach/frontend/commit/66b0c20e0949bc4cf3fb5f82658ca5f73b79009c))
* 에디터 스테이트 업데이트 후 포커스하기 ([2fec67f](https://github.com/SamikBeach/frontend/commit/2fec67f3a88c983465fdf5ec945209cd454a6911))
* 컴펌 다이얼로그 띄울 때 드롭다운 명시적으로 닫기 ([9b6401d](https://github.com/SamikBeach/frontend/commit/9b6401d1623bafee7deae97d3fb683c80af81bd3))


### Features

* CommentEditor 아바타 표시 여부 제어 기능 추가 ([32bc993](https://github.com/SamikBeach/frontend/commit/32bc9931fb07b3ba8a0238f42d6161bd506c8deb))
* **Feed:** 리뷰 삭제 기능 연동 ([e1f1c13](https://github.com/SamikBeach/frontend/commit/e1f1c13d873a3972805613e1efd18fd497e386cf))
* 댓글 추가 삭제 애니메이션 적용(framer-motion) ([3faa3dc](https://github.com/SamikBeach/frontend/commit/3faa3dc09bf68a7e24576bb0f1fd9d281711235d))
* 리뷰 답글 달기 UX 개선 ([cd43424](https://github.com/SamikBeach/frontend/commit/cd43424108e894bfeb6131caec51b1c68309ac23))
* 리뷰 댓글 목록 구현 ([eb1526c](https://github.com/SamikBeach/frontend/commit/eb1526ce75e670228fa7bed17af1295ae395a54e))
* 리뷰 댓글 영역 UI/UX 개선 ([f561d07](https://github.com/SamikBeach/frontend/commit/f561d073ea53345abfc43b50f652e11d3d56dda6))
* 리뷰 목록 애니메이션 추가 ([33189c6](https://github.com/SamikBeach/frontend/commit/33189c678154fdfdd64590b09e0d3346025dac7e))
* 리뷰 좋아요 기능 추가 ([c051fa0](https://github.com/SamikBeach/frontend/commit/c051fa0a41d46738a35de14624e566185420989a))

# [1.41.0](https://github.com/SamikBeach/frontend/compare/1.40.0...1.41.0) (2025-01-15)


### Bug Fixes

* CommentEditor 스타일 수정 ([12c93a7](https://github.com/SamikBeach/frontend/commit/12c93a768ad3969de87c31df6c18e44a023aaa4d))
* CommentItem 디자인 수정 ([dc116b6](https://github.com/SamikBeach/frontend/commit/dc116b6a77a7d18899ea43e955ff7180ab0d7f96))
* trailing space 제거 ([1a94d7b](https://github.com/SamikBeach/frontend/commit/1a94d7bf54038683f639b379f810c44ebac06f7d))
* 답글 달기 클릭시 에디터 멘션 활성화 ([b1f950a](https://github.com/SamikBeach/frontend/commit/b1f950a20a84a53473989841f6aae722230bf025))
* 댓글 내용 표시 시 Lexical 파싱 에러 수정 ([5746251](https://github.com/SamikBeach/frontend/commit/57462515abfc24c28f3a4a0b625e2f8d85d0528f))
* 댓글 작성 후 캐시 업데이트 로직 단순화 ([0b81e1a](https://github.com/SamikBeach/frontend/commit/0b81e1ac5fd0edb7aaa4a2f6ef7f49776c4aae70))
* 리뷰 컨텐츠 높이 수정 ([078174c](https://github.com/SamikBeach/frontend/commit/078174c9a80463aa898488e97731131c3d312fb3))
* 좋아요 버튼 스타일 수정 ([9682158](https://github.com/SamikBeach/frontend/commit/9682158a36f4abbb789127ff407761fc6fbfd137))


### Features

* CommentEditor에 멘션 기능 추가 ([71ead28](https://github.com/SamikBeach/frontend/commit/71ead286728fc3bd27dedcf63291347db0475a43))
* 답글달기 기능 추가 ([e3c06c4](https://github.com/SamikBeach/frontend/commit/e3c06c4007f3f5d9bdcdef8acd7b9eb8eaf1f236))
* 댓글 추가시 새 댓글로 스크롤 ([9adec1c](https://github.com/SamikBeach/frontend/commit/9adec1ca2a0ef931cfd295619f094c08ab2f4fe1))
* 멘션 기능이 있는 댓글 작성 구현 ([baec1eb](https://github.com/SamikBeach/frontend/commit/baec1eb1b21c637fd0f596ad57c4c75b2daa1cd7))

# [1.40.0](https://github.com/SamikBeach/frontend/compare/1.39.0...1.40.0) (2025-01-14)


### Bug Fixes

* 검색 다이얼로그 닫을 때 발생하는 에러 수정 ([a0b0142](https://github.com/SamikBeach/frontend/commit/a0b0142abf34010959ed16a273b6fc5daf9e083c))
* 내 프로필 링크 수정 ([d5b020d](https://github.com/SamikBeach/frontend/commit/d5b020de8cbb975e720e859ae976968c7ef0fb00))
* 내 프로필 이미지만 수정 가능하도록 ([a77f728](https://github.com/SamikBeach/frontend/commit/a77f72881e46b57853887a0ca5494e81dcf07d2d))
* 유저 아바타 폴백 수정 ([c42aab7](https://github.com/SamikBeach/frontend/commit/c42aab73f163fd250bc27563f62cfee445d23d50))


### Features

* 비밀번호 리셋 기능 구현 ([53f0165](https://github.com/SamikBeach/frontend/commit/53f01655c4ec49da6082246ebe1e4ab412711372))
* 비밀번호 재설정 기능 추가 ([4946307](https://github.com/SamikBeach/frontend/commit/4946307beea125ed329f04e83630720af4dbbe1b))
* 타입스크립트 버전 수정 ([580d358](https://github.com/SamikBeach/frontend/commit/580d358c7040697209db65bacebcc15707f7e2b2))
* 프로필 이미지 삭제 기능 추가 ([af5feca](https://github.com/SamikBeach/frontend/commit/af5feca3ec36ed1d18905ea35306335741d71f18))
* 프로필 이미지 업로드 기능 추가 ([b250d41](https://github.com/SamikBeach/frontend/commit/b250d41eee99e61522e2ba8a76e9e6b8da24128c))

# [1.39.0](https://github.com/SamikBeach/frontend/compare/1.38.1...1.39.0) (2025-01-14)


### Bug Fixes

* Command shouldFilter={false} 설정 ([7c5d07f](https://github.com/SamikBeach/frontend/commit/7c5d07f0b00c996a7c3ca18fcbe784b35da32a1d))
* Command이용하여 SearchBarContent 구현 ([2fe9846](https://github.com/SamikBeach/frontend/commit/2fe98467760e0e2b1bf4dc411270e31a7acbdece))
* SearchBarDialogContent 스타일 수정 ([1187591](https://github.com/SamikBeach/frontend/commit/1187591e1ceda28b3d1cf15c2a1388512e33c554))
* 불필요한 코드 제거 ([2f7824f](https://github.com/SamikBeach/frontend/commit/2f7824f84a24345d4502f5653793693add93a4ef))
* 스타일 수정 ([17b7611](https://github.com/SamikBeach/frontend/commit/17b7611a3b7eb331a3ccf2e944c59b7a892771d6))
* 스타일 수정 ([6624bd3](https://github.com/SamikBeach/frontend/commit/6624bd38f466f305a21ebf8a5b0d38faafc1ae2f))
* 스타일 수정 ([21169df](https://github.com/SamikBeach/frontend/commit/21169df6a5a2243318a39516f52e532b75e64e05))
* 아바타 이미지 찌그러지지 않도록 수정 ([4be6620](https://github.com/SamikBeach/frontend/commit/4be6620e8fc2cd6da1868dcc7b8bbc4fad6300a9))


### Features

* Review 컴포넌트에 도서 정보 표시 여부 옵션 추가 ([a2a2d03](https://github.com/SamikBeach/frontend/commit/a2a2d03f0ca7e2a63ed2a02f1a5c6ab0bf5c499f))
* UserAvatar 컴포넌트에 닉네임 표시 여부 옵션 추가 ([60fc32b](https://github.com/SamikBeach/frontend/commit/60fc32bb4817dd555c992934ad0c5e0e49e7e0dc))
* UserAvatar 클릭 시 유저 페이지로 이동 ([dac6382](https://github.com/SamikBeach/frontend/commit/dac6382e9417f1e6681209aef9b3e99f34b1cba8))
* 검색 결과 UI 개선 ([88a153e](https://github.com/SamikBeach/frontend/commit/88a153e62285f4f798a533f1e2a6a1c4faa8e62a))
* 검색 결과 클릭시 다이얼로그 닫기 기능 추가 ([d4decca](https://github.com/SamikBeach/frontend/commit/d4deccab6eda9bc0c2945e74c740811a1e6f1bdc))
* 검색 기록 기능을 로그인 상태에 따라 조건부로 제공 ([333dd87](https://github.com/SamikBeach/frontend/commit/333dd8777c2071f24c5d144b6d616a0786c6eeab))
* 검색 다이얼로그 닫을 때 검색어 초기화 ([cad0de2](https://github.com/SamikBeach/frontend/commit/cad0de2daa17c43a146504eb3ce2c2a7522457b1))
* 검색어 하이라이트 스타일 변경 ([e370fa1](https://github.com/SamikBeach/frontend/commit/e370fa16c8e709df54d2ec4ddea1415919c139c9))
* 리뷰 컴포넌트에 책과 리뷰 다이얼로그 연결 ([55011db](https://github.com/SamikBeach/frontend/commit/55011dbcffdb30de9c14687c004669d61ae74d71))
* 최근 검색 기록 구현 ([17e1c95](https://github.com/SamikBeach/frontend/commit/17e1c950f18425d3ce54e39b8272497a05d7383d))
* 통합 검색 API 추가 ([61b2464](https://github.com/SamikBeach/frontend/commit/61b2464143c6578d0988ab385375bdf543d0d664))
* 통합 검색 결과에 상세 정보 추가 ([69cf92d](https://github.com/SamikBeach/frontend/commit/69cf92d53fd47b255c2d407ecbf4b97b3b793e06))
* 통합 검색 로딩 UI 개선 ([d1cc224](https://github.com/SamikBeach/frontend/commit/d1cc224cf9b2ea2645fd0bf92030217a0e8012f3))

## [1.38.1](https://github.com/SamikBeach/frontend/compare/1.38.0...1.38.1) (2025-01-13)


### Bug Fixes

* 401 에러 처리 로직 개선 ([6fe7c3c](https://github.com/SamikBeach/frontend/commit/6fe7c3cdc7fabe0e2febe2dcf0110754eef6cbd4))
* userInfo, verifyCode 모드에서는 다이얼로그 닫히지 않도록 수정 ([c7747b0](https://github.com/SamikBeach/frontend/commit/c7747b0260f2835075ecb2ecd6c9a8e1a7be5e8b))
* 불필요한 코드 제거 ([b35c188](https://github.com/SamikBeach/frontend/commit/b35c18828a7ce6f4eb53a717813294ab7a0e82ba))

# [1.38.0](https://github.com/SamikBeach/frontend/compare/1.37.0...1.38.0) (2025-01-12)


### Bug Fixes

* AtomsProvider에 누락된 category 관련 코드 추가 ([07372ed](https://github.com/SamikBeach/frontend/commit/07372ed70855290d50ea9913745dac9bb63f2d60))
* fix lint ([f403aaa](https://github.com/SamikBeach/frontend/commit/f403aaadc584d65974aa061866dff823f7dc92b1))
* fix typo ([47af048](https://github.com/SamikBeach/frontend/commit/47af048c34a663c3cd306797f984bc24ea7c48d5))
* SearchBar 컴포넌트 입력 지연 현상 개선 ([e270b45](https://github.com/SamikBeach/frontend/commit/e270b45e236d955a9ad3970cbf43ba982dfcfc49))
* useDialogQuery에서 query param 업데이트시 replace: false 처리 ([2aba55a](https://github.com/SamikBeach/frontend/commit/2aba55a350755ccc8ca100dfbbb88dbc0912e785))
* WriteReviewDialog 스타일 수정 ([28c5cf9](https://github.com/SamikBeach/frontend/commit/28c5cf9fd3f51f5a0ade7f174e9ebefbfebf8b3e))
* 계정 설정 페이지 UI 개선 ([880fed3](https://github.com/SamikBeach/frontend/commit/880fed3e8a86c200ff429b47652bd5a9847efb89))
* 데이터 누락 시 fallback 처리 추가 ([ec20d44](https://github.com/SamikBeach/frontend/commit/ec20d44095f9d6be30ccfc75fff5b96da07a58c0))
* 리뷰 UI 개선 ([1b0226e](https://github.com/SamikBeach/frontend/commit/1b0226ec4245c8cd6fe6e3ac82845bb7c0f52e7d))
* 스타일 수정 ([9e4bda8](https://github.com/SamikBeach/frontend/commit/9e4bda89f81d67293fc6554de4abd5c4e49da46a))
* 스타일 수정 ([94cd1dd](https://github.com/SamikBeach/frontend/commit/94cd1dd51214025e824d27598dfab04c0fc9ecd5))
* 스타일 수정 ([36d9254](https://github.com/SamikBeach/frontend/commit/36d925482e7506e607292b0d1011decb89f6f1e9))
* 스타일 수정 ([d1fc9ad](https://github.com/SamikBeach/frontend/commit/d1fc9adbdc6f720fa42de1301bb1307833adfebe))
* 조건 수정 ([ca14200](https://github.com/SamikBeach/frontend/commit/ca142000b3b6065fc625d2820dfd7c28c448121f))
* 좋아요 버튼 스타일 수정 ([230a112](https://github.com/SamikBeach/frontend/commit/230a112e0d5dfe77ce7e411833c8715ef508afc1))
* 캐러셀 스타일 수정 ([62ef214](https://github.com/SamikBeach/frontend/commit/62ef214de8c6e81e09e7cfd632fa902ba0a2a039))


### Features

* **api:** 비밀번호 변경 API 추가 ([ae479e3](https://github.com/SamikBeach/frontend/commit/ae479e391c2a1eaef0934c691c8db077d41879fc))
* AuthorDialog에 suspense 적용 ([81b91f4](https://github.com/SamikBeach/frontend/commit/81b91f41240089c1865a1202265e8227610c0944))
* **auth:** 계정 삭제 시 로그아웃 처리 추가 ([fe79082](https://github.com/SamikBeach/frontend/commit/fe79082a6025a41ac36afc1651faa0c13c87e8cb))
* book page에 suspense ([cc14bba](https://github.com/SamikBeach/frontend/commit/cc14bba1d93030fb2e270893eb963a6b337e01c2))
* book page에 suspense 적용 ([e977f9a](https://github.com/SamikBeach/frontend/commit/e977f9a6adf5668049c4a3a2a97e6e8e85cc7471))
* Review 컴포넌트에 하단 액션 숨김 기능 추가 ([57b8990](https://github.com/SamikBeach/frontend/commit/57b8990874ca1d8e8f706476112d928af0fb73b0))
* ReviewDialog에 Suspense 적용 ([8c58841](https://github.com/SamikBeach/frontend/commit/8c58841553bc289be870ebf1c54e580650890b0d))
* **settings:** 계정 삭제 API 연동 ([d337b7d](https://github.com/SamikBeach/frontend/commit/d337b7d86c432b797b54c3ef2925f0146edcad89))
* **settings:** 비밀번호 변경 폼 개선 ([b86d8c3](https://github.com/SamikBeach/frontend/commit/b86d8c3a608fef2c2b8ea88b73ac817f47c1bb98))
* **settings:** 설정 페이지 UI 개선 ([e47b2c2](https://github.com/SamikBeach/frontend/commit/e47b2c22b0d8c1902c5893b442e613ca2cc70a96))
* sonner 컴포넌트 추가 ([3c7ab8b](https://github.com/SamikBeach/frontend/commit/3c7ab8b4004a30a388d1e9c8fe86519f05aec277))
* 누락된 Toaster 추가 ([6693200](https://github.com/SamikBeach/frontend/commit/6693200c2f374f6b6cb26a5b32202c767157d4e3))
* 누락된 Toaster 추가 ([1403162](https://github.com/SamikBeach/frontend/commit/1403162b669d731d199d39add89e137a22f35a86))
* 다이얼로그 URL 변경 시 히스토리에 기록되지 않도록 수정 ([023a572](https://github.com/SamikBeach/frontend/commit/023a57256a4b5b2f284d03121d907610f4aef10d))
* 다이얼로그에 페이지로 보기 버튼 추가 ([078a048](https://github.com/SamikBeach/frontend/commit/078a0481d23e68f6462fe91890e837a159d84600))
* 리뷰 300자 초과시 더보기 기능 추가 ([00849bd](https://github.com/SamikBeach/frontend/commit/00849bd63fb84dbe299e28d7936557407c987fe7))
* 유저 히스토리 탭 상태를 URL 쿼리 파라미터와 연동 ([d244c92](https://github.com/SamikBeach/frontend/commit/d244c9210d117d839d363533c564647fd4e2b7da))
* 유저 히스토리 탭을 URL 쿼리 파라미터와 연동 ([11c61b8](https://github.com/SamikBeach/frontend/commit/11c61b84bc82c19e24d525e45ff05ebfdc20f19c))
* 유저 히스토리 탭을 URL 쿼리 파라미터와 연동 ([84e6e27](https://github.com/SamikBeach/frontend/commit/84e6e27f8f67ff8714bf953060ebbae2f8620014))
* 작가 아이템 클릭시 다이얼로그 열기 기능 추가 ([a2c9b3d](https://github.com/SamikBeach/frontend/commit/a2c9b3d912bdcae7e287db58d97b73f0172202f4))
* 작가 좋아요 기능 구현 ([0887b2b](https://github.com/SamikBeach/frontend/commit/0887b2b90f5f4e9bea8c6a80bf2dab90393d38ed))
* 작가 페이지 구현 ([8455f4a](https://github.com/SamikBeach/frontend/commit/8455f4abca5435325b5bb8a274b361deb9ebcbc1))
* 작가의 책 목록 API 연동 ([c18ef15](https://github.com/SamikBeach/frontend/commit/c18ef153833219f597e847266d789f5a320ec08b))
* 좋아요한 책과 작가 목록에 무한 스크롤 추가 ([061043e](https://github.com/SamikBeach/frontend/commit/061043e8da41a07cfe5e2da2c9f29bdda8a86d55))
* 책 페이지 구현 ([aa79968](https://github.com/SamikBeach/frontend/commit/aa799686e48458d429e49fdc66a524e2088df924))
* 책 페이지 컴포넌트들에 Suspense 적용 ([e3f6159](https://github.com/SamikBeach/frontend/commit/e3f6159a7a1c83b05c3360183f0575a41a5a9b8f))

# [1.37.0](https://github.com/SamikBeach/frontend/compare/1.36.0...1.37.0) (2025-01-11)


### Bug Fixes

* fix lint ([f087df0](https://github.com/SamikBeach/frontend/commit/f087df0850d0cb65f5d7366757a59f86e1bd3ca0))
* fix lint ([2ac5028](https://github.com/SamikBeach/frontend/commit/2ac5028a90ae8ca25d6d35ea4b394ff385971ab5))
* fix type errors ([2f9584f](https://github.com/SamikBeach/frontend/commit/2f9584f883ee39f65985bc81bb60d25d88b5a5ab))
* fix type errors ([d0fc76c](https://github.com/SamikBeach/frontend/commit/d0fc76c5f5f50f22b1042f16b1c1486a0c616cd5))
* fix type errors ([bf19260](https://github.com/SamikBeach/frontend/commit/bf1926087d48544cb50fc60339e99e6fc6eafb63))
* updateQueryParams시 router.push scroll option false로 설정 ([da82478](https://github.com/SamikBeach/frontend/commit/da824780b62594ccb1a458f4659274c0ff531763))


### Features

* **api:** 관련 책 목록 API 엔드포인트 분리 ([a93bfc3](https://github.com/SamikBeach/frontend/commit/a93bfc3020c8690136e67d25e240a5b447f1a19b))
* BookDialog 데이터 연동 구현 ([9e285e4](https://github.com/SamikBeach/frontend/commit/9e285e4ee6b5f735dd151f9effc20b3f86e6d169))
* books 페이지 구조를 활용한 authors 페이지 구현 ([155f91c](https://github.com/SamikBeach/frontend/commit/155f91cc511bd7fc603d4c1852853157d41e5b64))
* **dialog:** 관련 책 클릭 시 현재 다이얼로그에서 책 정보 변경 ([15bf225](https://github.com/SamikBeach/frontend/commit/15bf2253730bfd5225ccfc04952f5ef9b4b95cb9))
* **dialog:** 다이얼로그 상태 관리 개선 ([ec56494](https://github.com/SamikBeach/frontend/commit/ec56494012ce4e70dc49e28bc2c18c35b00aa42e))
* **dialog:** 리뷰 다이얼로그에 URL 쿼리 파라미터 연동 추가 ([fbcd25a](https://github.com/SamikBeach/frontend/commit/fbcd25a643dbb4c68ab307a6d9c7de38d83a8fb2))
* LikeButton과 CommentButton 컴포넌트 분리 ([b5e3adf](https://github.com/SamikBeach/frontend/commit/b5e3adf61409f40d517804c4fac82cea7e23ea86))
* Searchbar에 디바운스 적용 ([88c16cb](https://github.com/SamikBeach/frontend/commit/88c16cb91d856ca0455dbda1aadfa06e7924526a))
* 작가 영문명 필드 추가 ([0ae2019](https://github.com/SamikBeach/frontend/commit/0ae2019c8af47e7dd7015bf7961c73071cf6718c))
* 책 다이얼로그에 리뷰 목록 스크롤 기능 추가 ([b31076e](https://github.com/SamikBeach/frontend/commit/b31076ee565bd91053cacbaf4bc18898b075e708))
* 책 좋아요 토글 시 목록 데이터 동기화 ([d5be497](https://github.com/SamikBeach/frontend/commit/d5be497a7e80b80713e8d251168db5c80979f455))

# [1.36.0](https://github.com/SamikBeach/frontend/compare/1.35.0...1.36.0) (2025-01-10)


### Bug Fixes

* AuthorCombobox 가상화 리스트 재계산 이슈 수정 ([915ebcf](https://github.com/SamikBeach/frontend/commit/915ebcf1f19feeae05dcca8b2f2688755395a352))
* AuthorCommandItem 툴팁 동작하도록 수정 ([228bcce](https://github.com/SamikBeach/frontend/commit/228bcce3cc522b2628186c0087e28a6a08cb6e15))
* **author:** 작가 검색 기능 추가 ([f11b43a](https://github.com/SamikBeach/frontend/commit/f11b43a1dfbfa14c86abab5ae614ec0ee5b4dd9f))
* **books:** Tabs 레이아웃 시프트 방지 ([3d8d7eb](https://github.com/SamikBeach/frontend/commit/3d8d7ebdfee5e12d680634e5cdd92b014818b494))
* fix lint ([bd206d2](https://github.com/SamikBeach/frontend/commit/bd206d2ed6b777e6e9a7bc349c3904ba03ab6ba7))
* fix lint ([891104b](https://github.com/SamikBeach/frontend/commit/891104bda9cfa70abc6820a4077556c228250d6b))
* fix lint ([db32d52](https://github.com/SamikBeach/frontend/commit/db32d528ba38d4537c95f5b449279b679575265d))
* hydration 불일치 해결 ([c5e9589](https://github.com/SamikBeach/frontend/commit/c5e95891c038910ef0f0578ca0348f0aa127c8f7))
* hydration 불일치 해결을 위해 Provider 사용 ([4c2d235](https://github.com/SamikBeach/frontend/commit/4c2d2359226ba63e0fa42d9576b06ff7f42c1c7e))
* Next.js 자동 스크롤 경고 해결 ([635ee65](https://github.com/SamikBeach/frontend/commit/635ee653543eb859a70f529e333261f06686d659))
* SearchBar X 버튼 스타일 수정 ([d9fee6a](https://github.com/SamikBeach/frontend/commit/d9fee6ad070ccec662e06479967eea018e5ac590))
* 가로 스크롤 제거 ([d7f8310](https://github.com/SamikBeach/frontend/commit/d7f8310a472d27aabdeb4c525dee199a9547706e))
* 도서 그리드 뷰 레이아웃 개선 ([c11a34c](https://github.com/SamikBeach/frontend/commit/c11a34cf7bd78e1f58949f6f9db2b4a8d275e77c))
* 렌더링 중 상태 업데이트 에러 수정 ([75ad268](https://github.com/SamikBeach/frontend/commit/75ad2680fd4669092a7bd6e8dc506b3ebcd2ba34))
* 스켈레톤 개수 수정 ([56457a6](https://github.com/SamikBeach/frontend/commit/56457a69a8d048764c036ef3090a830e19b6ece3))
* 스타일 수정 ([0254565](https://github.com/SamikBeach/frontend/commit/0254565aa73f3a895dd51a3654769b311f0024c2))
* 책 목록 필터링 API 파라미터 수정 ([aa6c315](https://github.com/SamikBeach/frontend/commit/aa6c31569711c40cc9ae124440dd7a9feb9f6b17))
* 책 목록 필터링 기능 복구 ([9dd9826](https://github.com/SamikBeach/frontend/commit/9dd98266b1dcb61a1617524dba734b475a476a06))


### Features

* **author:** AuthorCombobox 가상화 적용 ([ada617f](https://github.com/SamikBeach/frontend/commit/ada617f21949c433e79d803fdc636f4af18e077c))
* AuthorCombobox 개선 ([014e506](https://github.com/SamikBeach/frontend/commit/014e506dcd7f801d9691b4d7025aacd878175321))
* axios 주석 보강 ([76c9b3b](https://github.com/SamikBeach/frontend/commit/76c9b3b63c1f9e28e9ed4024e14b96abadc5301d))
* Empty 컴포넌트 추가 ([b482325](https://github.com/SamikBeach/frontend/commit/b482325495648353f2311d4718821110bc2dc888))
* shadcn popover, command 설치 ([8e880e1](https://github.com/SamikBeach/frontend/commit/8e880e142c00db43890a744005e43702bf414f92))
* tooltip ui 컴포넌트 추가 ([48a9549](https://github.com/SamikBeach/frontend/commit/48a9549d2bba25ec22da3cfcd6fa4987c2d04cce))
* useTextTruncated 훅 추가 ([ce73663](https://github.com/SamikBeach/frontend/commit/ce7366311eea1cc1578b7653b13225d9105bab94))
* 댓글 버튼 클릭시 댓글 영역으로 스크롤 처리 ([631c4fc](https://github.com/SamikBeach/frontend/commit/631c4fcd9f0ab0f0b7fbe143599cd649fcea5caa))
* 도서 검색 입력에 디바운스 추가 ([b07873f](https://github.com/SamikBeach/frontend/commit/b07873fc8fb2a30ef5cfc64f834ba3099ef0d211))
* 도서 목록 스켈레톤 UI 구현 ([24dbf2d](https://github.com/SamikBeach/frontend/commit/24dbf2d7c61c7ee622594ea08d9b839459f78c30))
* 도서 목록 페이지 UI/UX 개선 ([405e54f](https://github.com/SamikBeach/frontend/commit/405e54feee22758a08da3eb49fc6cd640be2805f))
* 도서 목록 페이지 구현 ([14aea4f](https://github.com/SamikBeach/frontend/commit/14aea4f4f4bf8cc66c52bd362bf5b16736e873a4))
* 작가 선택 Combobox 구현 ([a6d84d4](https://github.com/SamikBeach/frontend/commit/a6d84d44f0ed1b36f1f19163182e6ed7ce6b36cf))
* 작가 필터 URL query param 연동 ([9f3d0de](https://github.com/SamikBeach/frontend/commit/9f3d0dea4a22a5428a77b15f770b4ea2a8a49180))
* 작가 필터 결과 없을 때 Empty 상태 추가 ([062fead](https://github.com/SamikBeach/frontend/commit/062feadb1b26349979cbcb3957939ed9c1fff5df))
* 작가 필터 기능 추가 ([8ff1a14](https://github.com/SamikBeach/frontend/commit/8ff1a1411d962dddab304d117057f7c973a0fcb2))
* 좋아요 버튼 스타일 개선 ([6c49f0e](https://github.com/SamikBeach/frontend/commit/6c49f0e408b4162c617fab07a1ff19316d406220))
* 책 검색 기능 구현 ([70b0609](https://github.com/SamikBeach/frontend/commit/70b0609b77fe0596a55ef68d071c808a8f85861c))

# [1.35.0](https://github.com/SamikBeach/frontend/compare/1.34.0...1.35.0) (2025-01-09)


### Bug Fixes

* fix lint ([737e927](https://github.com/SamikBeach/frontend/commit/737e927747d3148abcdd02d61949ad0ef27015ef))
* 날짜 형식 수정 ([9e1c95f](https://github.com/SamikBeach/frontend/commit/9e1c95f73d641fc105c8be3c58b6c0afd0fca525))
* 로딩 처리 개선 ([78adae3](https://github.com/SamikBeach/frontend/commit/78adae3c2c9875a006b673b10756332356584da2))
* 버튼 호버 스타일 수정 ([b89ad9d](https://github.com/SamikBeach/frontend/commit/b89ad9d934eb23983d0221720bfd2ecd61839a98))
* 스켈레톤 스타일 조정 ([098b158](https://github.com/SamikBeach/frontend/commit/098b1582eb824513cc9e9c41df5fe677d252ddbb))


### Features

* accessToken을 localStorage로 관리 ([ba2259b](https://github.com/SamikBeach/frontend/commit/ba2259b544bc362bb9a9da4f104a2b2e0c8cb787))
* Initializer fetch retry 하지 않도록 ([afeb524](https://github.com/SamikBeach/frontend/commit/afeb5245c31aaa0369bf75b8737f95a07462e2b7))
* 리뷰 좋아요 토글 기능 추가 ([c19ae7f](https://github.com/SamikBeach/frontend/commit/c19ae7f22924fa6f54a7222dc48aefc7161adcf7))
* 인증 상태 초기화 로직 추가 ([e2b68cb](https://github.com/SamikBeach/frontend/commit/e2b68cba7ad75f83551442db084c200136b41beb))
* 토큰 갱신 로직 추가(axios 응답 인터셉터) ([3d52084](https://github.com/SamikBeach/frontend/commit/3d52084a0730e78f40e06248d8bb5c4c7292ec30))

# [1.34.0](https://github.com/SamikBeach/frontend/compare/1.33.0...1.34.0) (2025-01-09)


### Bug Fixes

* FeedList skeleton 스타일 조정 ([da385b2](https://github.com/SamikBeach/frontend/commit/da385b23667004e07e2c5f44f81fa99727d9dbfb))
* FeedList suspense로 로딩 처리 ([7d9c393](https://github.com/SamikBeach/frontend/commit/7d9c393896f00cf30958e188ef8f51d39cb5b0f2))
* fix type errors ([95d0709](https://github.com/SamikBeach/frontend/commit/95d0709c06aa8dcd75a6420a487953c9b6219bb6))
* fix type errors ([27509b3](https://github.com/SamikBeach/frontend/commit/27509b395e4b871f3e9a13d841abb8bc100de595))
* ReivewDialog 스타일 개선 ([4f6ad8f](https://github.com/SamikBeach/frontend/commit/4f6ad8f676edc9f5e40550b7f8dfc91b6b97fb05))
* ReviewDialog 내 무한스크롤 동작하도록 수정 ([2333e74](https://github.com/SamikBeach/frontend/commit/2333e746d6b187ccce7d120a1caf05fad07be014))
* ReviewDialog 스타일 조정 ([1b34f99](https://github.com/SamikBeach/frontend/commit/1b34f9970dd9ff138cbafb48210bfda26ec97f80))
* SearchBar Content 간격 조정 ([e32ef3f](https://github.com/SamikBeach/frontend/commit/e32ef3fc1d9a408b8fd824bc0a923809defad089))
* SearchBarDialog 스타일 수정 ([e49d1b8](https://github.com/SamikBeach/frontend/commit/e49d1b84a0bf7eec7d93b6485c061a71fe4b7116))
* 무한 스크롤 fetch 조건 수정 ([a0309ad](https://github.com/SamikBeach/frontend/commit/a0309ad40d1efab62f377641fcf927e563241c9e))
* 스타일 수정 ([f232d9f](https://github.com/SamikBeach/frontend/commit/f232d9f90b3d43116bb9cb53b74a3c78b17cbac3))


### Features

* CommentSkeleton 추가 ([15f834d](https://github.com/SamikBeach/frontend/commit/15f834d86dc76ed96066b50d9de43abd36c5944b))
* EmptyComments 추가 ([41b6754](https://github.com/SamikBeach/frontend/commit/41b67549ab130907d903ebffd06e6d50c9cf50a7))
* Feed UI 디테일 및 API 연동 ([3f341a7](https://github.com/SamikBeach/frontend/commit/3f341a79fd2c72ff5e0c1a409a5d377368f780a5))
* formatDate 유틸 함수 분리 ([0f6f300](https://github.com/SamikBeach/frontend/commit/0f6f3003a67f5451855a91680ae5d041c1508467))
* ReviewDialog API 연동 ([9f02b16](https://github.com/SamikBeach/frontend/commit/9f02b161f33303175ebf40c58e40037fa74c15fe))
* ReviewDialog 로딩처리 개선 ([322aaf7](https://github.com/SamikBeach/frontend/commit/322aaf7c8325c372af7a3299a824f0c35a12a683))
* search feed api 연동 ([e33fbea](https://github.com/SamikBeach/frontend/commit/e33fbea4580856b680d9682fecef2182aa7bf9a1))
* 내 리뷰에서만 피드 더보기 버튼 노출 ([9b4d4cb](https://github.com/SamikBeach/frontend/commit/9b4d4cb259192843e7f91cc55edb539e1ae1c887))
* 로그인시 유저 정보 저장 ([68791c7](https://github.com/SamikBeach/frontend/commit/68791c7d87d992cb426a9499210fa8fd06d25bab))

# [1.33.0](https://github.com/SamikBeach/frontend/compare/1.32.0...1.33.0) (2025-01-08)


### Bug Fixes

* fix type errors ([9ffc742](https://github.com/SamikBeach/frontend/commit/9ffc742ab2fca44d11784102d8d6623eda0df6a7))
* 불필요한 코드 제거 ([d17ceaf](https://github.com/SamikBeach/frontend/commit/d17ceaf779bfd7f488594373166b04647a44eea7))


### Features

* @react-oauth/google, @tanstack/react-query 설치 ([2cf100b](https://github.com/SamikBeach/frontend/commit/2cf100b80e8c9400adb9c7fc04db768f238829e9))
* API 호출 함수 정의 ([7631bc9](https://github.com/SamikBeach/frontend/commit/7631bc9c37aa497f7571f2264f920a0a860e3406))
* google login API 연동 ([6c8de8c](https://github.com/SamikBeach/frontend/commit/6c8de8c876d9dd131d733e0a724fac131685eeb7))
* 구글 회원가입 로직 구현 ([9a2fe0b](https://github.com/SamikBeach/frontend/commit/9a2fe0b8856e6e225b7ace34100bcd9d4843a87d))
* 로그인, 회원가입 폼 RHF 연동 ([018bf38](https://github.com/SamikBeach/frontend/commit/018bf38e8e01567f702e800580760b4248ebc8d9))
* 스타일 수정 ([13750f3](https://github.com/SamikBeach/frontend/commit/13750f39f433a6328d7dcb7e38f635eb0c64bce0))
* 이메일 로그인 구현 ([a84e0d1](https://github.com/SamikBeach/frontend/commit/a84e0d10c43dca6632f4849be4c4edef350a382c))
* 이메일 회원가입 구현 ([90e79bb](https://github.com/SamikBeach/frontend/commit/90e79bbc4bdf2e962fa652322a532427e4fe7b75))
* 토큰 갱신 로직 추가 ([011155f](https://github.com/SamikBeach/frontend/commit/011155f18532ffc9b7937f0255935f258a8ed5f5))
* 토큰 관리 atom 및 토큰 리프레시 로직 추가 ([0ce5bea](https://github.com/SamikBeach/frontend/commit/0ce5bea9a4164d2f766600efa2a03a55f5141667))

# [1.32.0](https://github.com/SamikBeach/frontend/compare/1.31.0...1.32.0) (2025-01-07)


### Bug Fixes

* Mention "@"로만 트리거 되도록 수정 ([b6e2f58](https://github.com/SamikBeach/frontend/commit/b6e2f587685b1eeb7827cddf2911f33d3488d400))
* 아무거나 수정(dev branch 테스트) ([a314e09](https://github.com/SamikBeach/frontend/commit/a314e093ca22faa0f908ae4c540ac5ed733676fb))
* 아무거나 수정2(dev branch 테스트) ([f8285b7](https://github.com/SamikBeach/frontend/commit/f8285b7d1cadeab833ba59dba7ed008cbff7b7b1))
* 이것저것 소소한 수정 ([ca95f90](https://github.com/SamikBeach/frontend/commit/ca95f90aba2fb93efb303e21a443034222e37978))


### Features

* CommentEditor UI 초안 ([4b0ba33](https://github.com/SamikBeach/frontend/commit/4b0ba33c207d9de8f3ba94fcbcff116632d2a5cb))
* CommentEditor에 멘션 기능 추가 ([3cb9085](https://github.com/SamikBeach/frontend/commit/3cb90857c1cfc11487083fffb0ea6d8c3f64a5dc))
* Lexical 에디터 초안 ([88f8965](https://github.com/SamikBeach/frontend/commit/88f8965f30c53d099908b54b6e0d02697c8a7439))
* lexical 패키지 설치 ([06f1755](https://github.com/SamikBeach/frontend/commit/06f17555653f29840f4eabcd22aac973a94bc9da))
* ReviewDialog 하단에 CommentEditor 고정 ([7a11365](https://github.com/SamikBeach/frontend/commit/7a113658718d2e0e54950768d01cf6e942a7581d))
* User 페이지 UI ([1125bcb](https://github.com/SamikBeach/frontend/commit/1125bcb2e0a0387492a98e4d829c0894426eb94f))
* UserHistory 디자인 디테일 ([a0b93f3](https://github.com/SamikBeach/frontend/commit/a0b93f35e12650a9fb3af5e54c289eb8f40b19c5))
* WriteReviewDialog 추가 ([ff23c87](https://github.com/SamikBeach/frontend/commit/ff23c87741d98e45a6a7df1ea3b38bc9dd2fad2c))
* 각 다이얼로그 및 페이지에 review list 추가 ([aecc64b](https://github.com/SamikBeach/frontend/commit/aecc64bd3a126036a228cf7b18346ee7fcf3ab1f))
* 개인정보 설정 페이지 추가 ([baddb5e](https://github.com/SamikBeach/frontend/commit/baddb5ec743fe3c5985ad55013592103c61f817a))

# [1.31.0](https://github.com/SamikBeach/frontend/compare/1.30.0...1.31.0) (2025-01-06)


### Features

* Comment UI 추가 ([b602086](https://github.com/SamikBeach/frontend/commit/b602086b461a5d34fb65310cd5f4769642c6fc56))

# [1.30.0](https://github.com/SamikBeach/frontend/compare/1.29.0...1.30.0) (2025-01-06)


### Bug Fixes

* Carousel slidesToScroll 옵션 추가 ([8dd5e90](https://github.com/SamikBeach/frontend/commit/8dd5e90dda075149ba4be0cf1d9c1be1131a0dfc))
* fix lint ([f2c9d0f](https://github.com/SamikBeach/frontend/commit/f2c9d0f933e007fe25ff90de09da636082759ece))


### Features

* Author page UI 추가 ([c5a2871](https://github.com/SamikBeach/frontend/commit/c5a2871ca69bd5b86533fd8f6994c12626888d40))
* AuthorDialog 추가 ([604ee17](https://github.com/SamikBeach/frontend/commit/604ee17ab3b7fb7a323e213f2f99d97c7524fd66))
* book 상세 페이지지 UI 추가 ([d8327fc](https://github.com/SamikBeach/frontend/commit/d8327fc9e53b9f46111953ee05e7e928347c8d04))
* carousel 컴포넌트 추가 ([5c5507b](https://github.com/SamikBeach/frontend/commit/5c5507b90920da5ec5efaf947600fe38f1641458))
* RelativeBooks UI 추가 ([2a28ebb](https://github.com/SamikBeach/frontend/commit/2a28ebbc3193b14a28da2c3e548112d54bf53f3f))
* 이 책의 다른 번역서 캐러셀 적용 ([1b85809](https://github.com/SamikBeach/frontend/commit/1b85809a7253cdc579d1f3ab37fabcb2dd094f25))

# [1.29.0](https://github.com/SamikBeach/frontend/compare/1.28.0...1.29.0) (2025-01-06)


### Features

* BookDialog UI 초안 ([713dd45](https://github.com/SamikBeach/frontend/commit/713dd45e80c7f13347c7734ce982f1a0fe176f87))

# [1.28.0](https://github.com/SamikBeach/frontend/compare/1.27.0...1.28.0) (2025-01-06)


### Features

* AuthorList, AuthorItem UI 추가 ([9adf339](https://github.com/SamikBeach/frontend/commit/9adf339af2924404d98cd8eb841356bf7af32f7e))

# [1.27.0](https://github.com/SamikBeach/frontend/compare/1.26.0...1.27.0) (2025-01-06)


### Features

* BookItem 호버효과 ([e39c2a2](https://github.com/SamikBeach/frontend/commit/e39c2a20249200cb59c0da340948392623ebe635))
* BookListItem UI 추가 ([013ea38](https://github.com/SamikBeach/frontend/commit/013ea38d09c2ac22b6f0b2d3af9a88b9986335d7))
* Tabs UI 좀 더 깔끔하게 정리 ([bb1fcfd](https://github.com/SamikBeach/frontend/commit/bb1fcfd9fe4c420badb864587fec4f445aab4b9f))

# [1.26.0](https://github.com/SamikBeach/frontend/compare/1.25.0...1.26.0) (2025-01-06)


### Features

* BookItem UI 추가 ([f870c20](https://github.com/SamikBeach/frontend/commit/f870c20f7c80a8fe205883c61de2f2a4da606874))
* Tabs를 상단에 고정 ([39a795b](https://github.com/SamikBeach/frontend/commit/39a795bc43ac3ccc6993a0e8d5a3833ab55bc16c))

# [1.25.0](https://github.com/SamikBeach/frontend/compare/1.24.2...1.25.0) (2025-01-06)


### Features

* BookList, BigBookItem UI 추가 ([2890b65](https://github.com/SamikBeach/frontend/commit/2890b657ffdbc283b54c9eb92094e908163bd719))

## [1.24.2](https://github.com/SamikBeach/frontend/compare/1.24.1...1.24.2) (2025-01-05)


### Bug Fixes

* main 섹션 레이아웃 수정 ([2753477](https://github.com/SamikBeach/frontend/commit/2753477c2c43b7bdbc1c676402f38ce21cdeb3b3))

## [1.24.1](https://github.com/SamikBeach/frontend/compare/1.24.0...1.24.1) (2025-01-05)


### Bug Fixes

* LeftSidebar fixed 처리 ([8d5643a](https://github.com/SamikBeach/frontend/commit/8d5643a468d3cb9eaba7bb1122ea3c7d71c59893))

# [1.24.0](https://github.com/SamikBeach/frontend/compare/1.23.1...1.24.0) (2025-01-05)


### Features

* Books page header UI 추가 ([67cbdab](https://github.com/SamikBeach/frontend/commit/67cbdabd7b2798575441b3b9cb169c9fe32c921a))

## [1.23.1](https://github.com/SamikBeach/frontend/compare/1.23.0...1.23.1) (2025-01-05)


### Bug Fixes

* 레이아웃 스타일 수정 ([7f9445b](https://github.com/SamikBeach/frontend/commit/7f9445bed16235dca71584617f7fd180f18b6314))

# [1.23.0](https://github.com/SamikBeach/frontend/compare/1.22.0...1.23.0) (2025-01-05)


### Bug Fixes

* FeedList 스타일 수정 ([c48d457](https://github.com/SamikBeach/frontend/commit/c48d457a405aafbb51c743cd4d06a198d8372577))
* FeedList를 client component로 ([aa2b3c1](https://github.com/SamikBeach/frontend/commit/aa2b3c1e61991f988bffd92bf75a7dda4c93ea7f))
* fix warning & errors ([1eb35dc](https://github.com/SamikBeach/frontend/commit/1eb35dc43a7c8c4e05fe49e5be87486c801b715a))
* LeftSidebar 스타일 수정 ([1dae81e](https://github.com/SamikBeach/frontend/commit/1dae81ee5822a24161ffa8e4f710b48a170b5727))


### Features

* alert-dialog 설치 ([ee9a9b2](https://github.com/SamikBeach/frontend/commit/ee9a9b21082666d266337e45dbd4a27c6904383b))
* EditDropdownMenu 추가 ([ab5c3b1](https://github.com/SamikBeach/frontend/commit/ab5c3b12e851953eb0684510394955f2c609973d))
* Feed DeleteConfirmDialog 추가 ([acf933a](https://github.com/SamikBeach/frontend/commit/acf933a3f6d978a3d683ff44419a6d406888ec53))
* Feed UI 리디자인 ([21f721f](https://github.com/SamikBeach/frontend/commit/21f721fb6cf97c9265505238e7d660b0529ee08c))
* ReviewDialog 뼈대 구현 ([ef3bf63](https://github.com/SamikBeach/frontend/commit/ef3bf63d86aedaffe970f54598abe36e6928c2f5))
* ReviewDialog 컨텐츠 디자인 ([520143d](https://github.com/SamikBeach/frontend/commit/520143d9ff24186f58084c3e0fe9545e95687e17))
* ReviewDialog에 좋아요, 댓글 버튼 추가 ([f3c20cd](https://github.com/SamikBeach/frontend/commit/f3c20cd5d6cc6ec1ac11f39ede79c0bc5874d1ea))
* tabs ui 추가 및 Feed에 탭 적용 ([46aeaae](https://github.com/SamikBeach/frontend/commit/46aeaaede67c1d75659078192a98a5a154d04616))

# [1.22.0](https://github.com/SamikBeach/frontend/compare/1.21.0...1.22.0) (2025-01-05)


### Features

* SignUpForm 추가 ([0a5517c](https://github.com/SamikBeach/frontend/commit/0a5517ca811ffa72dcffe9f8e1fc6675c6e60df1))

# [1.21.0](https://github.com/SamikBeach/frontend/compare/1.20.1...1.21.0) (2025-01-05)


### Features

* LoginDialog 내 LoginForm 리디자인 ([6d5a56b](https://github.com/SamikBeach/frontend/commit/6d5a56b5408a6ab174b332b2e2a07361c2aec731))

## [1.20.1](https://github.com/SamikBeach/frontend/compare/1.20.0...1.20.1) (2025-01-05)


### Bug Fixes

* AuthorItem 스타일 수정 ([ea11d2e](https://github.com/SamikBeach/frontend/commit/ea11d2e0529f13b338d86ee7b89cdfac245dd7f5))

# [1.20.0](https://github.com/SamikBeach/frontend/compare/1.19.0...1.20.0) (2025-01-05)


### Features

* LoginDialog 리디자인 ([8a2d970](https://github.com/SamikBeach/frontend/commit/8a2d9702e8a852b100408a76bc70d3b18eb3de51))

# [1.19.0](https://github.com/SamikBeach/frontend/compare/1.18.1...1.19.0) (2025-01-05)


### Bug Fixes

* 누락된 index.ts 파일 추가 ([cd77864](https://github.com/SamikBeach/frontend/commit/cd778644cdf2dc3c3255847b12b58a54c2ead873))


### Features

* SearchBar, SearchBarDialog 리디자인 ([8e9e8d4](https://github.com/SamikBeach/frontend/commit/8e9e8d48a59d491207c64b6d71faa17439a161ea))
* 최근 검색 목록 표시 ([b4e5ebf](https://github.com/SamikBeach/frontend/commit/b4e5ebf17e6f1b21f101174aa25a6b55e0a8ea8b))

## [1.18.1](https://github.com/SamikBeach/frontend/compare/1.18.0...1.18.1) (2025-01-04)


### Bug Fixes

* LeftSidebar absoulte 처리 ([2f22731](https://github.com/SamikBeach/frontend/commit/2f22731bcb59ca2aa9e6d403b7a1b5d1b7cde461))

# [1.18.0](https://github.com/SamikBeach/frontend/compare/1.17.0...1.18.0) (2025-01-04)


### Features

* books, authors 페이지 추가 ([e72b303](https://github.com/SamikBeach/frontend/commit/e72b303ba65b2116579e158ea1291618481fce38))

# [1.17.0](https://github.com/SamikBeach/frontend/compare/1.16.0...1.17.0) (2025-01-03)


### Features

* Feed UI detail 수정 ([0245b13](https://github.com/SamikBeach/frontend/commit/0245b13c4a138ad675f7e08df01737f8526f0051))

# [1.16.0](https://github.com/SamikBeach/frontend/compare/1.15.0...1.16.0) (2025-01-02)


### Features

* Feed UI 초안 ([5749989](https://github.com/SamikBeach/frontend/commit/57499892867021c407da12cd7cab9d7951dbeb90))

# [1.15.0](https://github.com/SamikBeach/frontend/compare/1.14.2...1.15.0) (2025-01-01)


### Bug Fixes

* Header style 수정 ([65de3e4](https://github.com/SamikBeach/frontend/commit/65de3e4c330eea024023c2605d529bcaa4bd204d))


### Features

* LeftSidebar MenuItem에 링크 추가 ([b5f04e4](https://github.com/SamikBeach/frontend/commit/b5f04e48feb01dbd7b30619aa70ae25b23ce3870))

## [1.14.2](https://github.com/SamikBeach/frontend/compare/1.14.1...1.14.2) (2024-12-25)


### Bug Fixes

* SearchBarContent UI 수정 ([f36802a](https://github.com/SamikBeach/frontend/commit/f36802a6e95a1cafeb9ba2f0ed1877883725ab3e))

## [1.14.1](https://github.com/SamikBeach/frontend/compare/1.14.0...1.14.1) (2024-12-24)


### Bug Fixes

* SearchBarContent UI 수정 ([0b439b2](https://github.com/SamikBeach/frontend/commit/0b439b2ed8cd0ee052377b9f24186ffe5f96e528))

# [1.14.0](https://github.com/SamikBeach/frontend/compare/1.13.0...1.14.0) (2024-12-23)


### Features

* SearchBarContent 컴포넌트 추가 ([71845fb](https://github.com/SamikBeach/frontend/commit/71845fb9f7d6dd257c2848729aada4aabebfa65b))

# [1.13.0](https://github.com/SamikBeach/frontend/compare/1.12.0...1.13.0) (2024-12-22)


### Features

* LoginDialog에 있는 메세지 다국어 처리 ([598adc9](https://github.com/SamikBeach/frontend/commit/598adc9f113b880f8bf914058a8ab774e2840ea9))

# [1.12.0](https://github.com/SamikBeach/frontend/compare/1.11.0...1.12.0) (2024-12-22)


### Features

* LoginModal에 회원가입 UI 추가 ([3101cad](https://github.com/SamikBeach/frontend/commit/3101cad9b2cfcbe67832175d3e13ec2d4273683b))
* messages 디렉토리 추가 및 일부 다국어 적용 ([520facc](https://github.com/SamikBeach/frontend/commit/520faccce1d84086fca6892899a1f488bba32a2e))
* next intl request config 추가 & 루트에 NextIntlClientProvider 적용 ([a84af7d](https://github.com/SamikBeach/frontend/commit/a84af7d9f9d0a5380b16b709fd9f5c8dc03cdc91))
* next-intl 패키지 추가 ([4568d0e](https://github.com/SamikBeach/frontend/commit/4568d0e91329e53d7ebf48990cd3c2f7ed3158d2))
* next.config.mjs 추가 및 nextintl plugin 설치 ([4f1f71e](https://github.com/SamikBeach/frontend/commit/4f1f71e04144675ee5b3d9b336029e674aefcc60))

# [1.11.0](https://github.com/SamikBeach/frontend/compare/1.10.0...1.11.0) (2024-12-21)


### Features

* LoginDialog 컴포넌트 추가 ([276763b](https://github.com/SamikBeach/frontend/commit/276763bc6e118b00fa12ca6fafde6dd081bd269d))

# [1.10.0](https://github.com/SamikBeach/frontend/compare/1.9.0...1.10.0) (2024-12-20)


### Features

* Header에 로그인 버튼 추가 ([9aaeb8f](https://github.com/SamikBeach/frontend/commit/9aaeb8f3c0ac62964be06f32c7e81b3b7f494aa7))

# [1.9.0](https://github.com/SamikBeach/frontend/compare/1.8.0...1.9.0) (2024-12-19)


### Features

* 로고에 링크 추가 ([70a4563](https://github.com/SamikBeach/frontend/commit/70a4563a5e8abd96c57319eb2db78be7d44eb013))

# [1.8.0](https://github.com/SamikBeach/frontend/compare/1.7.0...1.8.0) (2024-12-18)


### Features

* LeftSidebar style 수정 ([70a3bc1](https://github.com/SamikBeach/frontend/commit/70a3bc1780c6b3b077fac5899db7b44c0a245dd4))

# [1.7.0](https://github.com/SamikBeach/frontend/compare/1.6.1...1.7.0) (2024-12-17)


### Features

* LeftSideBar 컴포넌트 추가 ([0fbab4e](https://github.com/SamikBeach/frontend/commit/0fbab4e8a3464ac59b90f810ab0ab5fd60efe99a))

## [1.6.1](https://github.com/SamikBeach/frontend/compare/1.6.0...1.6.1) (2024-12-16)


### Bug Fixes

* ElementRef -> ComponentRef ([399fb09](https://github.com/SamikBeach/frontend/commit/399fb094a70152668160487d7fec9e9940d78ebe))

# [1.6.0](https://github.com/SamikBeach/frontend/compare/1.5.1...1.6.0) (2024-12-15)


### Features

* Header RightSlot 커서 스타일 수정 ([7462948](https://github.com/SamikBeach/frontend/commit/7462948a59ff405e0d587a113a2992be6ac01b55))

## [1.5.1](https://github.com/SamikBeach/frontend/compare/1.5.0...1.5.1) (2024-12-13)


### Bug Fixes

* SearchBar DialogTrigger에 asChild 추가 ([5139df9](https://github.com/SamikBeach/frontend/commit/5139df92d508851562710c030dd7774cab99e6e8))

# [1.5.0](https://github.com/SamikBeach/frontend/compare/1.4.0...1.5.0) (2024-12-13)


### Features

* SearchBar Input을 Button으로 바꾸기 ([62003ef](https://github.com/SamikBeach/frontend/commit/62003ef2a744d01242a2a58603373770b0743737))

# [1.4.0](https://github.com/SamikBeach/frontend/compare/1.3.0...1.4.0) (2024-12-13)


### Bug Fixes

* fix lint ([1760065](https://github.com/SamikBeach/frontend/commit/1760065919ecdec0803d17dc9b323d91692eff33))


### Features

* react-sacn script 추가 ([62b9f8a](https://github.com/SamikBeach/frontend/commit/62b9f8a9de07292662f23a106a31e0345c742d96))
* SearchBar 스타일 수정 ([2ffee7e](https://github.com/SamikBeach/frontend/commit/2ffee7e0addc75a36bde9c6ca21449c6f2fad47e))
* shadcn Dropdown Menu 컴포넌트 추가 & 아바타 드롭다운 UI 추가 ([f954886](https://github.com/SamikBeach/frontend/commit/f9548869daccd4f6f83376f142a1d0c8d963420c))

# [1.3.0](https://github.com/SamikBeach/frontend/compare/1.2.0...1.3.0) (2024-12-10)


### Features

* SearchBar Input 애니메이션 추가 ([adcc77b](https://github.com/SamikBeach/frontend/commit/adcc77b6b456762e3a7abe898dbf48c7d9493544))

# [1.2.0](https://github.com/SamikBeach/frontend/compare/1.1.0...1.2.0) (2024-12-10)


### Features

* Header 검색 바 및 다이얼로그 UI 레이아웃 잡기 ([7e9c998](https://github.com/SamikBeach/frontend/commit/7e9c99840ad2e29234693ba65ff896e3d923c186))
* prettier-plugin-tailwindcss, prettier-plugin-organize-imports 패키지 설치 및 적용 ([10c8972](https://github.com/SamikBeach/frontend/commit/10c8972aea8ed0abb2cf66fad126d99a659df256))
* shadcn Input, Avatar 컴포넌트 추가(Header 디테일 추가) ([bc460c0](https://github.com/SamikBeach/frontend/commit/bc460c0cf733f35c4430a8d98807eca18bc7ec7e))

# [1.1.0](https://github.com/SamikBeach/frontend/compare/1.0.4...1.1.0) (2024-12-09)


### Features

* Header 레이아웃 잡기 ([9b2621d](https://github.com/SamikBeach/frontend/commit/9b2621d5328ba5a78da6886688048745703d50f6))

## [1.0.4](https://github.com/SamikBeach/frontend/compare/1.0.3...1.0.4) (2024-12-09)

## [1.0.3](https://github.com/SamikBeach/frontend/compare/1.0.2...1.0.3) (2024-12-09)


### Bug Fixes

* .releaserc 수정 ([8e53153](https://github.com/SamikBeach/frontend/commit/8e53153d925cf3439fa3ea53a00156e096344268))

## [1.0.2](https://github.com/SamikBeach/frontend/compare/1.0.1...1.0.2) (2024-12-05)


### Bug Fixes

* devDependencies -> dependencies(semantic-release package) ([0888026](https://github.com/SamikBeach/frontend/commit/0888026b416ed603624b106be857c87e1fd93cec))
* release.yml name 수정 ([bc0f887](https://github.com/SamikBeach/frontend/commit/bc0f887a10cf984a43bc4ae65a0e4e77bb0fbc05))

## [1.0.1](https://github.com/SamikBeach/frontend/compare/1.0.0...1.0.1) (2024-12-05)


### Bug Fixes

* packageManger 버전 명시하고 release.yml 수정 ([f154315](https://github.com/SamikBeach/frontend/commit/f15431564fb4136c82a9f0b4832f4359fe4456fa))

# 1.0.0 (2024-12-05)


### Bug Fixes

* fix typo ([d6f0f9c](https://github.com/SamikBeach/frontend/commit/d6f0f9cda3d4a806f38c35fdf7bc53fa928dbfd3))
* package.json에 packageManager 버전 제거 ([04acac8](https://github.com/SamikBeach/frontend/commit/04acac89e0a3bf86af2779fe1c2b32ffde0eb3b0))
* release.yml 빌드 커맨드 수정 ([6b44e61](https://github.com/SamikBeach/frontend/commit/6b44e61b6d5ca3aa2ac44cd813cf94f1e184eb58))
