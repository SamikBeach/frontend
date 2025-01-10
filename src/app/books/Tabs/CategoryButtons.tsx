import { Button } from '@/components/ui/button';
import { useState } from 'react';

export function CategoryButtons() {
  const [activeCategory, setActiveCategory] = useState('종합');
  const categories = ['종합', '철학', '과학', '경제'];

  return (
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
  );
}
