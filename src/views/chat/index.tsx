"use client";
/*eslint-disable*/
import { v4 as uuidV4 } from "uuid";
import cloneDeep from "lodash/cloneDeep";

import { Flex, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import { ChatMessage, ChatRequest, MultiTurn } from "types/types";
import { mainBoxWrapper, ContainerWrapper } from "./components/ChattingStyle";

import MessageBox from "./components/MessageBox";
import MessageBoxMultiTurn from "./components/MessageBoxMultiTurn";
import MessageInputBar from "./components/MessageInputBar";
import MessageBoxIcon from "./components/MessageBoxIcon";
import MessageHistory from "./components/MessageHistory";
import ChatTitle from "./components/ChatTitle";

import { REACT_APP_API_URL } from "../../config";

export default function Chat() {
  const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");
  const inputColor = useColorModeValue("navy.700", "white");

  const [inputMessage, setInputMessage] = useState<string>("");
  const [inputMessageArr, setInputMessageArr] = useState<unknown[]>([]);
  const [outputMessage, setOutputMessage] = useState<string>("");
  const [outputMultiTurn, setOutputMultiTurn] = useState<MultiTurn>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [sourceDocuments, setSourceDocuments] = useState<any>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [inProp, setInProp] = useState<boolean>(false);
  const [sessionId] = useState<string>(uuidV4());
  const [conversationType, setConversationType] = useState<string>("knowledge");
  const [currentConversationType, setCurrentConversationType] =
    useState<string>("knowledge");
  const [knowledgeType, setKnowledgeType] = useState<string>("manual");
  const [multiTurn, setMultiTurn] = useState<boolean>(true);
  const [enableMultiTurn, setEnableMultiTurn] = useState<boolean>(true);
  const [hooking, setHooking] = useState<boolean>(false);

  const handleTranslate = async (
    _inputMessage: string = inputMessage,
    _conversationType: string = conversationType,
    _multiTurn?: MultiTurn
  ) => {
    if (!_inputMessage) {
      alert("Please enter your message.");
      return;
    }

    if (outputMessage.length > 1) {
      const chatMessage: ChatMessage = {
        outputMessage: cloneDeep(outputMessage),
        type: "ai",
        sourceDocuments: cloneDeep(sourceDocuments),
        conversationType: cloneDeep(currentConversationType),
      };
      setChatMessages((prevMessages) => [...prevMessages, chatMessage]);
    }

    if (outputMultiTurn) {
      const chatMessage: ChatMessage = {
        inputMessage: cloneDeep(inputMessage),
        multiTurn: _multiTurn
          ? cloneDeep(_multiTurn)
          : cloneDeep(outputMultiTurn),
        type: "multiTurn",
        sourceDocuments: cloneDeep(sourceDocuments),
        conversationType: cloneDeep(currentConversationType),
      };
      setChatMessages((prevMessages) => [...prevMessages, chatMessage]);
    }

    if (!_multiTurn) {
      const chatMessage: ChatMessage = {
        inputMessage: cloneDeep(_inputMessage),
        type: "user",
      };
      setChatMessages((prevMessages) => [...prevMessages, chatMessage]);
    }

    setOutputMessage(" ");
    setOutputMultiTurn(null);
    setSourceDocuments(null);
    setCurrentConversationType(_conversationType);
    setConversationType(_conversationType);
    setInputMessage(_inputMessage);
    setLoading(true);

    let chatRequest: ChatRequest = {
      connection_id: "test",
      message_id: "test",
      message: _inputMessage,
      conversation_type: _conversationType,
      knowledge_type: knowledgeType,
      llm: localStorage.getItem("llm"),
      session_id: sessionId,
      multi_turn: _multiTurn,
    };

    try {
      const getUrl = () => {
        if (_conversationType === "knowledge") {
          return enableMultiTurn
            ? `${REACT_APP_API_URL}/bedrock/chat/multi-turn`
            : `${REACT_APP_API_URL}/bedrock/chat`;
        } else if (_conversationType === "external") {
          return `http://poc-genai-alb-app-server-1997415878.ap-northeast-2.elb.amazonaws.com/bedrock/chat`;
        }
        return `${REACT_APP_API_URL}/bedrock/chat`;
      };

      const response = await fetch(getUrl(), {
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

      const data = response.body;

      setLoading(true);

      const contentType = response.headers.get("Content-Type");
      if (contentType && contentType.includes("application/json")) {
        response.json().then((value) => {
          setOutputMultiTurn(value);
          setMultiTurn(true);
        });
      } else {
        let done = false;
        let isSourceDocuments = true;

        const source_documents_delimiter = "[#source_documents_delimiter#]";
        let streamingSourceDocuments = "";

        const reader = data.getReader();
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

          if (!isSourceDocuments || _conversationType === "general") {
            setOutputMessage((prevCode) => prevCode + chunkValue);
          }
        }
      }
    } catch (e) {
      alert(e);
    }

    setLoading(false);
  };

  // Main 화면 Title Button event handler
  const handleQuestionClick = (
    _question: string,
    _conversationType: string,
    _knowledgeType: string
  ) => {
    setHooking(true);
    setMultiTurn(true);
    setEnableMultiTurn(true);
    setInputMessage(_question);
    setInputMessageArr([_question]);
    setConversationType(_conversationType);
    setCurrentConversationType(_conversationType);
    setKnowledgeType(_knowledgeType);
  };

  useEffect(() => {
    if (hooking) {
      handleTranslate(inputMessage, conversationType, null);
      setHooking(false);
    }
  }, [inputMessageArr]);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    scrollBottom();
    setInProp(true);
  }, [
    chatMessages,
    outputMessage,
    chatContainerRef.current,
    loading,
    outputMultiTurn,
    multiTurn,
  ]);

  const scrollBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [outputMessage, outputMultiTurn]);

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
        {!outputMessage ? (
          <ChatTitle
            inProp={inProp}
            handleQuestionClick={handleQuestionClick}
          />
        ) : null}

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
            <MessageBoxIcon />
            {multiTurn && outputMultiTurn ? (
              <MessageBoxMultiTurn
                disabled={false}
                inputMessage={inputMessage}
                output={outputMultiTurn}
                loading={false}
                knowledgeType={knowledgeType}
                conversationType={currentConversationType}
                handleTranslate={handleTranslate}
                scrollBottom={scrollBottom}
              />
            ) : (
              <MessageBox
                output={outputMessage}
                sourceDocuments={sourceDocuments}
                loading={loading}
                conversationType={currentConversationType}
                handleTranslate={handleTranslate}
              />
            )}
          </Flex>
        </Flex>
      </Flex>

      <MessageInputBar
        borderColor={borderColor}
        inputColor={inputColor}
        handleTranslate={handleTranslate}
        loading={loading}
        setConversationType={setConversationType}
        setEnableMultiTurn={setEnableMultiTurn}
        setKnowledgeType={setKnowledgeType}
        conversationType={conversationType}
        enableMultiTurn={enableMultiTurn}
        knowledgeType={knowledgeType}
        onHeightChangeHandeler={handleHeightChange}
        multiTurnStatus={Boolean(multiTurn && outputMultiTurn)}
        handleQuestionClick={handleQuestionClick}
      />
    </Flex>
  );
}
