// Chakra imports
import { Box, Flex, Image, Text, useColorModeValue } from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
// Assets
import React from 'react';
import {ConversationTypeSelectionCardWrapper} from "./ChattingStyle";

export default function ConversationType(props: {
	image: string;
	conversationTitle: string;
	conversationDescription: string;
	setConversationType: React.Dispatch<React.SetStateAction<string>>
	conversationType: string;
	onClose: () => void;
}) {
	const { image, conversationTitle, conversationDescription , conversationType, setConversationType, onClose} = props;
	const textColor = useColorModeValue('navy.700', 'white');
	const handleConversationTypeSelection = () => {
		setConversationType(conversationType)
		onClose()
	}

	return (
		<Card p='20px' onClick={handleConversationTypeSelection} {...ConversationTypeSelectionCardWrapper}>
			<Flex direction={{ base: 'column' }} justify='center'>
				<Box mb={{ base: '20px', '2xl': '20px' }} position='relative'>
					<Image
						src={image}
						w={{ base: '100%', '3xl': '100%' }}
						h={{ base: '100%', '3xl': '100%' }}
						borderRadius='20px'
					/>
				</Box>
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
						<Flex direction='column'>
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
								{conversationTitle}
							</Text>
							<Text
								color='secondaryGray.600'
								fontSize={{
									base: 'sm'
								}}
								fontWeight='400'
								me='14px'>
								{conversationDescription}
							</Text>
						</Flex>
					</Flex>

				</Flex>
			</Flex>
		</Card>
	);
}
