import {
	Flex,
	Icon,
	Text,
	useColorModeValue,
} from '@chakra-ui/react';

import Card from 'components/card/Card';

import React from 'react';
import {IconType} from "react-icons/lib";


interface Question {
	text: string;
	knowledgeType: string;
}

interface ChatTitleItemMultiTurnProps {
	icon: IconType;
	iconColor: string;
	title: string;
	conversationType: string;
	questions: Question[];
	handleQuestionClick?: (question: string, conversationType: string, knowledgeType: string) => void;
  }

export default function ChatTitleItemMultiTurn(props: ChatTitleItemMultiTurnProps) {
	const { icon, iconColor, title, conversationType, questions, handleQuestionClick } = props;

	const menuColor = useColorModeValue("aliceblue", "blue");
	const textColor = useColorModeValue('navy.700', 'white');
	const textColorBid = useColorModeValue('brand.500', 'white');

	const handleTitleChatInput = (question: string, _conversationType:string, knowledgeType: string) => {
		handleQuestionClick(question, _conversationType, knowledgeType)
	}

	return (
		<Card p='20px'>
			<Flex direction={{ base: 'column' }} justify='center'>
				<Flex flexDirection='column' justify='space-between' h='100%'>

					<Flex
						justify='space-between'
						direction={{
							base: 'row',
							md: 'column',
							lg: 'row',
							xl: 'column',
							'2xl': 'row'
						}}
						mb='auto'>
						<Flex direction='column' w='100%'>
							<Flex direction='row' justify='space-between' align='center' w='100%' my="auto">
								<Text
									color={textColor}
									fontSize={{
										base: 'xl',
										md: 'lg',
										lg: 'lg',
										xl: 'lg',
										'2xl': 'md',
										'3xl': 'lg'
									}}
									mb='5px'
									fontWeight='bold'
									me='14px'>
									{title}
								</Text>
								<svg width="0" height="0">
									<linearGradient id="blue-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
										<stop stopColor="#7a6ded" offset="0%"/>
										<stop stopColor="#591885" offset="100%"/>
									</linearGradient>
								</svg>
								<Icon as={icon} width='40px' color={iconColor} height='40px' my='auto' pr='3px'/>
							</Flex>
						</Flex>
					</Flex>
					<Flex
						align={{
							base: 'center',
							md: 'start',
							lg: 'center',
							xl: 'start',
							'2xl': 'center'
						}}
						justify='space-between'
						direction={{
							base: 'row',
							md: 'column',
							lg: 'row',
							xl: 'column',
							'2xl': 'row'
						}}
						mt='15px'>
						<Flex flexDirection='column'>
							{questions.map((question, index) => {
								return (
									<Text 
										key={index} 
										_hover={{ bg: menuColor, cursor: 'pointer' }} 
										_focus={{ bg: menuColor }}
										onClick={() => handleTitleChatInput(question.text, conversationType, question.knowledgeType)}
										borderRadius='8px' 
										justifyContent='flex-start' 
										fontSize='15px' 
										fontFamily='Roboto'mb='10px'
									>
										{question.text}
									</Text>
								)
							})}
						</Flex>
					</Flex>
				</Flex>
			</Flex>
		</Card>
	);
}
