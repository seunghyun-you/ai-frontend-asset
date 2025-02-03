import React, { useRef, useState, useEffect } from "react";
import {
  Flex,
  Textarea,
  Box,
  Card,
  CardBody,
  CardFooter,
} from "@chakra-ui/react";

import { useColorModeValue } from "@chakra-ui/react";
import MessageInputButton from "./MessageInputButton";
import ConversationTypeSelector from "./ConversationTypeSelector";

import {chatInputWrapper} from "./ChattingStyle";

// typescript 이용 작업할 경우 상위 컴포넌트가 주는 props의 type 지정을 위해 interface 생성
interface MessageInputProps {
  borderColor: string;
  inputColor: string;
  loading: boolean;
  handleTranslate: (inputMessage: string) => void;
  setConversationType: React.Dispatch<React.SetStateAction<string>>;
  setKnowledgeType: React.Dispatch<React.SetStateAction<string>>;
  conversationType: string;
  knowledgeType: string;
  onHeightChangeHandeler: any;
}

// props의 타입을 interface로 지정 'MessageInputProps'
export default function MessageInput({
  borderColor,
  inputColor,
  loading,
  handleTranslate,
  setConversationType,
  setKnowledgeType,
  conversationType,
  onHeightChangeHandeler,
}: MessageInputProps) {
  const placeholderColor = useColorModeValue("gray.400", "whiteAlpha.600");
  const inputAreaBgColor = useColorModeValue("whiteAlpha.700", "navi.800");
  const scrollBarHover = useColorModeValue("#f1f1f1", "#555");
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
    <Flex {...chatInputWrapper}>
      <Card 
        width="50vw" 
        borderRadius="15px" 
        position="fixed" 
        bottom={10}
        border="1px solid"
        borderColor={borderColor}
        borderWidth="1px"
        backgroundColor="transparent"
      >
        <CardBody>
          <Textarea
            ref={textareaRef}
            value={textInput}
            backgroundColor={inputAreaBgColor}
            isDisabled={loading}
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
                background: useColorModeValue("#f1f1f1", "#2D3748"),
                borderRadius: "4px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: useColorModeValue("#888", "#4A5568"),
                borderRadius: "4px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                background: useColorModeValue("#555", "#2C5282"),
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
                />
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
    </Flex>
  );
}
