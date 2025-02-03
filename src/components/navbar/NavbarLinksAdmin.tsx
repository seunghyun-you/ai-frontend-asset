// Chakra Imports
import {
  Avatar,
  Button,
  Flex,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  useColorMode,
  Link,
  Input,
  InputGroup,
  InputLeftElement,
  Divider,
} from "@chakra-ui/react";
// Custom Components
import { SidebarResponsive } from "components/sidebar/Sidebar";
import PropTypes from "prop-types";
import { useState } from "react";
// Assets
import { FaUser } from "react-icons/fa";
import { IoMdMoon, IoMdSunny } from "react-icons/io";
import routes from "routes";


export default function HeaderLinks(props: { secondary: boolean }) {
  const { secondary } = props;
  const { colorMode, toggleColorMode } = useColorMode();
  // Chakra Color Mode
  let menuBg = useColorModeValue("white", "navy.800");

  const navbarIcon = useColorModeValue("gray.400", "white");
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const borderColor = useColorModeValue("#E6ECFA", "rgba(135, 140, 189, 0.3)");
  const shadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.18)",
    "14px 17px 40px 4px rgba(112, 144, 176, 0.06)"
  );

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <Flex
      w={{ sm: "100%", md: "auto" }}
      alignItems="center"
      flexDirection="row"
      flexWrap={secondary ? { base: "wrap", md: "nowrap" } : "unset"}
      p="10px"
      px={5}
      borderRadius="30px"
    >
      {/* 반응형으로 웹 브라우저 사이즈가 작아질 때만 Side bar를 보기위한 버튼을 만들어주는 컴포넌트 */}
      <SidebarResponsive routes={routes} />

      {/* 화면 화이트/블랙 전환 버튼 */}
      <Button
        variant="no-hover"
        bg="transparent"
        p="0px"
        minW="unset"
        minH="unset"
        h="18px"
        w="max-content"
        onClick={toggleColorMode}
      >
        <Icon
          me="10px"
          h="18px"
          w="18px"
          color={navbarIcon}
          as={colorMode === "light" ? IoMdSunny : IoMdMoon}
        />
      </Button>

      {/* 사용자 정보를 보여주는 버튼 */}
      <Menu>
        <MenuButton p="0px">
          <Icon
            w="18px"
            h="18px"
            me="5px"
            mt="6px"
            color={navbarIcon}
            as={FaUser}
          />
        </MenuButton>
        <MenuList
          boxShadow={shadow}
          p="0px"
          mt="10px"
          borderRadius="20px"
          bg={menuBg}
          border="none"
        >
          <Flex w="100%" mb="0px">
            <Text
              ps="20px"
              pt="16px"
              pb="10px"
              w="100%"
              borderBottom="1px solid"
              borderColor={borderColor}
              fontSize="sm"
              fontWeight="700"
              color={textColor}
            >
              👋&nbsp; Hey, {sessionStorage.getItem("username")}
            </Text>
          </Flex>
          <Flex flexDirection="column" p="10px">
            <MenuItem
              _hover={{ bg: "none" }}
              _focus={{ bg: "none" }}
              color="red.400"
              borderRadius="8px"
              px="14px"
              onClick={handleLogout}
            >
              <Text fontSize="sm">Logout</Text>
            </MenuItem>
          </Flex>
        </MenuList>
      </Menu>
    </Flex>
  );
}

HeaderLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func,
};
