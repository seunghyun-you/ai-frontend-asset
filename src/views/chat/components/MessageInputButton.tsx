import React from "react";
import {Button, Icon} from "@chakra-ui/react";
import {MdSend} from "react-icons/md";
import {SubmitActiveButtonStyle, SubnetInactiveButtonStle} from "./ChattingStyle";

interface MessageInputButtonProps {
  handleSubmit: () => void;
  loading: boolean;
  textInput: string;
}

export default function MessageInputButton(
    {
        handleSubmit,
        loading,
        textInput
    }: MessageInputButtonProps
) {

  const getButtonStyle = () => {
    if (textInput.trim() !== '') {
      return SubmitActiveButtonStyle
    }
    else {
      return SubnetInactiveButtonStle
    }
  }

  return (
    <Button 
      {...getButtonStyle()}
      onClick={handleSubmit}
      isLoading={loading}
    >
      <Icon as={MdSend} width="15px"  height="15px"  color='inherit' />
    </Button>
  );
}
