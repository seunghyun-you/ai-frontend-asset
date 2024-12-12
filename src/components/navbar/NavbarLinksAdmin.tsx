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
import { IoMdMoon, IoMdSunny } from "react-icons/io";
import { GrDocumentPdf } from "react-icons/gr";
import { SearchIcon } from "@chakra-ui/icons";
import routes from "routes";


export default function HeaderLinks(props: { secondary: boolean }) {
  const { secondary } = props;
  const { colorMode, toggleColorMode } = useColorMode();
  // Chakra Color Mode
  let menuBg = useColorModeValue("white", "navy.800");

  const navbarIcon = useColorModeValue("gray.400", "white");
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.700", "brand.400");
  const borderColor = useColorModeValue("#E6ECFA", "rgba(135, 140, 189, 0.3)");
  const shadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.18)",
    "14px 17px 40px 4px rgba(112, 144, 176, 0.06)"
  );
  const menuColor = useColorModeValue("aliceblue", "blue");

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    window.location.href = "/";
  };
  // `${REACT_APP_API_URL}/auth/verify`
  const [searchTerm, setSearchTerm] = useState("");
  const [searchPage, setSearchPage] = useState("");
  const pdfUrlPath = "https://aj-genai-bucket-preprocessing.s3.ap-northeast-2.amazonaws.com/origianal_document";
  const manuals = [
    {
      name: "Toyota Manual [7FBR10_18]",
      link: `${pdfUrlPath}/toyota_manual.pdf#page=${searchPage}`,
    },
    {
      name: "Toyota Parts Book [7FBR10_18]",
      link: `${pdfUrlPath}/toyota_parts_book.pdf#page=${searchPage}`,
    },
    {
      name: "Doosan Manual [D20/25/30/33S(SE)_7]",
      link: `${pdfUrlPath}/doosan_manual.pdf#page=${searchPage}`,
    },
    {
      name: "Doosan Parts Book [D20/25/30/33S(SE)_7]",
      link: `${pdfUrlPath}/doosan_parts_book.pdf#page=${searchPage}`,
    },
  ];
  const filteredManuals = manuals.filter((manual) =>
    manual.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Flex
      w={{ sm: "100%", md: "auto" }}
      alignItems="center"
      flexDirection="row"
      bg={menuBg}
      flexWrap={secondary ? { base: "wrap", md: "nowrap" } : "unset"}
      p="10px"
      px={5}
      borderRadius="30px"
      boxShadow={shadow}
    >
      <SidebarResponsive routes={routes} />
      <Menu closeOnSelect={false}>
        <MenuButton p="0px">
          <Icon
            mt="6px"
            as={GrDocumentPdf}
            color={navbarIcon}
            w="18px"
            h="18px"
            me="10px"
          />
        </MenuButton>
        <MenuList
          boxShadow={shadow}
          p="20px"
          borderRadius="20px"
          bg={menuBg}
          border="none"
          mt="22px"
          me={{ base: "30px", md: "unset" }}
          width="auto"
        >
          <Flex w="100%" mb="20px">
            <Text
              fontSize="md"
              fontWeight="600"
              ml="1px"
              color={textColor}>
              PDF File Link
            </Text>
            <Text
              fontSize="sm"
              fontWeight="500"
              color={textColorBrand}
              ms="auto"
              mr="5px"
            >
              AJ Networks
            </Text>
          </Flex>

          <Divider mt="-10px" mb="10px" borderColor="gray.400">
          </Divider>

          <InputGroup mb="20px">
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  (e.target as HTMLInputElement).blur();
                }
              }}
              mr={3}
              inputMode="search"
            />
            <Input
              type="text"
              placeholder="Page"
              pl={3}
              value={searchPage}
              onChange={(e) => setSearchPage(e.target.value)}
              width="100px"
              _placeholder={{ fontSize: "sm", textAlign: "center" }}
            />
          </InputGroup>
          <Flex flexDirection="column">
            {filteredManuals.map((manual) => (
              <MenuItem
                key={manual.name}
                _hover={{ bg: menuColor }}
                _focus={{ bg: menuColor }}
                px="5"
                borderRadius="8px"
                mb="10px"
              >
                <Flex ml={-3} alignItems="center" justifyContent={"space-between"}>
                  <Link href={manual.link} target="_blank">
                    {manual.name}
                  </Link>
                </Flex>
              </MenuItem>
            ))}
          </Flex>
        </MenuList>
      </Menu>
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
          as={colorMode === "light" ? IoMdMoon : IoMdSunny}
        />
      </Button>
      <Menu>
        <MenuButton p="0px">
          <Avatar
            color="white"
            name="A J"
            bg="#11047A"
            size="sm"
            w="40px"
            h="40px"
            _hover={{ cursor: "pointer" }}
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
