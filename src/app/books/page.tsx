import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronDownIcon, LayoutGridIcon, ListIcon } from 'lucide-react';

export default function Books() {
  return (
    <>
      <div className="flex w-[800px] gap-2">
        <Input placeholder="Search" />
        <Button variant="outline">
          작가
          <ChevronDownIcon className="h-4 w-4" />
        </Button>

        <Tabs defaultValue="popular">
          <TabsList>
            <TabsTrigger value="popular">인기순</TabsTrigger>
            <TabsTrigger value="recent">최신순</TabsTrigger>
            <TabsTrigger value="alphabet">가나다순</TabsTrigger>
          </TabsList>
        </Tabs>

        <Tabs defaultValue="popular">
          <TabsList>
            <TabsTrigger value="popular" className="px-2">
              <LayoutGridIcon className="h-5 w-5" />
            </TabsTrigger>
            <TabsTrigger value="recent" className="px-2">
              <ListIcon className="h-5 w-5" />
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </>
  );
}
