import {
	Center,
	Flex,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';

import React from 'react';
import { mainTitleWrapper } from "./ChattingStyle";
import { CSSTransition } from "react-transition-group";

interface ChatTitleProps {
	inProp: boolean;
}

export default function ChatTitle(
	{
		inProp,
	}: ChatTitleProps
) {
	const nodeRef = React.useRef(null)

	const titleColor = useColorModeValue("gray.600", "white");
	const textBgGradient = useColorModeValue(
		"linear-gradient(to right, skyblue, purple, coral)",
		"linear-gradient(to right, skyblue, purple, coral)"
	);

	return (
		<CSSTransition
			nodeRef={nodeRef}
			in={inProp}
			timeout={30000}
			classNames="chat-title"
			unmountOnExit
		>
			<Flex {...mainTitleWrapper} ref={nodeRef}>
				<Center>
					<Text
						fontWeight="500"
						fontSize={{ base: "md", md: "lg" }}
						lineHeight={{ base: "24px", md: "26px" }}
						color={titleColor}
						marginBottom={5}
					>
						Hello, {sessionStorage.getItem("username")}
					</Text>
				</Center>
				<Center>
					<Text
						fontWeight="800"
						fontFamily="Arial Black"
						fontSize={{ base: "lg", md: "50px" }}
						lineHeight={{ base: "24px", md: "70px" }}
						bg={textBgGradient}
						backgroundClip='text'
						color='transparent'
						marginBottom={20}
						letterSpacing="wide"
					>
						How can I help you?
					</Text>
				</Center>
			</Flex>
		</CSSTransition>
	);
}
