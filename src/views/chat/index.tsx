"use client";
/*eslint-disable*/
import { v4 as uuidV4 } from "uuid";
import cloneDeep from "lodash/cloneDeep";

import { Flex, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import { ChatMessage, ChatRequest } from "types/types";
import { mainBoxWrapper, ContainerWrapper } from "./components/ChattingStyle";

import MessageBox from "./components/MessageBox";
import MessageInputBar from "./components/MessageInputBar";
import MessageBoxIcon from "./components/MessageBoxIcon";
import MessageHistory from "./components/MessageHistory";
import ChatTitle from "./components/ChatTitle";

import { REACT_APP_API_URL } from "../../config";


const getBackendUrl = (conversationType: string) => {
  if (conversationType === "retrieval") {
    return `${REACT_APP_API_URL}/bedrock/chat/retrieval`
  } 
  else if (conversationType === "agent") {
    return `${REACT_APP_API_URL}/bedrock/chat/agent`
  }
  else if (conversationType === "web_search") {
    return `${REACT_APP_API_URL}/bedrock/chat/web_search`
  }
  else return `${REACT_APP_API_URL}/bedrock/chat`;
};

const source_documents_delimiter = "[#source_documents_delimiter#]";

export default function Chat() {
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.400");
  const inputColor = useColorModeValue("navy.700", "white");

  const [inputMessage, setInputMessage] = useState<string>("");
  const [outputMessage, setOutputMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [sourceDocuments, setSourceDocuments] = useState<any>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [inProp, setInProp] = useState<boolean>(false);
  const [conversationType, setConversationType] = useState<string>("general");
  const [currentConversationType, setCurrentConversationType] = useState<string>("general");
  const [knowledgeType, setKnowledgeType] = useState<string>("manual"); 
  const [sessionId] = useState<string>(uuidV4());
  const [messageId, setMessageId] = useState<number | null>(null);
  const [chatRoomId, setChatRoomId] = useState<string | null>(null);
  // const [chatRoomExist, setChatRoomExist] = useState<boolean | null>(null);

  const handleTranslate = async (
    _inputMessage: string = inputMessage,
    _conversationType: string = conversationType,
  ) => {
    if (!_inputMessage) {
      alert("Please enter your message.");
      return;
    }

    if (outputMessage.length > 1) {
      const aiMessage: ChatMessage = {
        type: "ai",
        outputMessage: cloneDeep(outputMessage),
        sourceDocuments: cloneDeep(sourceDocuments),
        conversationType: cloneDeep(currentConversationType),
      };
      setChatMessages((prevMessages) => [...prevMessages, aiMessage]);
    }
    const userMessage: ChatMessage = {
      type: "user",
      inputMessage: cloneDeep(_inputMessage),
    };

    setChatMessages((prevMessages) => [...prevMessages, userMessage]);
    setOutputMessage(" ");
    setSourceDocuments(null);
    setCurrentConversationType(_conversationType);
    setConversationType(_conversationType);
    setInputMessage(_inputMessage);
    setLoading(true);

    let chatRequest: ChatRequest = {
      llm: localStorage.getItem("llm"),
      message: _inputMessage,
      conversation_type: _conversationType,
      user_id: sessionStorage.getItem("user_id"),
      message_id: messageId,
      session_id: sessionId,
      chat_room_id: chatRoomId,
      // chat_room_exist: chatRoomExist,
    };

    try {
      const backendUrl = getBackendUrl(_conversationType)
      const response = await fetch(backendUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(chatRequest),
      });

      if (!response.ok || !response.body) {
        setLoading(false);
        alert("Something went wrong");
        return;
      }
      setLoading(true);

      let done = false;
      let isSourceDocuments = true;
      let streamingSourceDocuments = "";

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8", { ignoreBOM: true });
      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        let chunkValue = decoder.decode(value);

        if (isSourceDocuments) {
          const mixValues = chunkValue.split(source_documents_delimiter);
          if (mixValues.length > 1) {
            streamingSourceDocuments += mixValues[0];
            setSourceDocuments(
              JSON.parse(streamingSourceDocuments)["source_documents"]
            );
            chunkValue = mixValues[1];
            isSourceDocuments = false;
          } else {
            streamingSourceDocuments += chunkValue;
          }
        }

        setOutputMessage((prevCode) => prevCode + chunkValue);
      }
      setMessageId((prevId) => prevId + 1);
    } catch (e) {
      alert(e);
    }

    setLoading(false);
  };

  // 새 채팅룸 생성 버튼과 연동해서 hook로 등록
  // chatRoonId uuid 값 초기화 
  // messageId 값 1로 초기화
  useEffect(() => {
    setChatRoomId(uuidV4());
    // setChatRoomExist(false);
    setMessageId(1);
  }, []); 

  useEffect(() => {
    sessionStorage.setItem('chat_room_id', chatRoomId)
    // sessionStorage.setItem('message_id', messageId.toString())
  }, [chatRoomId]);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollBottom();
    setInProp(true);
  }, [chatMessages, outputMessage,loading]);

  const scrollBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  // 사용자가 채팅 창에 텍스트를 많이 입력하여 채팅 박스의 사이즈가 커질 수록
  // Message Box의 크기를 그만큼 줄이는 코드
  const [height, setHeight] = useState(0);
  const handleHeightChange = (height: any) => {
    if (height > 150) {
      setHeight(150);
    } else {
      setHeight(height);
    }
  };

  return (
    <Flex {...ContainerWrapper}>
      <Flex
        direction="column"
        mx="auto"
        w={{ base: "100%", md: "100%", xl: "100%" }}
        maxW="65vw"
        pb="200px"
      >
        {/* 이전 대화 내용이 없는 최초 접속 시 메인 Chat 화면 구성 */}
        {/* 대화가 시작되면 ChatTitle 컴포넌트는 사라지고 아래의 채팅 메세지 기록들 표시 */}
        {!outputMessage ? ( <ChatTitle inProp={inProp} /> ) : null}

        <Flex
          direction="column"
          {...mainBoxWrapper({ outputMessage, height })}
          ref={chatContainerRef}
          overflowY="auto"
        >
          {/* 이전 대화 내용을 화면에 뿌려주는 코드 */}
          {/* 사람의 질문, Multi-turn 답변인 경우, 그 외 답변인 경우 나누어 화면에 표시 */}
          <MessageHistory
            chatMessages={chatMessages}
            knowledgeType={knowledgeType}
            scrollBottom={scrollBottom}
          />
          {/* 마지막 질문에 대한 LLM 답변을 화면에 뿌리는 코드 */}
          <Flex w="100%">
            <MessageBoxIcon mt="13px" />
            <MessageBox
                output={outputMessage}
                sourceDocuments={sourceDocuments}
                loading={loading}
                conversationType={currentConversationType}
                handleTranslate={handleTranslate}
            />
          </Flex>
        </Flex>
      </Flex>

      <MessageInputBar
        borderColor={borderColor}
        inputColor={inputColor}
        handleTranslate={handleTranslate}
        loading={loading}
        setConversationType={setConversationType}
        setKnowledgeType={setKnowledgeType}
        conversationType={conversationType}
        knowledgeType={knowledgeType}
        onHeightChangeHandeler={handleHeightChange}
      />
    </Flex>
  );
}
