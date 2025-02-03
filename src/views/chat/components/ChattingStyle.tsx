import { FlexProps } from "@chakra-ui/react";
import { CSSProperties } from "react";

export const IconHeaderStyle: FlexProps = {
  borderRadius: "full",
  justify: "center",
  align: "center",
  me: "20px",
  h: "40px",
  minH: "40px",
  minW: "40px",
};

export const IconSize = {
  width: "20px",
  height: "20px",
};

interface MainBoxWrapperProps extends FlexProps {
  outputMessage: string;
  height: any;
}

export const mainBoxWrapper = ({ outputMessage, height }: MainBoxWrapperProps) => ({
  id: "main-box",
  w: "100%",
  mx: "auto",
  display: outputMessage ? "flex" : "none",
  // mb: "auto",
  maxH: { base: "70vh", md: `calc(70vh - ${height}px)` },
  overflow: 'auto',
  paddingLeft: '1vh',
  paddingRight: '1vh',
  sx: {
    '&::-webkit-scrollbar': {
      width: '5px',
    },
    '&::-webkit-scrollbar-track': {
      width: '5px',
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'snow',
      borderRadius: '100px',
    },
  },
});

export const ContainerWrapper: FlexProps = {
  w: "97%",
  pt: { base: "70px", md: "0px" },
  direction: "column",
  position: "absolute",
  mb: { base: "30px", md: "5vh" },
  // px: { base: "25px", md: "0px" },
  mt: { base: "40px", md: "10vh" },
};

export const mainTitleWrapper: FlexProps = {
  id: "main-box-title",
  flexDirection: 'column',
  // w: { base: "80%", md: "80%", lg: "60%" },
  mx: "auto",
  mb: "auto",
  mt: '50px',
  h: "50vh",
  alignItems: 'center',
  justifyContent: 'center',
};

export const SubmitButtonStyle = {
  variant: "primary",
  py: "20px",
  px: "16px",
  fontSize: "sm",
  color: "white",
  borderRadius: "45px",
  ms: "auto",
  my: "auto",
  w: { base: "2vw", md: "2vw" },
  h: { base: "2vw", md: "2vw" },
  bg: "linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%) !important",
  _hover: {
    boxShadow: "0px 21px 27px -10px rgba(96, 60, 255, 0.48) !important",
    bg: "linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%) !important",
    _disabled: {
      bg: "linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%)",
    },
  },
};

export const SubmitActiveButtonStyle = {
  // variant: "primary",
  py: "5px",
  px: "0px",
  fontSize: "sm",
  color: "white",
  borderRadius: "5px",
  ms: "3px",
  my: "3px",
  w: "10px",
  h: "25px",
  bg: "linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%) !important",
  _hover: {
    boxShadow: "0px 21px 27px -10px rgba(96, 60, 255, 0.48) !important",
    bg: "linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%) !important",
    _disabled: {
      bg: "linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%)",
    },
  },
};

export const SubnetInactiveButtonStle = {
  // variant: "primary",
  py: "5px",
  px: "0px",
  fontSize: "sm",
  color: "white",
  borderRadius: "5px",
  ms: "3px",
  my: "3px",
  w: "10px",
  h: "25px",
  bg: 'gray.300',
  _hover: {
    bg: 'gray.400',
  },
}

export const selectKnowledgeWrapper = {
  style: {
    fontSize: '13px',
    fontWeight: 'bold',
  } as CSSProperties,
  mr: "5px",
  w: '35px',
  minW: 'max-content',
  h: '20px',
  size: "md",
  borderRadius: '30px',
  bg: "black",
  color: "white",
  // alignSelf: "end",
  // ml: "20px",
  mb: "5px",
  _focus: {
    bg: "black",
    color: "white",
    // borderRadius:'30px',
  },
  _hover: {
    bg: "black",
    color: "deepskyblue",
    // borderRadius:'30px',
  },
  _expanded: {
    bg: 'white',
    borderColor: 'blue.500',
    borderRadius: 'md',
    boxShadow: 'lg',
  },
}



export const chatInputWrapper: FlexProps = {
  // ms: { base: '0px', xl: '60px' },
  // mt: "20px",
  flexDirection: 'column',
  alignItems: 'center',
  border: "none",
  borderColor: 'none',
  borderWidth: "0",
  position: "relative",
  marginTop: '5vh',
}

export const buttonWrapper = {
  w: '35px',
  h: '35px',
  size: "md",
  color: 'gray.400',
  borderRadius: '30px',
  _hover: {
    color: "deepskyblue",
  },
  _expanded: {
    bg: 'white',
    borderColor: 'blue.500',
    borderRadius: 'md',
    boxShadow: 'lg',
  },
}


export const selectMultiTurnKnowledgeWrapper = {
  style: {
    fontSize: '13px',
    fontWeight: 'bold',
  } as CSSProperties,
  mr: "5px",
  w: '35px',
  // minW: 'max-content',
  h: '35px',
  size: "md",
  borderRadius: '30px',
  // bg: "black",
  color: "white",
  // alignSelf: "end",
  // ml: "20px",
  // mt: "25px",
  _focus: {
    // bg: "black",
    color: "white",
    // borderRadius:'30px',
  },
  _hover: {
    // bg: "black",
    color: "deepskyblue",
    // borderRadius:'30px',
  },
  _expanded: {
    bg: 'white',
    borderColor: 'blue.500',
    borderRadius: 'md',
    boxShadow: 'lg',
  },
}

export const ConversationTypeSelectionButtonWrapper = {
  variant: "action",
  py: "20px",
  px: "16px",
  fontSize: "sm",
  color: "white",
  borderRadius: "45px",
  mr: '5px',
  my: "auto",
  w: { base: "2vw", md: "2vw" },
  h: { base: "2vw", md: "2vw" },
  bg: "linear-gradient(15.46deg, #d9e6f2 26.3%, #c8dff0 86.4%) !important",
  _hover: {
    boxShadow: "0px 21px 27px -10px rgba(150, 150, 150, 0.48) !important",
    bg: "linear-gradient(15.46deg, #d9e6f2 26.3%, #c8dff0 86.4%) !important",
    _disabled: {
      bg: "linear-gradient(15.46deg, #d9e6f2 26.3%, #c8dff0 86.4%)"
    }
  }
};

export const ConversationTypeSelectionCardWrapper = {
  _hover: {
    boxShadow: "0px 21px 27px -10px rgba(96, 60, 255, 0.48) !important",
    bg: "rgba(0, 0, 255, 0.1) !important",
    borderRadius: "20px",
    _disabled: {
      bg: "linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%)",
    },
  },
};

export const AnswerUtilIconWrapper = {
  w: "20px",
  h: "20px",
  ml: '5px',
  cursor: "pointer",
  color: 'gray',
  _hover: {
    boxShadow: "0px 21px 27px -10px rgba(96, 60, 255, 0.48) !important",
    bg: "rgba(0, 0, 255, 0.1) !important",
    borderRadius: "5px",
    _disabled: {
      bg: "linear-gradient(15.46deg, #4A25E1 26.3%, #7B5AFF 86.4%)",
    },
  },
};