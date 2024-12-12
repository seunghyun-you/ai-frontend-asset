import React, { useEffect, useState, useRef } from "react";

import "views/chat/css/css-transition.css";

import {
  Button,
  Flex,
  Icon,
  SimpleGrid,
  Text,
  useColorModeValue,
  Input,
} from "@chakra-ui/react";

import Card from "components/card/Card";
import { CSSTransition } from "react-transition-group";
import { MdReplay } from "react-icons/md";

import { MultiTurn } from "../../../types/types";
import { SubmitButtonStyle } from "./ChattingStyle";

import MessageBoxMultiTurnSelector from "./MessageBoxMultiTurnSelector";

import {
  brandNameOptions,
  modelNameOptions,
  errorCodeOptions,
  toyotaPartsNameOptions,
  doosanPartsNameOptions,
} from "variables/selectOptionList"

interface MessageBoxMultiTurnProps {
  disabled: boolean;
  inputMessage: string;
  output: MultiTurn;
  loading: boolean;
  conversationType: string;
  knowledgeType: string;
  handleTranslate: (
    inputMessage: string,
    conversationTypeParam: string,
    multiTurn: MultiTurn
  ) => void;
  scrollBottom: () => void;
}

export default function MessageBoxMultiTurn({
  disabled,
  inputMessage,
  output,
  loading,
  conversationType,
  knowledgeType,
  handleTranslate,
  scrollBottom,
}: MessageBoxMultiTurnProps) {
  const [selectedModelName, setSelectedModelName] = useState("");
  const [selectedBrandName, setSelectedBrandName] = useState("");
  const [selectedErrorCode, setSelectedErrorCode] = useState("");
  const [selectedPartsName, setSelectedPartsName] = useState("");
  const [inputQueryText, setInputQueryText] = useState<string>("");
  const [inputAbnormalSymptom, setInputAbnormalSymptom] = useState<string>("");
  const [inputQuery, setInputQuery] = useState<string>("");

  const textColorSecondary = useColorModeValue("blue.400", "white");

  const textColor = useColorModeValue("navy.700", "white");
  const maintenanceInputFormLabel = {
    display: "flex",
    ms: "4px",
    fontSize: "sm",
    fontWeight: "500",
    color: textColor,
    mb: "3px",
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

  const isNullOrEmpty = (value: string | undefined) =>
    value === null || value === undefined || value.trim() === "";

  const handleReSubmit = () => {
    let multiTurn: MultiTurn;

    if (selectedBrandName === "TOYOTA") {
      if (knowledgeType === "manual" || knowledgeType === "maintenance") {
        if (
          isNullOrEmpty(selectedBrandName) ||
          isNullOrEmpty(selectedModelName) ||
          isNullOrEmpty(selectedErrorCode)
        ) {
          alert("Check Multi-turn Input");
          return;
        }
        if (selectedErrorCode === "No Error Code") {
          multiTurn = {
            brand_name: selectedBrandName,
            model_name: selectedModelName,
            error_code: selectedErrorCode,
            input_query: inputAbnormalSymptom,
          };
        } else {
          multiTurn = {
            brand_name: selectedBrandName,
            model_name: selectedModelName,
            error_code: selectedErrorCode,
          };
        }
      } else if (knowledgeType === "parts_book") {
        if (
          isNullOrEmpty(selectedBrandName) ||
          isNullOrEmpty(selectedModelName) ||
          isNullOrEmpty(selectedPartsName)
        ) {
          alert("Check Multi-turn Input");
          return;
        }
        multiTurn = {
          brand_name: selectedBrandName,
          model_name: selectedModelName,
          parts_name: selectedPartsName,
        };
      }
    } else if (selectedBrandName === "DOOSAN") {
      if (knowledgeType === "manual") {
        if (
          isNullOrEmpty(selectedBrandName) ||
          isNullOrEmpty(selectedModelName) ||
          isNullOrEmpty(inputQuery)
        ) {
          alert("Check Multi-turn Input");
          return;
        }
        multiTurn = {
          brand_name: selectedBrandName,
          model_name: selectedModelName,
          input_query: inputQuery,
        };
      } else if (knowledgeType === "parts_book") {
        if (
          isNullOrEmpty(selectedBrandName) ||
          isNullOrEmpty(selectedModelName) ||
          isNullOrEmpty(selectedPartsName)
        ) {
          alert("Check Multi-turn Input");
          return;
        }
        multiTurn = {
          brand_name: selectedBrandName,
          model_name: selectedModelName,
          parts_name: selectedPartsName,
        };
      }
    }

    handleTranslate(inputMessage, conversationType, multiTurn);
  };

  const isValid =
    !isNullOrEmpty(selectedModelName) &&
    !isNullOrEmpty(selectedBrandName) &&
    ((selectedBrandName === "TOYOTA" && !isNullOrEmpty(selectedErrorCode)) ||
      (selectedBrandName === "DOOSAN" && !isNullOrEmpty(inputQueryText)) ||
      (knowledgeType === "parts_book" && !isNullOrEmpty(selectedPartsName)));

  useEffect(() => {
    setSelectedBrandName(output.brand_name ?? "");
    setSelectedModelName(output.model_name ?? "");
    setSelectedErrorCode(output.error_code ?? "");
    setSelectedPartsName(output.parts_name ?? "");

    if (output.brand_name === "TOYOTA" && knowledgeType === "manual") {
      setInputAbnormalSymptom(output.input_query ?? "");
    } else if (output.brand_name === "DOOSAN" && knowledgeType === "manual") {
      setInputQuery(output.input_query ?? "");
    } else {
      setInputQueryText(output.input_query ?? "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [output]);

  const SimpleGridRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (entry.target === SimpleGridRef.current) {
          scrollBottom();
        }
      }
    });

    if (SimpleGridRef.current) {
      resizeObserver.observe(SimpleGridRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [scrollBottom]);

  return (
    <Card mb={{ base: "0px", "2xl": "20px" }}>
      <Flex justifyContent="space-between" mb="10px">
        <Button
          h="25px"
          bg={handleConversationTypeBgColor()}
          color="white"
          fontSize="me"
        >
          {handleConversationTypeText()}
        </Button>
      </Flex>

      {/* <Text color={textColorPrimary} fontSize="sm" mt="10px" mb="10px">
        입력된 사용자 질문 : {inputMessage}
      </Text> */}
      <Text
        color={textColorSecondary}
        fontSize="16px"
        fontWeight="bold"
        mt="10px"
        mb="40px"
      >
        정확한 정보 검색과 답변을 위해 아래 내용을 추가 입력 해 주세요.
      </Text>
      <SimpleGrid ref={SimpleGridRef} columns={1} gap="20px" mb="15px">
        <MessageBoxMultiTurnSelector
          title="Brand Name"
          value={
            selectedBrandName
              ? { value: selectedBrandName, label: selectedBrandName }
              : null
          }
          options={brandNameOptions}
          isMulti={true}
          isClearable={true}
          setMultiTurnValue={setSelectedBrandName}
        />
        <MessageBoxMultiTurnSelector
          title="Model Name"
          value={
            selectedModelName
              ? { value: selectedModelName, label: selectedModelName }
              : null
          }
          options={modelNameOptions}
          isMulti={true}
          isClearable={true}
          setMultiTurnValue={setSelectedModelName}
        />
        {selectedBrandName === "TOYOTA" &&
          (knowledgeType === "manual" || knowledgeType === "maintenance") ? (
          <>
            <MessageBoxMultiTurnSelector
              title="Error Code"
              value={
                selectedErrorCode
                  ? { value: selectedErrorCode, label: selectedErrorCode }
                  : null
              }
              options={errorCodeOptions}
              isMulti={true}
              isClearable={true}
              setMultiTurnValue={setSelectedErrorCode}
            />
            {selectedErrorCode === "No Error Code" && (
              <Flex flexDirection="column">
                <Text {...maintenanceInputFormLabel}> Abnormal Symptom </Text>
                <Input
                  border="1px solid #E2E8F0"
                  borderRadius="15px"
                  minHeight="60px"
                  fontSize="0.875rem"
                  fontWeight="500"
                  value={inputAbnormalSymptom}
                  placeholder="Enter abnormal symptom"
                  _placeholder={{ color: "grey.200" }}
                  onChange={(e: any) => setInputAbnormalSymptom(e.target.value)}
                />
              </Flex>
            )}
          </>
        ) : selectedBrandName === "TOYOTA" && knowledgeType === "parts_book" ? (
          <MessageBoxMultiTurnSelector
            title="Parts Name"
            value={
              selectedPartsName
                ? { value: selectedPartsName, label: selectedPartsName }
                : null
            }
            options={toyotaPartsNameOptions}
            isMulti={true}
            isClearable={true}
            setMultiTurnValue={setSelectedPartsName}
          />
        ) : selectedBrandName === "DOOSAN" && knowledgeType === "manual" ? (
          <Flex flexDirection="column">
            <Text {...maintenanceInputFormLabel}> Enter your question </Text>
            <Input
              border="1px solid #E2E8F0"
              borderRadius="15px"
              minHeight="60px"
              fontSize="0.875rem"
              fontWeight="500"
              value={inputQuery}
              placeholder="Enter yout question"
              onChange={(e: any) => setInputQuery(e.target.value)}
            />
          </Flex>
        ) : selectedBrandName === "DOOSAN" && knowledgeType === "parts_book" ? (
          <MessageBoxMultiTurnSelector
            title="Parts Name"
            value={
              selectedPartsName
                ? { value: selectedPartsName, label: selectedPartsName }
                : null
            }
            options={doosanPartsNameOptions}
            isMulti={true}
            isClearable={true}
            setMultiTurnValue={setSelectedPartsName}
          />
        ) : null}
      </SimpleGrid>
      <CSSTransition
        in={!loading}
        timeout={2000}
        classNames="source-documents"
        unmountOnExit
      >
        <Button
          {...SubmitButtonStyle}
          isDisabled={disabled || !isValid}
          w="160px"
          h="50px"
          mt={2}
          onClick={handleReSubmit}
        >
          <Icon
            as={MdReplay}
            width="20px"
            height="20px"
            color="inherit"
            mr="10px"
          />
          Re-Submit
        </Button>
      </CSSTransition>
    </Card>
  );
}
