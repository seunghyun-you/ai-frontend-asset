export interface ChatMessage {
  inputMessage?: string;
  outputMessage?: string;
  type: string;
  sourceDocuments?: any;
  conversationType?: string;
}

export interface ChatRequest {
  connection_id: string;
  message_id: string;
  message: string;
  conversation_type: string;
  knowledge_type?: string;
  llm: string;
  session_id: string;
}