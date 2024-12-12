import "github-markdown-css/github-markdown.css";
import "../css/custom-markdown.css";

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

import Card from "components/card/Card";
import { MdContentCopy, MdOutlineArticle } from "react-icons/md";

import { HSeparator } from "../../../components/separator/Separator";
import { getThumbnailUrl } from "./ThumbnailCache";
import noImage from "assets/img/no_image.png";
import PDFsymbol from "assets/img/chat/PDF_SYMBOL.png";

import MaintenanceSourceDocumentHistory from "./MaintenanceSourceDocumentHistory";
import MessageBoxMarkDown from "./MessageBoxMarkDown";
import { copyToClipboard } from "./MessageUtils";
import { AnswerUtilIconWrapper } from "./ChattingStyle";

export default function MessageBoxHistory(props: {
  output: string;
  sourceDocuments: any;
  loading: boolean;
  conversationType: string;
  handleTranslate(): void;
}) {
  const { output, sourceDocuments, loading } = props;
  const textColor = useColorModeValue("navy.700", "white");
  const bg = useColorModeValue("white", "navy.700");
  const titleColor = useColorModeValue("black.600", "black.600");
  const brandColor = useColorModeValue("brand.500", "white");

  const truncatePageContent = (pageContents: string, n: number) => {
    return pageContents.length > n
      ? pageContents.substring(0, n - 1) + "..."
      : pageContents;
  };

  const handleConversationTypeText = () => {
    if (props.conversationType === "general") return "General";
    if (props.conversationType === "knowledge") return "Knowledge Base";
    if (props.conversationType === "external") return "External";
  };

  const handleConversationTypeBgColor = () => {
    if (props.conversationType === "general") return "deepskyblue";
    if (props.conversationType === "knowledge") return "palevioletred";
    if (props.conversationType === "external") return "yellowgreen";
  };

  return (
    <Card
      display={output ? "flex" : "none"}
      px="22px !important"
      pl="22px !important"
      color={textColor}
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
            as={MdContentCopy}
            onClick={() => copyToClipboard(output)}
          />
        </Flex>
      </Flex>

      <MessageBoxMarkDown output={output} />
      {sourceDocuments && sourceDocuments.length > 0 ? (
        <Flex mt="15px" flexDirection="column">
          <Flex mb={2}>
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
          <Flex flexWrap="wrap" w="100%" gap="10px" justifyContent="flex-start">
            {!loading
              ? !Array.isArray(sourceDocuments)
                ? sourceDocuments
                  .split("], [")
                  .map((item: any, index: number) => {
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
                      <Box key={index} w="100%">
                        <Link href={link} isExternal>
                          [{index + 1}] {title}
                        </Link>
                      </Box>
                    );
                  })
                : sourceDocuments.map((sourceDocument: any, index: number) => {
                  const pageContentMatch = sourceDocument.match(
                    /page_content='([^']*)'/
                  );
                  const pageContent = pageContentMatch
                    ? pageContentMatch[1]
                    : null;

                  // metadata 추출
                  const metadataMatch =
                    sourceDocument.match(/metadata=({[^}]*})/);
                  const metadataStr = metadataMatch ? metadataMatch[1] : null;
                  const metadata = metadataStr
                    ? JSON.parse(metadataStr.replace(/'/g, '"'))
                    : null;

                  let image = noImage;

                  if ("knowledge_type" in metadata) {
                    if (metadata.knowledge_type === "maintenance") {
                      const cachedUrl = getThumbnailUrl(metadata.uuid[0]);
                      if (cachedUrl) {
                        image = cachedUrl;
                      }
                      return (
                        <MaintenanceSourceDocumentHistory
                          key={index}
                          w="48%"
                          boxShadow="0px 18px 40px rgba(112, 144, 176, 0.08)"
                          mb="5px"
                          image={image ? image : null}
                          ranking={(index + 1).toString()}
                          link={`/admin/maintenance/${metadata.id}`}
                          title={truncatePageContent(
                            metadata.abnormal_symptom,
                            20
                          )}
                        />
                      );
                    } else if (
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
                              >
                                PDF
                              </Text>
                            </Flex>
                            <Text
                              fontWeight="700"
                              color={titleColor}
                              fontSize="15px"
                            >
                              {metadata.title} 관련 문서
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
                              · {metadata.file_name}
                            </Link>
                            <Text
                              fontWeight="400"
                              color={"gray.400"}
                              fontSize="14px"
                              me="4px"
                              noOfLines={1}
                            >
                              · [{metadata.brand_name}] {metadata.model_name}
                            </Text>
                          </Flex>
                        </Card>
                      );
                    }
                  }
                })
              : null}
          </Flex>
        </Flex>
      ) : null}
    </Card>
  );
}
