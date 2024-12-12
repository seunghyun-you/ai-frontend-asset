import React from "react";
import {Flex, Icon} from "@chakra-ui/react";
import TextareaAutosize from 'react-textarea-autosize';
import { MdPerson } from "react-icons/md";
import { IconHeaderStyle, IconSize } from "./ChattingStyle";


interface MessageBoxPersonProps {
  borderColor: string;
  brandColor: string;
  textColor: string;
  bgColor: string;
  chat: string;
}

export default function MessageBoxPerson(
    {
        borderColor,
        brandColor,
        textColor,
        bgColor,
        chat
    }: MessageBoxPersonProps
) {
  return (
    <Flex w="100%" align={"center"} mb="10px" zIndex='0'>
      <Flex
        {...IconHeaderStyle}
        bg={"transparent"}
        border="1px solid"
        borderColor={borderColor}
      >
        <Icon {...IconSize} as={MdPerson} color={brandColor} />
      </Flex>
      <Flex
        p="22px"
        backgroundColor={bgColor}
        borderRadius="30px"
        borderTopLeftRadius="0px"
        // borderBottomLeftRadius="20px"
        w="100%"
        zIndex={"2"}
      >
        <TextareaAutosize
          color={textColor}
          maxRows={10}
          cacheMeasurements
          value={chat}
          style= {{
              background: 'transparent',
              width: '100%',
              scrollbarWidth: 'none',
              resize: 'none',
              // fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI","Noto Sans",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"'
        }}
        >

        </TextareaAutosize>
      </Flex>
    </Flex>
  );
}
