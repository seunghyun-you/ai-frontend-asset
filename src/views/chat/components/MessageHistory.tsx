import React from "react";
import { Flex, useColorModeValue } from "@chakra-ui/react";

import { ChatMessage } from "../../../types/types";

import MessageBoxPerson from "./MessageBoxPerson";
import MessageBoxIcon from "./MessageBoxIcon";
import MessageBoxChatHistory from "./MessageBoxHistory";

interface MessageHistoryProps {
  chatMessages: ChatMessage[];
  knowledgeType: string;
  scrollBottom: () => void;
}

const MessageHistory = React.memo(
  ({ chatMessages }: MessageHistoryProps) => {
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
          } else {
            return (
              <Flex key={index} w="100%" mb="10px">
                <MessageBoxIcon  mt="10px" />
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
