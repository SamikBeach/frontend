'use client';

import { authorApi } from '@/apis/author/author';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/utils/common';
import { useSuspenseQuery } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDownIcon } from 'lucide-react';
import { Suspense, useEffect, useRef, useState } from 'react';
import InfluencedAuthorItem from './InfluencedAuthorItem';

interface Props {
  authorId: number;
}

const INITIAL_SHOW_COUNT = 6;

function InfluencedAuthorsContent({ authorId }: Props) {
  const [isInfluencedExpanded, setIsInfluencedExpanded] = useState(false);
  const [isInfluencedByExpanded, setIsInfluencedByExpanded] = useState(false);
  const [hasInfluencedOverflow, setHasInfluencedOverflow] = useState(false);
  const [hasInfluencedByOverflow, setHasInfluencedByOverflow] = useState(false);

  const influencedContainerRef = useRef<HTMLDivElement>(null);
  const influencedByContainerRef = useRef<HTMLDivElement>(null);

  const { data: author } = useSuspenseQuery({
    queryKey: ['author', authorId],
    queryFn: () => authorApi.getAuthorDetail(authorId),
    select: response => response.data,
  });

  const { data: influenced = [] } = useSuspenseQuery({
    queryKey: ['author-influenced', authorId],
    queryFn: () => authorApi.getInfluencedAuthors(authorId),
    select: response => response.data,
  });

  const { data: influencedBy = [] } = useSuspenseQuery({
    queryKey: ['author-influenced-by', authorId],
    queryFn: () => authorApi.getInfluencedByAuthors(authorId),
    select: response => response.data,
  });

  useEffect(() => {
    const checkOverflow = () => {
      if (influencedContainerRef.current) {
        setHasInfluencedOverflow(
          influencedContainerRef.current.scrollHeight > 50 &&
            influenced.length > 1
        );
      }
      if (influencedByContainerRef.current) {
        setHasInfluencedByOverflow(
          influencedByContainerRef.current.scrollHeight > 50 &&
            influencedBy.length > 1
        );
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [influenced.length, influencedBy.length]);

  if (influenced.length === 0 && influencedBy.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-10">
      {influenced.length > 0 && (
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-semibold text-gray-900">
              {author.nameInKor.trim()}에게 영향을 준 작가
            </h2>
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
              {influenced.length}
            </span>
            {hasInfluencedOverflow && (
              <Button
                variant="ghost"
                className="h-7 gap-1 px-2 text-sm text-gray-500 hover:text-gray-900"
                onClick={() => setIsInfluencedExpanded(!isInfluencedExpanded)}
              >
                <ChevronDownIcon
                  className={cn('h-4 w-4 transition-transform duration-200', {
                    'rotate-180': isInfluencedExpanded,
                  })}
                />
                {isInfluencedExpanded ? '접기' : '더보기'}
              </Button>
            )}
          </div>
          <motion.div
            ref={influencedContainerRef}
            initial={false}
            animate={{
              height: isInfluencedExpanded ? 'auto' : '50px',
            }}
            transition={{
              duration: 0.3,
              ease: 'easeInOut',
            }}
            className="overflow-hidden"
          >
            <div className="flex flex-wrap gap-2">
              <AnimatePresence>
                {influenced.map(author => (
                  <motion.div
                    key={author.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{
                      opacity: { duration: 0.2 },
                      layout: { duration: 0.3 },
                    }}
                  >
                    <InfluencedAuthorItem author={author} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}

      {influencedBy.length > 0 && (
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-lg font-semibold text-gray-900">
              {author.nameInKor.trim()}에게 영향을 받은 작가
            </h2>
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
              {influencedBy.length}
            </span>
            {hasInfluencedByOverflow && (
              <Button
                variant="ghost"
                className="h-7 gap-1 px-2 text-sm text-gray-500 hover:text-gray-900"
                onClick={() =>
                  setIsInfluencedByExpanded(!isInfluencedByExpanded)
                }
              >
                <ChevronDownIcon
                  className={cn('h-4 w-4 transition-transform duration-200', {
                    'rotate-180': isInfluencedByExpanded,
                  })}
                />
                {isInfluencedByExpanded ? '접기' : '더보기'}
              </Button>
            )}
          </div>
          <motion.div
            ref={influencedByContainerRef}
            initial={false}
            animate={{
              height: isInfluencedByExpanded ? 'auto' : '50px',
            }}
            transition={{
              duration: 0.3,
              ease: 'easeInOut',
            }}
            className="overflow-hidden"
          >
            <div className="flex flex-wrap gap-2">
              <AnimatePresence>
                {influencedBy.map(author => (
                  <motion.div
                    key={author.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{
                      opacity: { duration: 0.2 },
                      layout: { duration: 0.3 },
                    }}
                  >
                    <InfluencedAuthorItem author={author} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

function InfluencedAuthorsSkeleton() {
  return (
    <div className="flex flex-col gap-10">
      {Array.from({ length: 2 }).map((_, index) => (
        <div key={index} className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-6 w-10 rounded-full" />
          </div>
          <div className="flex max-h-[50px] flex-wrap gap-2 overflow-hidden">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="inline-flex h-[42px] w-[200px] items-center gap-3 rounded-lg bg-gray-100 px-3 py-2.5"
              >
                <Skeleton className="h-8 w-8 shrink-0 rounded-full" />
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function InfluencedAuthors(props: Props) {
  return (
    <Suspense fallback={<InfluencedAuthorsSkeleton />}>
      <InfluencedAuthorsContent {...props} />
    </Suspense>
  );
}
