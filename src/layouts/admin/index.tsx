// Chakra imports
import { Portal, Box, useDisclosure } from "@chakra-ui/react";
import Navbar from "components/navbar/NavbarAdmin";
import Sidebar from "components/sidebar/Sidebar";
import { SidebarContext } from "contexts/SidebarContext";
import { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import routes from "routes";

// Custom Chakra theme
export default function Dashboard(props: { [x: string]: any }) {
  const { ...rest } = props;
  // states and functions
  const [fixed] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  // functions for changing the states from components
  const getRoute = () => {
    return window.location.pathname !== "/admin/full-screen-maps";
  };
  const getActiveRoute = (routes: RoutesType[]): string => {
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Default brand name";
  };
  const getActiveNavbar = (routes: RoutesType[]): boolean => {
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        return routes[i].secondary;
      }
    }
    return false;
  };
  const getActiveNavbarText = (routes: RoutesType[]): string | boolean => {
    for (let i = 0; i < routes.length; i++) {
      if (
        window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
      ) {
        return routes[i].name;
      }
    }
    return false;
  };
  const getRoutes = (routes: RoutesType[]): any => {
    return routes.map((route: RoutesType, key: any) => {
      if (route.layout === "/admin") {
        return (
          <Route
            path={route.layout + route.path}
            component={route.component}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  document.documentElement.dir = "ltr";
  const { onOpen } = useDisclosure();

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const sidebarHandler = () => setIsSidebarOpen(!isSidebarOpen);
  return (
    <Box>
      <SidebarContext.Provider
        value={{
          toggleSidebar,
          setToggleSidebar,
        }}
      >
        <Sidebar
          routes={routes}
          isSidebarOpen={isSidebarOpen}
          sidebarHandler={sidebarHandler}
          display="none"
          {...rest}
        />
        <Box
          float="right"
          minHeight="100vh"
          height="100%"
          overflow="auto"
          position="relative"
          maxHeight="100%"
          w={
            isSidebarOpen
              ? { base: "100%", xl: "calc( 100% - 240px )" }
              : "100%"
          }
          maxWidth={
            isSidebarOpen
              ? { base: "100%", xl: "calc( 100% - 240px )" }
              : "100%"
          }
          ml={isSidebarOpen ? { base: 0, xl: "240px" } : 0}
          transition="all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
          transitionDuration=".2s, .2s, .35s"
          transitionProperty="top, bottom, width"
          transitionTimingFunction="linear, linear, ease"
        >
          <Portal>
            <Box
              position="fixed"
              top={{ base: "12px", md: "16px", xl: "18px" }}
              left={isSidebarOpen ? { base: 0, xl: "300px" } : 0}
              right="0"
            >
              <Navbar
                onOpen={onOpen}
                logoText={"Horizon UI Dashboard PRO"}
                brandText={getActiveRoute(routes)}
                secondary={getActiveNavbar(routes)}
                message={getActiveNavbarText(routes)}
                fixed={fixed}
                {...rest}
              />
            </Box>
          </Portal>

          {getRoute() ? (
            <Box
              mx="auto"
              p={{ base: "20px", md: "30px" }}
              pe="20px"
              minH="100vh"
              pt="50px"
            >
              <Switch>
                {getRoutes(routes)}
                <Redirect from="/" to="/admin/default" />
              </Switch>
            </Box>
          ) : null}
          {/*<Box>*/}
          {/*	<Footer />*/}
          {/*</Box>*/}
        </Box>
      </SidebarContext.Provider>
    </Box>
  );
}
