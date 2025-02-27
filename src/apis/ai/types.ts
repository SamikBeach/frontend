export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatWithAuthorRequest {
  message: string;
  conversationHistory?: ChatMessage[];
}

export interface ChatWithAuthorResponse {
  authorId: number;
  authorName: string;
  response: string;
  timestamp: string;
}

export interface ChatWithBookRequest {
  message: string;
  conversationHistory?: ChatMessage[];
}

export interface ChatWithBookResponse {
  bookId: number;
  bookTitle: string;
  response: string;
  timestamp: string;
}
