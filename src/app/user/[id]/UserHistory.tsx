import { AuthorItem } from '@/components/AuthorItem';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function UserHistory() {
  return (
    <Tabs defaultValue="review">
      <TabsList>
        <TabsTrigger value="review">리뷰</TabsTrigger>
        <TabsTrigger value="like">좋아요</TabsTrigger>
      </TabsList>
      <TabsContent value="review" className="mt-2 flex flex-col gap-6">
        <BookList />
        <AuthorList />
      </TabsContent>
      <TabsContent value="like" className="mt-0 flex flex-col gap-6">
        <BookList />
        <AuthorList />
      </TabsContent>
    </Tabs>
  );
}

function BookList() {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-lg font-semibold">책</p>
      <div className="flex flex-wrap gap-3">
        {/* <BookGridItem size="small" />
        <BookGridItem size="small" />
        <BookGridItem size="small" />
        <BookGridItem size="small" />
        <BookGridItem size="small" />
        <BookGridItem size="small" />
        <BookGridItem size="small" />
        <BookGridItem size="small" />
        <BookGridItem size="small" />
        <BookGridItem size="small" />
        <BookGridItem size="small" />
        <BookGridItem size="small" />
        <BookGridItem size="small" />
        <BookGridItem size="small" /> */}
      </div>
    </div>
  );
}

function AuthorList() {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-lg font-semibold">작가</p>
      <div className="flex flex-wrap gap-3">
        <AuthorItem size="small" />
        <AuthorItem size="small" />
        <AuthorItem size="small" />
        <AuthorItem size="small" />
        <AuthorItem size="small" />
        <AuthorItem size="small" />
        <AuthorItem size="small" />
      </div>
    </div>
  );
}
