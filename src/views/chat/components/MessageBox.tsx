import React, { useEffect, useState } from "react";

import "views/chat/css/css-transition.css";
import {
  Box,
  Button,
  Flex,
  Icon,
  Link,
  Text,
  useColorModeValue,
  Image,
} from "@chakra-ui/react";

import { HSeparator } from "../../../components/separator/Separator";
import Card from "components/card/Card";

import { CSSTransition } from "react-transition-group";
import {
  MdContentCopy,
  MdOutlineArticle,
  MdOutlineReplay,
} from "react-icons/md";

import MessageBoxMarkDown from "./MessageBoxMarkDown";
import { copyToClipboard } from "./MessageUtils";
import { AnswerUtilIconWrapper } from "./ChattingStyle";

interface MessageBoxProps {
  output: string;
  sourceDocuments: any;
  loading: boolean;
  conversationType: string;
  handleTranslate: () => void;
}

export default function MessageBox({
  output,
  sourceDocuments,
  loading,
  conversationType,
  handleTranslate,
}: MessageBoxProps) {
  const nodeRef = React.useRef(null);
  const textColor = useColorModeValue("navy.700", "white");
  const [components, setComponents] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    if (typeof sourceDocuments === "string") {
      Promise.all(
        sourceDocuments.split("], [").map((item: any, index: number) => {
          const titleAndLink = item.split("title:")[1];
          let title = titleAndLink.split("link:")[0];
          let link = titleAndLink.split("link:")[1];
          if (link.endsWith("]")) {
            link = link.slice(0, -1);
          }
          if (title.endsWith(", ")) {
            title = title.slice(0, -2);
          }
          return (
            <Box w="100%" key={index}>
              <Link href={link} isExternal>
                [{index + 1}] {title}
              </Link>
            </Box>
          );
        })
      ).then((components) => {
        setComponents(components);
      });
    }
  }, [sourceDocuments]);

  const retryInputMessage = () => {
    handleTranslate();
  };

  const handleConversationTypeText = () => {
    if (conversationType === "general") return "General";
    if (conversationType === "knowledge") return "Knowledge Base";
    if (conversationType === "external") return "External";
  };

  const handleConversationTypeBgColor = () => {
    if (conversationType === "general") return "deepskyblue";
    if (conversationType === "knowledge") return "palevioletred";
    if (conversationType === "external") return "yellowgreen";
  };


  return (
    <Card
      display={output ? "flex" : "none"}
      px="22px !important"
      pl="22px !important"
      color={textColor}
      // minH="100px"
      fontSize={{ base: "sm", md: "md" }}
      lineHeight={{ base: "24px", md: "26px" }}
      fontWeight="500"
    >
      {/*  react markdown 문법 참고: https://github.com/remarkjs/react-markdown#use-custom-components-syntax-highlight*/}
      <Flex justifyContent="space-between" mb="10px">
        <Button h="25px" bg={handleConversationTypeBgColor()} color="white" fontSize="me">
          {handleConversationTypeText()}
        </Button>
        <Flex justifyContent="flex-end" my="auto">
          <Icon
            {...AnswerUtilIconWrapper}
            as={MdOutlineReplay}
            onClick={retryInputMessage}
            style={{ display: handleTranslate ? "inline-block" : "none" }}
          />
          <Icon
            {...AnswerUtilIconWrapper}
            as={MdContentCopy}
            onClick={() => copyToClipboard(output)}
          />
        </Flex>
      </Flex>

      <MessageBoxMarkDown output={output} />
      {sourceDocuments && sourceDocuments.length > 0 ? (
        <Flex mt="15px" flexDirection="column">
          <CSSTransition
            nodeRef={nodeRef}
            in={!loading}
            timeout={2000}
            classNames="source-documents"
            unmountOnExit
          >
            <Flex ref={nodeRef} flexDirection="column">
              <Flex flexDirection="row" mb={2}>
                <Icon
                  as={MdOutlineArticle}
                  width="25px"
                  height="27px"
                  color="black.400"
                  my="auto"
                  mr={2}
                  pr="3px"
                />
                <Text my="auto" color="black.500" fontWeight="bold">
                  참고 자료
                </Text>
              </Flex>
              <HSeparator mb="15px" />
              <Flex
                flexWrap="wrap"
                w="100%"
                gap="10px"
                justifyContent="flex-start"
                p={0}
              >
                {!loading ? components : null}
              </Flex>
            </Flex>
          </CSSTransition>
        </Flex>
      ) : null}
    </Card>
  );
}
