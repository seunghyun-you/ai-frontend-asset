import React, { useState } from "react";

// chakra imports
import {
  Box,
  Button,
  Flex,
  Drawer,
  DrawerBody,
  Icon,
  useColorModeValue,
  DrawerOverlay,
  useDisclosure,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import Content from "components/sidebar/components/Content";
import {
  renderThumb,
  renderTrack,
  renderView,
} from "components/scrollbar/Scrollbar";
import { Scrollbars } from "react-custom-scrollbars-2";

// Assets
import { IoMenuOutline } from "react-icons/io5";
import { HamburgerIcon } from "@chakra-ui/icons";
import { HiChevronLeft } from "react-icons/hi";
import { HiChevronRight } from "react-icons/hi";

function Sidebar(props: {
  routes: RoutesType[];
  isSidebarOpen?: boolean;
  sidebarHandler?: () => void;
  display?: string;
  [x: string]: any;
}) {
  const { routes, isSidebarOpen, sidebarHandler, ...rest } = props;

  let variantChange = "0.2s linear";
  let shadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.08)",
    "unset"
  );
  // Chakra Color Mode
  let sidebarBg = useColorModeValue("gray.800", "gray.800");
  let sidebarMargins = "0px";

  // SIDEBAR
  return (
    <>
      <Button
        position="fixed"
        top="18px"
        left={isSidebarOpen ? "200px" : "10px"}
        zIndex={2}
        onClick={sidebarHandler}
        variant="ghost"
        color={isSidebarOpen ? "white" : "gray.600"}
        _hover={{ bg: "transparent" }}
      >
        {isSidebarOpen ? <HiChevronLeft /> : <HiChevronRight />}
      </Button>
      <Box
        display={{ sm: "none", xl: isSidebarOpen ? "block" : "none" }}
        position="fixed"
        minH="100%"
      >
        <Box
          bg={sidebarBg}
          transition={variantChange}
          w="250px"
          h="100vh"
          m={sidebarMargins}
          minH="100%"
          overflowX="hidden"
          boxShadow={shadow}
        >
          <Scrollbars
            autoHide
            renderTrackVertical={renderTrack}
            renderThumbVertical={renderThumb}
            renderView={renderView}
          >
            <Content routes={routes} />
          </Scrollbars>
        </Box>
      </Box>
    </>
  );
}

// FUNCTIONS
// Browser 사이즈가 작아 질 때 반응형으로 Side bar를 좌측에 보여주기 위한 기능
// Navigation Bar에 표시되는 세 개의 줄 아이콘 모양으로 활성화/비활성화 가능
export function SidebarResponsive(props: { routes: RoutesType[] }) {
  let sidebarBackgroundColor = useColorModeValue("gray.800", "gray.800");
  let menuColor = useColorModeValue("gray.400", "white");
  // // SIDEBAR
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { routes } = props;
  const btnRef = React.useRef();

  return (
    <Flex display={{ sm: "flex", xl: "none" }} alignItems="center">
      <Flex ref={btnRef} w="max-content" h="max-content" onClick={onOpen}>
        <Icon
          as={IoMenuOutline}
          color={menuColor}
          my="auto"
          w="20px"
          h="20px"
          me="10px"
          _hover={{ cursor: "pointer" }}
        />
      </Flex>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement={document.documentElement.dir === "rtl" ? "right" : "left"}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent w="285px" maxW="285px" bg={sidebarBackgroundColor}>
          <DrawerCloseButton
            zIndex="3"
            onClick={onClose}
            _focus={{ boxShadow: "none" }}
            _hover={{ boxShadow: "none" }}
          />
          <DrawerBody maxW="285px" px="0rem" pb="0">
            <Scrollbars
              autoHide
              renderTrackVertical={renderTrack}
              renderThumbVertical={renderThumb}
              renderView={renderView}
            >
              <Content routes={routes} />
            </Scrollbars>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}
// PROPS

export default Sidebar;
