import React from 'react';
import {
  Flex
} from '@chakra-ui/react';
import MessageInput from './MessageInput';
import {chatInputWrapper} from "./ChattingStyle";

interface MessageInputBarProps {
  borderColor: string;
  inputColor: string;
  handleTranslate: (inputMessage: string) => void;
  loading: boolean;
  setConversationType: React.Dispatch<React.SetStateAction<string>>
  setEnableMultiTurn: React.Dispatch<React.SetStateAction<boolean>>
  setKnowledgeType: React.Dispatch<React.SetStateAction<string>>
  conversationType: string;
  enableMultiTurn: boolean;
  knowledgeType: string;
  multiTurnStatus: boolean;
  onHeightChangeHandeler: any;
	handleQuestionClick: (question: string, conversationType: string, knowledgeType: string) => void;
}

export default function MessageInputBar(
    {
      borderColor,
      inputColor,
      handleTranslate,
      loading,
      setConversationType,
      setEnableMultiTurn,
      setKnowledgeType,
      conversationType,
      enableMultiTurn,
      knowledgeType,
      multiTurnStatus,
      onHeightChangeHandeler,
      handleQuestionClick,
    }:MessageInputBarProps
) {

  return (
    <Flex {...chatInputWrapper}>
      <MessageInput borderColor={borderColor}
                    inputColor={inputColor}
                    handleTranslate={handleTranslate}
                    loading={loading}
                    setConversationType={setConversationType}
                    setEnableMultiTurn={setEnableMultiTurn}
                    setKnowledgeType={setKnowledgeType}
                    conversationType={conversationType}
                    enableMultiTurn={enableMultiTurn}
                    knowledgeType={knowledgeType}
                    onHeightChangeHandeler={onHeightChangeHandeler}
                    multiTurnStatus={multiTurnStatus}
                    handleQuestionClick={handleQuestionClick}
      />
    </Flex>
  );
};
