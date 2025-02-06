import React from "react";
import { Flex, Icon } from "@chakra-ui/react";
import { MdAutoAwesome } from "react-icons/md";
import { IconHeaderStyle, IconSize } from "./ChattingStyle";

interface MessageBoxIconProps {
  mt?: string | number; // mt 값을 받을 수 있도록 정의합니다.
}

export default function MessageBoxIcon({ mt }: MessageBoxIconProps) {
  return (
    <Flex
      {...IconHeaderStyle}
      bg="linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%)"
      mt={mt}
    >
      <Icon {...IconSize} as={MdAutoAwesome} color="white" />
    </Flex>
  );
}
