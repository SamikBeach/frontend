'use client';

import { LayoutGridIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { TabsList } from '@/components/ui/tabs';

import { Input } from '@/components/ui/input';
import { Tabs as ShadcnTabs, TabsTrigger } from '@/components/ui/tabs';
import { ChevronDownIcon, ListIcon } from 'lucide-react';
import { useState } from 'react';

export default function Tabs() {
  const [activeCategory, setActiveCategory] = useState('종합');

  const categories = ['종합', '철학', '과학', '경제'];

  return (
    <div className="sticky top-[56px] z-10 flex items-center justify-between bg-white py-4">
      <div className="flex gap-3">
        {categories.map(category => (
          <Button
            key={category}
            onClick={() => setActiveCategory(category)}
            variant="ghost"
            className={`px-0 text-lg font-bold hover:bg-transparent ${
              activeCategory === category ? 'text-black' : 'text-gray-400'
            }`}
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="flex w-[800px] gap-2">
        <Input placeholder="Search" />
        <Button variant="outline">
          작가
          <ChevronDownIcon className="h-4 w-4" />
        </Button>

        <ShadcnTabs defaultValue="popular">
          <TabsList>
            <TabsTrigger value="popular">인기순</TabsTrigger>
            <TabsTrigger value="recent">최신순</TabsTrigger>
            <TabsTrigger value="alphabet">가나다순</TabsTrigger>
          </TabsList>
        </ShadcnTabs>

        <ShadcnTabs defaultValue="popular">
          <TabsList>
            <TabsTrigger value="popular" className="px-2">
              <LayoutGridIcon className="h-5 w-5" />
            </TabsTrigger>
            <TabsTrigger value="recent" className="px-2">
              <ListIcon className="h-5 w-5" />
            </TabsTrigger>
          </TabsList>
        </ShadcnTabs>
      </div>
    </div>
  );
}
