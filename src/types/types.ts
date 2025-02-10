export interface ChatMessage {
  inputMessage?: string;
  outputMessage?: string;
  type: string;
  sourceDocuments?: any;
  conversationType?: string;
}

export interface ChatRequest {
  llm: string;
  message: string;
  conversation_type: string;
  user_id: string;
  session_id: string;
  message_id: number;
  chat_room_id: string;
  // chat_room_exist: boolean;
}