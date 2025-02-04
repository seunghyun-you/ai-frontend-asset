import React from "react";
import {
  Tooltip,
  Icon,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Flex,
  Box,
  Text,
} from "@chakra-ui/react";
import { useColorModeValue } from "@chakra-ui/react";

import { PiChatsCircleBold } from "react-icons/pi";
import { TbMessageSearch } from "react-icons/tb";
import { TbReportSearch } from "react-icons/tb";

import { buttonWrapper } from "./ChattingStyle";

interface MessageInputButtonProps {
  setConversationType: React.Dispatch<React.SetStateAction<string>>;
}

export default function ConversationTypeSelectionButton({
  setConversationType,
}: MessageInputButtonProps) {
  let menuBg = useColorModeValue("white", "navy.800");
  const menuColor = useColorModeValue("aliceblue", "blue");
  const lightGray = "#A0AEC0";

  return (
    <Flex my="auto">
      <Menu>
        <Tooltip
          label="대화 방식"
          aria-label="A tooltip"
          hasArrow
          placement="bottom-start"
        >
          <MenuButton
            {...buttonWrapper}
            _disabled={{
              opacity: 0.6,
              filter: "blur(1px)",
              boxShadow: "none",
              backgroundColor: "gray.100",
            }}
          >
            <Flex alignItems="center" mx="auto" my="auto">
              <Icon as={PiChatsCircleBold} w="25px" h="25px" />
            </Flex>
          </MenuButton>
        </Tooltip>
        <MenuList>
          <Flex flexDirection="column" pl={1.5} pr={1.5}>
            <Tooltip
              label={<span>AI가 직접 답변합니다.</span>}
              aria-label="A tooltip"
              hasArrow
              placement="left"
            >
              <MenuItem
                onClick={() => setConversationType("general")}
                minH="40px"
                bg={menuBg}
                _hover={{ bg: menuColor }}
                _focus={{ bg: menuColor }}
                borderRadius="8px"
              >
                <Icon as={TbMessageSearch} boxSize="2rem" mr="12px" />
                <Box pl={1.5}>
                  <Text fontWeight="bold">일반 대화</Text>
                  <Text fontSize="sm" color={lightGray}>
                    General Conversation
                  </Text>
                </Box>
              </MenuItem>
            </Tooltip>
            <MenuDivider />
            <Tooltip
              label={<span>기능 개발 중 입니다.</span>}
              aria-label="A tooltip"
              hasArrow
              placement="left"
            >
              <MenuItem
                onClick={() => setConversationType("retrieval")}
                minH="40px"
                bg={menuBg}
                _hover={{ bg: menuColor }}
                _focus={{ bg: menuColor }}
                borderRadius="8px"
              >
                <Icon as={TbReportSearch} boxSize="2rem" mr="12px" />
                <Box pl={1.5}>
                  <Text fontWeight="bold">문서 유사도 검색</Text>
                  <Text fontSize="sm" color={lightGray}>
                    Retrieval Base Conversation
                  </Text>
                </Box>
              </MenuItem>
            </Tooltip>
          </Flex>
        </MenuList>
      </Menu>
    </Flex>
  );
}
