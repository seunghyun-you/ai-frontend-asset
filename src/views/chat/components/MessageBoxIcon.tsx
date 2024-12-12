import React from "react";
import { Flex, Icon } from "@chakra-ui/react";
import { MdAutoAwesome } from "react-icons/md";
import { IconHeaderStyle, IconSize } from "./ChattingStyle";

export default function MessageBoxIcon() {
  return (
    <Flex
      {...IconHeaderStyle}
      bg="linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%)"
    >
      <Icon {...IconSize} as={MdAutoAwesome} color="white" />
    </Flex>
  );
}
