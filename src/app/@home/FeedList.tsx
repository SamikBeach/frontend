'use client';

import { Feed } from '@/components/Feed';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useState } from 'react';

export default function FeedList() {
  const [tab, setTab] = useState<'popular' | 'recent'>('popular');

  return (
    <Tabs
      value={tab}
      onValueChange={value => setTab(value as 'popular' | 'recent')}
      className="my-3"
    >
      <TabsList>
        <TabsTrigger value="popular">인기순</TabsTrigger>
        <TabsTrigger value="recent">최신순</TabsTrigger>
      </TabsList>
      <TabsContent value="popular">
        <Feed />
        <Feed />
        <Feed />
        <Feed />
      </TabsContent>
      <TabsContent value="recent">
        <Feed />
        <Feed />
        <Feed />
        <Feed />
      </TabsContent>
    </Tabs>
  );
}
