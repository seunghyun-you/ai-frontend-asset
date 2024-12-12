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
import { SavedFile } from "../../../types/types";
import noImage from "assets/img/no_image.png";
import PDFsymbol from "assets/img/chat/PDF_SYMBOL.png";
import Card from "components/card/Card";

import { CSSTransition } from "react-transition-group";
import {
  MdContentCopy,
  MdOutlineArticle,
  MdOutlineReplay,
} from "react-icons/md";

import MaintenanceSourceDocument from "./MaintenanceSourceDocument";
import MessageBoxMarkDown from "./MessageBoxMarkDown";
import { createThumbnailUrl, getThumbnailUrl } from "./ThumbnailCache";
import { copyToClipboard } from "./MessageUtils";
import { AnswerUtilIconWrapper } from "./ChattingStyle";

import { REACT_APP_API_URL } from "../../../config";

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
  const bg = useColorModeValue("white", "navy.700");
  const titleColor = useColorModeValue("black.600", "black.600");
  const brandColor = useColorModeValue("brand.500", "white");
  const [components, setComponents] = useState<React.ReactNode[]>([]);

  useEffect(() => {
    if (Array.isArray(sourceDocuments)) {
      Promise.all(
        sourceDocuments.map(async (sourceDocument: any, index: number) => {
          const pageContentMatch = sourceDocument.match(
            /page_content='([^']*)'/
          );
          const pageContent = pageContentMatch ? pageContentMatch[1] : null;

          const metadataMatch = sourceDocument.match(/metadata=({[^}]*})/);
          const metadataStr = metadataMatch ? metadataMatch[1] : null;
          const metadata = metadataStr
            ? JSON.parse(metadataStr.replace(/'/g, '"'))
            : null;

          let image = noImage;

          if ("knowledge_type" in metadata) {
            if (metadata.knowledge_type === "maintenance") {
              const uuid = metadata.uuid[0];
              const filename = metadata.filename[0];

              if (uuid && filename) {
                const cachedUrl = getThumbnailUrl(uuid);
                if (cachedUrl) {
                  image = cachedUrl;
                } else {
                  const savedFile: SavedFile = {
                    uuid: uuid,
                    filename: filename,
                  };

                  let imageFile = await handleFileDownload(savedFile);

                  if (imageFile) {
                    image = URL.createObjectURL(imageFile);
                    createThumbnailUrl(image, uuid);
                  }
                }
              }
              return (
                <MaintenanceSourceDocument
                  key={index}
                  boxShadow="0px 18px 40px rgba(112, 144, 176, 0.08)"
                  mb="5px"
                  image={image ? image : null}
                  ranking={(index + 1).toString()}
                  link={`${window.location.origin}/#/admin/maintenance/${metadata.id}`}
                  w="98%"
                  abnormalPart="엔진"
                  abnormalSymptom={truncatePageContent(
                    metadata.abnormal_symptom,
                    20
                  )}
                  abnormalSymptomDetails={truncatePageContent(
                    metadata.action_details,
                    150
                  )}
                />
              );
            }
            if (
              metadata.knowledge_type === "manual" ||
              metadata.knowledge_type === "parts_book"
            ) {
              return (
                <Card
                  bg={bg}
                  w="24%"
                  p="14px"
                  boxShadow="0px 18px 40px rgba(112, 144, 176, 0.08)"
                  mb="5px"
                >
                  <Flex align="flex-start" direction="column">
                    <Flex align="center">
                      <Image
                        h="15px"
                        w="15px"
                        src={PDFsymbol}
                        borderRadius="none"
                        me="7px"
                      />
                      <Text
                        color={"gray.400"}
                        fontSize="15px"
                        fontWeight="500"
                        mr={3}
                      >
                        PDF
                      </Text>
                    </Flex>
                    <Text fontWeight="700" color={titleColor} fontSize="15px">
                      {metadata.title}
                    </Text>
                    <Link
                      color={brandColor}
                      fontWeight="500"
                      fontSize="14px"
                      noOfLines={1}
                      onClick={() =>
                        window.open(
                          `https://aj-genai-bucket-preprocessing.s3.ap-northeast-2.amazonaws.com/origianal_document/${metadata.file_name}#page=${metadata.page_number}`,
                          "_blank"
                        )
                      }
                    >
                      [Link] {metadata.knowledge_type.toUpperCase()} (
                      {metadata.page_number}P)
                    </Link>
                    <Text
                      fontWeight="400"
                      color={"gray.400"}
                      fontSize="14px"
                      me="4px"
                      noOfLines={1}
                    >
                      [Model] {metadata.model_name}
                    </Text>
                  </Flex>
                </Card>
              );
            }
          }
        })
      ).then((components) => {
        setComponents(components);
      });
    } else if (typeof sourceDocuments === "string") {
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

  const handleFileDownload = async (savedFile: SavedFile) => {
    if (savedFile) {
      try {
        const response = await fetch(
          `${REACT_APP_API_URL}/maintenances/1/files/download`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(savedFile),
          }
        );

        if (response.ok) {
          const blob = await response.blob();
          return new File([blob], savedFile.filename);
        } else {
          return null;
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const retryInputMessage = () => {
    handleTranslate();
  };

  const truncatePageContent = (pageContents: string, n: number) => {
    return pageContents.length > n
      ? pageContents.substring(0, n - 1) + "..."
      : pageContents;
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
