import React from "react";
import {
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuDivider,
  MenuList,
  Tooltip,
  Text,
} from "@chakra-ui/react";

import { useColorModeValue } from "@chakra-ui/react";
import { CgPlayListSearch } from "react-icons/cg";
import { TiArrowRepeat } from "react-icons/ti";
import { buttonWrapper } from "./ChattingStyle";

// typescript 이용 작업할 경우 상위 컴포넌트가 주는 props의 type 지정을 위해 interface 생성
interface MessageInputProps {
  setEnableMultiTurn: React.Dispatch<React.SetStateAction<boolean>>;
  setKnowledgeType: React.Dispatch<React.SetStateAction<string>>;
  multiTurnStatus: boolean;
}

// props의 타입을 interface로 지정 'MessageInputProps'
export default function MessageInputTypeSelector({
  setKnowledgeType,
  setEnableMultiTurn,
  multiTurnStatus,
}: MessageInputProps) {
  const handleMultiTurnChange = (isMultiTurn: boolean) => {
    setEnableMultiTurn(isMultiTurn);
  };

  const handleKnowledgeTypeChange = (knowledgeType: string) => {
    setKnowledgeType(knowledgeType);
  };

  let menuBg = useColorModeValue("white", "navy.800");
  const menuColor = useColorModeValue("aliceblue", "blue");

  return (
    <Flex>
      {/* 2번째 Icon */}
      <Menu>
        <Tooltip
          label="검색 방식"
          aria-label="A tooltip"
          hasArrow
          placement="bottom-start"
        >
          <MenuButton
            {...buttonWrapper}
            disabled={multiTurnStatus}
            _disabled={{
              opacity: 0.6,
              filter: "blur(1px)",
              boxShadow: "none",
              backgroundColor: "gray.100",
            }}
          >
            <Flex alignItems="center" mx="auto" my="auto">
              <Icon as={TiArrowRepeat} w="30px" h="30px" ml="2px" />
            </Flex>
          </MenuButton>
        </Tooltip>

        <MenuList>
          <Flex flexDirection="column" pl={1.5} pr={1.5}>
            <Tooltip
              label="입력 메세지 기반으로 검색"
              aria-label="A tooltip"
              hasArrow
              placement="left"
            >
              <MenuItem
                bg={menuBg}
                _hover={{ bg: menuColor }}
                _focus={{ bg: menuColor }}
                borderRadius="8px"
                px="14px"
                onClick={() => handleMultiTurnChange(false)}
              >
                <Text fontSize="sm">기본 검색 방식</Text>
              </MenuItem>
            </Tooltip>
            <MenuDivider />
            <Tooltip
              label="정확한 검색을 위해 추가 정보 입력이 필요한 방식"
              aria-label="A tooltip"
              hasArrow
              placement="left"
            >
              <MenuItem
                bg={menuBg}
                _hover={{ bg: menuColor }}
                _focus={{ bg: menuColor }}
                borderRadius="8px"
                px="14px"
                onClick={() => handleMultiTurnChange(true)}
              >
                <Text fontSize="sm">상세 검색 방식</Text>
              </MenuItem>
            </Tooltip>
          </Flex>
        </MenuList>
      </Menu>

      {/* 3번째 Icon */}
      <Menu>
        <Tooltip
          label="검색 대상"
          aria-label="A tooltip"
          hasArrow
          placement="bottom-start"
        >
          <MenuButton
            {...buttonWrapper}
            disabled={multiTurnStatus}
            _disabled={{
              opacity: 0.6,
              filter: "blur(1px)",
              boxShadow: "none",
              backgroundColor: "gray.100",
            }}
          >
            <Flex alignItems="center" mx="auto" my="auto">
              <Icon as={CgPlayListSearch} w="30px" h="30px" ml="7px" />
            </Flex>
          </MenuButton>
        </Tooltip>

        <MenuList>
          <Flex flexDirection="column" pl={1.5} pr={1.5}>
            <Tooltip
              label="정비매뉴얼을 검색하여 답변을 생성합니다. "
              aria-label="A tooltip"
              hasArrow
              placement="left"
            >
              <MenuItem
                bg={menuBg}
                _hover={{ bg: menuColor }}
                _focus={{ bg: menuColor }}
                borderRadius="8px"
                px="14px"
                onClick={() => handleKnowledgeTypeChange("manual")}
              >
                <Text fontSize="sm">매뉴얼</Text>
              </MenuItem>
            </Tooltip>
            <MenuDivider />
            <Tooltip
              label="장비 부품 책자를 검색하여 답변을 생성합니다. "
              aria-label="A tooltip"
              hasArrow
              placement="left"
            >
              <MenuItem
                bg={menuBg}
                _hover={{ bg: menuColor }}
                _focus={{ bg: menuColor }}
                borderRadius="8px"
                px="14px"
                onClick={() => handleKnowledgeTypeChange("parts_book")}
              >
                <Text fontSize="sm">장비 부품 책자</Text>
              </MenuItem>
            </Tooltip>
            <MenuDivider />
            <Tooltip
              label="정비일지와 매뉴얼 데이터를 검색하여 답변을 생성합니다. "
              aria-label="A tooltip"
              hasArrow
              placement="left"
            >
              <MenuItem
                bg={menuBg}
                _hover={{ bg: menuColor }}
                _focus={{ bg: menuColor }}
                borderRadius="8px"
                px="14px"
                onClick={() => handleKnowledgeTypeChange("maintenance")}
              >
                <Text fontSize="sm">정비 일지</Text>
              </MenuItem>
            </Tooltip>
          </Flex>
        </MenuList>
      </Menu>
    </Flex>
  );
}
