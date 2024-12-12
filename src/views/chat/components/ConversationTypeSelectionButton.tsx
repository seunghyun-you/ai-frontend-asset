import React from "react";
import {
  Button, Icon, Modal,
  ModalOverlay,
  ModalContent,
  Tooltip,
  ModalBody,
  useDisclosure, Flex, SimpleGrid
} from "@chakra-ui/react";
import {MdMessage} from "react-icons/md";
import Nft1 from "../../../assets/img/nfts/Nft1.png";
import Nft2 from "../../../assets/img/nfts/Nft2.png";
import Nft3 from "../../../assets/img/nfts/Nft3.png";
import ConversationType from "./ConversationType";
import {ConversationTypeSelectionButtonWrapper, buttonWrapper} from "./ChattingStyle";
import { IoChatbubblesOutline } from "react-icons/io5";
import { PiChatsCircleBold } from "react-icons/pi";

interface MessageInputButtonProps {
  setConversationType: React.Dispatch<React.SetStateAction<string>>
}

export default function ConversationTypeSelectionButton({setConversationType}: MessageInputButtonProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
      <Flex my='auto'>
        <Tooltip label="대화 방식 선택 " aria-label="A tooltip" hasArrow placement='top-start'>
          <Button
            {...buttonWrapper}
            onClick={onOpen}
          >
            <Icon as={PiChatsCircleBold} w='25px' h='25px' />
          </Button>
        </Tooltip>
        <Modal isOpen={isOpen} onClose={onClose} size='6xl' isCentered>
          <ModalOverlay />
          <ModalContent
              position="sticky"
              >
            <ModalBody>
              <SimpleGrid columns={{ base: 1, md: 3 }} gap='10px'>
                <ConversationType
                    conversationTitle='일반대화'
                    conversationDescription='LLM Conversation'
                    conversationType='general'
                    image={Nft1}
                    setConversationType={setConversationType}
                    onClose={onClose}
                />
                <ConversationType
                    conversationTitle='지식기반대화'
                    conversationDescription='Knowledge Base Conversation'
                    conversationType='knowledge'
                    image={Nft2}
                    setConversationType={setConversationType}
                    onClose={onClose}
                />
                <ConversationType
                    conversationTitle='외부검색대화'
                    conversationDescription='External Search Conversation'
                    conversationType='external'
                    image={Nft3}
                    setConversationType={setConversationType}
                    onClose={onClose}
                />
              </SimpleGrid>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Flex>
  );
}
