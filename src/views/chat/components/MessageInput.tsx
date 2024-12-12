import React, { useRef, useState, useEffect } from "react";
import {
  Flex,
  Textarea,
  Box,
  Card,
  CardBody,
  CardFooter,
  Text,
  IconButton,
} from "@chakra-ui/react";

import { useColorModeValue } from "@chakra-ui/react";
import MessageInputButton from "./MessageInputButton";
import ConversationTypeSelector from "./ConversationTypeSelector";

import MessageInputTypeSelector from "./MessageInputTypeSelector";
import { FiSend } from "react-icons/fi";

// typescript 이용 작업할 경우 상위 컴포넌트가 주는 props의 type 지정을 위해 interface 생성
interface MessageInputProps {
  borderColor: string;
  inputColor: string;
  loading: boolean;
  handleTranslate: (inputMessage: string) => void;
  setConversationType: React.Dispatch<React.SetStateAction<string>>;
  setEnableMultiTurn: React.Dispatch<React.SetStateAction<boolean>>;
  setKnowledgeType: React.Dispatch<React.SetStateAction<string>>;
  conversationType: string;
  enableMultiTurn: boolean;
  knowledgeType: string;
  multiTurnStatus: boolean;
  onHeightChangeHandeler: any;
  handleQuestionClick: (
    question: string,
    conversationType: string,
    knowledgeType: string
  ) => void;
}

// props의 타입을 interface로 지정 'MessageInputProps'
export default function MessageInput({
  borderColor,
  inputColor,
  loading,
  handleTranslate,
  setConversationType,
  setEnableMultiTurn,
  setKnowledgeType,
  conversationType,
  enableMultiTurn,
  knowledgeType,
  multiTurnStatus,
  onHeightChangeHandeler,
  handleQuestionClick,
}: MessageInputProps) {
  const placeholderColor = useColorModeValue("gray.400", "whiteAlpha.600");
  const inputAreaBgColor = useColorModeValue("whiteAlpha.700", "navi.800");
  const textColor = useColorModeValue("transparent", "white");
  const [textInput, setTextInput] = useState<string>("");
  const textareaRef = useRef(null);

  // onKeyDown 핸들러와 함께 구성해서 사용자 키보드에서 Enter 키가 눌린 경우 실행되는 함수
  const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      await handleTranslate(textInput);
      if (textareaRef.current) {
        textareaRef.current.focus();
      }

      setTextInput("");
    }
  };

  const handleSubmit = async () => {
    await handleTranslate(textInput);
    setTextInput("");
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  const handleTextAreaInputChange = (input: string) => {
    setTextInput(input && input !== "\n" ? input : "");
  };

  useEffect(() => {
    const textarea = textareaRef.current;

    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
      onHeightChangeHandeler(textarea.scrollHeight);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textInput]);

  return (
    <Card width="65vw" borderRadius="15px" position="fixed" bottom={10}>
      <CardBody>
        <Flex direction="row" ml="-8px" mt="-5px" mb="15px">
          <Text
            fontSize="sm"
            fontWeight={"bold"}
            style={{
              background:
                "linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: textColor,
            }}
            minW="fit-content"
            px={2}
            borderRadius="15px"
            textAlign="center"
            textTransform={"capitalize"}
          >
            {conversationType === "knowledge" ? "사내 정보 검색" : "일반 검색"}
          </Text>
          {conversationType === "knowledge" ? (
            <>
              <Text mr="10px" ml="10px">
                |
              </Text>
              <Text
                fontSize="sm"
                fontWeight={"bold"}
                style={{
                  background:
                    "linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: textColor,
                }}
                minW="fit-content"
                px={2}
                borderRadius="15px"
                textAlign="center"
                textTransform={"capitalize"}
              >
                {enableMultiTurn ? "상세 검색 모드" : "일반 검색 모드"}
              </Text>
              {enableMultiTurn === true ? (
                <>
                  <Text mr="10px" ml="10px">
                    |
                  </Text>
                  <Flex alignItems="center">
                    <Text
                      fontSize="sm"
                      fontWeight={"bold"}
                      style={{
                        background:
                          "linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: textColor,
                      }}
                      minW="fit-content"
                      px={2}
                      borderRadius="15px"
                      textAlign="center"
                      textTransform={"capitalize"}
                    >
                      {knowledgeType === "manual"
                        ? "매뉴얼"
                        : knowledgeType === "parts_book"
                          ? "장비 부품 책자"
                          : knowledgeType === "maintenance"
                            ? "정비 일지"
                            : ""}
                    </Text>
                    <IconButton
                      ml={-2}
                      size="sm"
                      height="20px"
                      icon={<FiSend />}
                      aria-label="Send Message"
                      onClick={() =>
                        handleQuestionClick(
                          knowledgeType === "manual" ||
                            knowledgeType === "maintenance"
                            ? "정비 매뉴얼에 있는 내용을 검색해주세요."
                            : "장비 부품 책자에 있는 내용을 검색해주세요.",
                          "knowledge",
                          knowledgeType
                        )
                      }
                      variant="ghost"
                      colorScheme="blue"
                      _hover={{ bg: "transparent" }}
                    />
                  </Flex>
                </>
              ) : null}
            </>
          ) : null}
        </Flex>
        <Textarea
          ref={textareaRef}
          value={textInput}
          backgroundColor={inputAreaBgColor}
          isDisabled={loading || multiTurnStatus}
          _disabled={{
            opacity: 0.6,
            filter: "blur(1px)",
            boxShadow: "none",
            backgroundColor: "gray.100",
          }}
          minH="10px"
          maxH="150px"
          border="none"
          p="0"
          fontSize="sm"
          fontWeight="500"
          _focus={{ border: "none", boxShadow: "none" }}
          _active={{ border: "none" }}
          color={inputColor}
          placeholder={`이곳에 메세지를 입력해주세요.`}
          _placeholder={{ color: placeholderColor }}
          onChange={(e) => handleTextAreaInputChange(e.target.value)}
          onKeyDown={(e) => handleKeyDown(e)}
          overflowY="auto"
          resize="vertical"
          css={{
            resize: "none",
            "&::-webkit-scrollbar": {
              width: "8px",
            },
            "&::-webkit-scrollbar-track": {
              background: "#f1f1f1", // 스크롤바 트랙 색상
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#888", // 스크롤바의 이동 블록 색상
              borderRadius: "4px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "#555", // 스크롤바가 호버될 때 색상
            },
          }}
        />
      </CardBody>
      <CardFooter position="relative" p="0">
        <Box
          position="relative"
          width="100%"
          height="30px"
          padding="10px"
          marginTop={3}
        >
          <Flex>
            <Flex
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              position="absolute"
              left={3}
              bottom={2.5}
              zIndex={1}
              paddingLeft={3}
            >
              <ConversationTypeSelector
                setConversationType={setConversationType}
                multiTurnStatus={multiTurnStatus}
              />
              {conversationType === "knowledge" ? (
                <MessageInputTypeSelector
                  setEnableMultiTurn={setEnableMultiTurn}
                  setKnowledgeType={setKnowledgeType}
                  multiTurnStatus={multiTurnStatus}
                />
              ) : null}
            </Flex>
            <Flex
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              position="absolute"
              right={5}
              bottom={2.5}
              zIndex={1}
            >
              <MessageInputButton
                handleSubmit={handleSubmit}
                loading={loading}
                textInput={textInput}
              />
            </Flex>
          </Flex>
        </Box>
      </CardFooter>
    </Card>
  );
}
