import {
	Center,
	Flex,
	Text,
	Icon,
	Button,
	useColorModeValue,
} from '@chakra-ui/react';

import React from 'react';
import { mainTitleWrapper } from "./ChattingStyle";
import { CSSTransition } from "react-transition-group";

import { BsFillChatDotsFill } from "react-icons/bs";


interface ChatTitleProps {
	inProp: boolean;
	handleQuestionClick: (question: string, conversationType: string, knowledgeType: string) => void;
}

export default function ChatTitle(
	{
		inProp,
		handleQuestionClick,
	}: ChatTitleProps
) {
	const nodeRef = React.useRef(null)

	const textBgGradient = useColorModeValue(
		"linear(to-r, purple.600, purple.400, purple.400)",
		"linear(to-r, purple.300, purple.300, purple.400)"
	);
	const titleTextBgGradient = useColorModeValue("gray.600", "white");
	const iconBgGradient = useColorModeValue("purple.600", "purple.300");
	const boxBgGradient = useColorModeValue("white", "navy.700");
	const buttonBgGradient = useColorModeValue("purple.600", "white");

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
						fontWeight="600"
						fontSize={{ base: "md", md: "lg" }}
						lineHeight={{ base: "24px", md: "26px" }}
						color={titleTextBgGradient}
						marginBottom={5}
					>
						AJ Networks
					</Text>
				</Center>
				<Center>
					<Text
						fontWeight="900"
						fontFamily="Arial Black"
						fontSize={{ base: "lg", md: "50px" }}
						lineHeight={{ base: "24px", md: "70px" }}
						bg='linear-gradient(to right, blue, skyblue, skyblue, skyblue)'
						backgroundClip='text'
						color='transparent'
						marginBottom={20}
						letterSpacing="wide"
					>
						{/* {sessionStorage.username ? sessionStorage.username : 'SAMSUNGSDS'}님, 안녕하세요 */}
						AI Assistant
					</Text>
				</Center>

				<Center>
					<Flex align="column">
						<Icon
							as={BsFillChatDotsFill}
							mr={3}
							width='22px'
							height='22px'
							color={iconBgGradient}
							marginBottom="30px"
						/>
						<Text
							fontSize="17px"
							fontWeight="900"
							bgGradient={textBgGradient}
							bgClip="text"
							marginBottom="30px"
							paddingLeft={1}
						>
							이런 걸 물어볼 수 있어요
						</Text>
					</Flex>
				</Center>

				<Center>
					<Button
						bg={boxBgGradient}
						borderRadius="50px"
						borderColor="grey.500"
						boxShadow="md"
						w="auto"
						p={4}
						marginBottom="15px"
						color={buttonBgGradient}
						fontSize="17px"
						fontWeight="600"
						onClick={() => handleQuestionClick(
							'정비 매뉴얼에 있는 내용을 검색해주세요.',
							'knowledge',
							'manual'
						)}
					>
						정비 매뉴얼에 있는 내용을 검색해주세요.
					</Button>
				</Center>
				<Center>
					<Button
						bg={boxBgGradient}
						borderRadius="50px"
						borderColor="grey.500"
						boxShadow="md"
						w="auto"
						p={4}
						marginBottom="15px"
						color={buttonBgGradient}
						fontSize="17px"
						fontWeight="600"
						onClick={() => handleQuestionClick(
							'장비 부품 책자에 있는 내용을 검색해주세요.',
							'knowledge',
							'parts_book'
						)}
					>
						장비 부품 책자에 있는 내용을 검색해주세요.
					</Button>
				</Center>
				<Center>
					<Button
						bg={boxBgGradient}
						borderRadius="50px"
						borderColor="grey.500"
						boxShadow="md"
						w="auto"
						p={4}
						marginBottom="15px"
						color={buttonBgGradient}
						fontSize="17px"
						fontWeight="600"
						onClick={() => handleQuestionClick(
							'Error Code A4가 발생했을 때 점검해야 하는 체크리스트를 알려주세요.',
							'knowledge',
							'manual'
						)}
					>
						Error Code A4가 발생했을 때 점검해야 하는 체크리스트를 알려주세요.
					</Button>
				</Center>
			</Flex>

		</CSSTransition>
	);
}
