export interface ChatMessage {
  inputMessage?: string;
  outputMessage?: string;
  multiTurn?: MultiTurn;
  type: string;
  sourceDocuments?: any;
  conversationType?: string;
}

export interface MultiTurn {
  brand_name: string;
  model_name: string;
  error_code?: string;
  input_query?: string;
  parts_name?: string;
}

export interface ChatRequest {
  connection_id: string;
  message_id: string;
  message: string;
  conversation_type: string;
  knowledge_type?: string;
  llm: string;
  session_id: string;
  multi_turn?: MultiTurn;
}

export interface SavedFile {
  filename: string;
  uuid: string;
}

export interface InputForm {
  brand_name: string;
  model_type: string;
  model_name: string;
  error_code?: string;
  abnormal_part?: string;
  replacement_part?: string;
  abnormal_symptom: string;
  // abnormal_symptom_details: string;
  maintenance_history: string;
  maintenance_tools?: string[];
  saved_files?: SavedFile[];
  saved_image_descriptions?: string[];
}
