'use client';

import { ChatMessage } from '@/apis';
import { authorApi } from '@/apis/author';
import { LoginDialog } from '@/components/LoginDialog';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/components/ui/sonner';
import { Textarea } from '@/components/ui/textarea';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { cn } from '@/utils/common';
import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { RefreshCwIcon, SendIcon, StopCircleIcon } from 'lucide-react';
import { Suspense, useCallback, useEffect, useRef, useState } from 'react';

interface Props {
  authorId: number;
}

function AuthorChatContent({ authorId }: Props) {
  const currentUser = useCurrentUser();
  const [openLoginDialog, setOpenLoginDialog] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { data: author } = useSuspenseQuery({
    queryKey: ['author', authorId],
    queryFn: () => authorApi.getAuthorDetail(authorId),
    select: response => response.data,
  });

  // 작가가 바뀌면 대화 내용 초기화
  useEffect(() => {
    setChatHistory([]);
    setIsTyping(false);
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, [authorId]);

  const scrollToBottom = useCallback(() => {
    setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop =
          chatContainerRef.current.scrollHeight;
      }
    }, 100);
  }, []);

  // 컴포넌트가 마운트되면 입력창에 포커스
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: async (message: string) => {
      // 이전 요청이 있다면 중단
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // 새 AbortController 생성
      abortControllerRef.current = new AbortController();

      try {
        // 사용자 메시지 추가
        const userMessage: ChatMessage = {
          role: 'user',
          content: message,
        };

        // 채팅 기록 업데이트 (사용자 메시지만)
        setChatHistory(prev => [...prev, userMessage]);

        // 입력 필드 초기화
        setMessage('');

        // 스크롤을 아래로 이동
        scrollToBottom();

        // 타이핑 효과 시작
        setIsTyping(true);

        // API 호출
        const response = await authorApi.chatWithAuthor(
          authorId,
          {
            message,
            conversationHistory: chatHistory,
          },
          abortControllerRef.current.signal
        );

        // AI 응답 추가
        const aiMessage: ChatMessage = {
          role: 'assistant',
          content: response.data.response,
        };

        // 채팅 기록 업데이트 (AI 응답 추가)
        setChatHistory(prev => [...prev, aiMessage]);

        // 타이핑 효과 종료
        setIsTyping(false);

        // 스크롤을 아래로 이동
        scrollToBottom();

        return response.data;
      } catch (error) {
        // 요청이 중단된 경우
        if (axios.isCancel(error)) {
          // 타이핑 효과 종료
          setIsTyping(false);

          // 중단 메시지 추가
          const cancelMessage: ChatMessage = {
            role: 'assistant',
            content: '응답이 중단되었습니다.',
          };

          setChatHistory(prev => [...prev, cancelMessage]);
          scrollToBottom();

          return null;
        }

        // 기타 오류
        throw error;
      } finally {
        abortControllerRef.current = null;
      }
    },
    onError: () => {
      toast.error('오류가 발생했습니다. 잠시 후 다시 시도해주세요.');

      // 타이핑 효과 종료
      setIsTyping(false);
    },
  });

  const handleSendMessage = () => {
    if (!message.trim()) return;

    if (!currentUser) {
      setOpenLoginDialog(true);
      return;
    }

    sendMessage(message);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleStopResponse = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  };

  const handleRetry = () => {
    if (chatHistory.length >= 2) {
      const lastUserMessage = [...chatHistory]
        .reverse()
        .find(msg => msg.role === 'user');

      if (lastUserMessage) {
        // 마지막 AI 응답 제거
        setChatHistory(prev => prev.slice(0, prev.length - 1));

        // 다시 요청
        sendMessage(lastUserMessage.content);
      }
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
        <div
          ref={chatContainerRef}
          className="flex h-[300px] flex-col gap-3 overflow-y-auto"
        >
          {chatHistory.length === 0 ? (
            <div className="flex h-full items-center justify-center text-gray-500">
              <p className="text-center text-sm">
                {author.nameInKor}에게 질문을 해보세요.
                <br />
                작품, 철학, 사상 등에 대해 물어볼 수 있습니다.
              </p>
            </div>
          ) : (
            <AnimatePresence>
              {chatHistory.map((chat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    'flex max-w-[85%] flex-col rounded-lg p-3',
                    chat.role === 'user'
                      ? 'self-end bg-blue-100'
                      : 'self-start border border-gray-200 bg-white'
                  )}
                >
                  <span className="whitespace-pre-wrap text-sm">
                    {chat.content}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          )}

          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 self-start rounded-lg border border-gray-200 bg-white p-3"
            >
              <div className="flex gap-1">
                <span
                  className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                  style={{ animationDelay: '0ms' }}
                ></span>
                <span
                  className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                  style={{ animationDelay: '150ms' }}
                ></span>
                <span
                  className="h-2 w-2 animate-bounce rounded-full bg-gray-400"
                  style={{ animationDelay: '300ms' }}
                ></span>
              </div>
            </motion.div>
          )}
        </div>

        <div className="flex gap-2">
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`${author.nameInKor}에게 질문하기...`}
            className="chat-textarea min-h-[60px] resize-none bg-white"
            disabled={isPending}
          />
          <div className="flex flex-col gap-2">
            {isPending ? (
              <Button
                onClick={handleStopResponse}
                variant="outline"
                className="h-auto border-red-200 text-red-500 hover:bg-red-50 hover:text-red-600"
                title="응답 중단하기"
              >
                <StopCircleIcon className="h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="h-auto"
                title="메시지 보내기"
              >
                <SendIcon className="h-4 w-4" />
              </Button>
            )}

            {chatHistory.length > 0 && !isPending && (
              <Button
                onClick={handleRetry}
                variant="outline"
                className="h-auto"
                title="다시 질문하기"
              >
                <RefreshCwIcon className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
      <LoginDialog open={openLoginDialog} onOpenChange={setOpenLoginDialog} />
    </>
  );
}

function AuthorChatSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      <Skeleton className="h-[300px] w-full rounded-lg" />
    </div>
  );
}

export default function AuthorChat(props: Props) {
  return (
    <Suspense fallback={<AuthorChatSkeleton />}>
      <AuthorChatContent {...props} />
    </Suspense>
  );
}
