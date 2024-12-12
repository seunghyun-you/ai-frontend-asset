import React from "react";
import { Flex, useColorModeValue } from "@chakra-ui/react";

import { ChatMessage } from "../../../types/types";

import MessageBoxPerson from "./MessageBoxPerson";
import MessageBoxIcon from "./MessageBoxIcon";
import MessageBoxChatHistory from "./MessageBoxHistory";
import MessageBoxMultiTurn from "./MessageBoxMultiTurn";

interface MessageHistoryProps {
  chatMessages: ChatMessage[];
  knowledgeType: string;
  scrollBottom: () => void;
}

const MessageHistory = React.memo(
  ({ chatMessages, knowledgeType, scrollBottom, }: MessageHistoryProps) => {
    const bgColor = useColorModeValue("rgb(240, 240, 255)", "navy.700");
    const brandColor = useColorModeValue("brand.500", "white");
    const inputColor = useColorModeValue("navy.700", "white");
    const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");

    return (
      <Flex flexDirection="column">
        {chatMessages.map((chat, index) => {
          if (chat.type === "user") {
            return (
              <MessageBoxPerson
                key={index}
                borderColor={borderColor}
                brandColor={brandColor}
                textColor={inputColor}
                bgColor={bgColor}
                chat={chat.inputMessage}
              />
            );
          } else if (chat.type === "multiTurn") {
            return (
              <Flex key={index} w="100%" mb="10px">
                <MessageBoxIcon />
                <MessageBoxMultiTurn
                  disabled={true}
                  inputMessage={chat.inputMessage}
                  output={chat.multiTurn}
                  loading={false}
                  knowledgeType={knowledgeType}
                  conversationType={chat.conversationType}
                  handleTranslate={null}
                  scrollBottom={scrollBottom}
                />
              </Flex>
            );
          } else {
            return (
              <Flex key={index} w="100%" mb="10px">
                <MessageBoxIcon />
                <MessageBoxChatHistory
                  output={chat.outputMessage}
                  sourceDocuments={chat.sourceDocuments}
                  loading={false}
                  conversationType={chat.conversationType}
                  handleTranslate={null}
                />
              </Flex>
            );
          }
        })}
      </Flex>
    );
  }
);

export default MessageHistory;
