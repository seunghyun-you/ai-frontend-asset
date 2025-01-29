/* eslint-disable */

import { Flex, Link, List, ListItem, Text, useColorModeValue } from '@chakra-ui/react';

export default function Footer() {
	let textColor = useColorModeValue('gray.400', 'white');
	let linkColor = useColorModeValue('gray.400', 'white');
	return (
		<Flex
			direction="column"
			alignItems="center"
			justifyContent="center"
			px={{ base: '30px', md: '0px' }}
			pb='30px'>
			<Flex
				zIndex='3'
				flexDirection='row'
				alignItems='center'
				justifyContent='center'
				mb='20px'>
				<List display='flex'>
					<ListItem me={{ base: '20px', md: '44px' }}>
						<Link fontWeight='500' color={linkColor} href='https://www.linkedin.com/in/sh1517you' target='_blank'>
							Linkedin
						</Link>
					</ListItem>
					<ListItem me={{ base: '20px', md: '44px' }}>
						<Link fontWeight='500' color={linkColor} href='https://github.com/seunghyun-you' target='_blank'>
							GitHub
						</Link>
					</ListItem>
					<ListItem>
						<Link fontWeight='500' color={linkColor} href='https://engineer-diarybook.tistory.com/' target='_blank'>
							BLOG
						</Link>
					</ListItem>
				</List>
			</Flex>
			<Flex
				zIndex='3'
				flexDirection='row'
				alignItems='center'
				justifyContent='center'>
				<Text color={textColor} textAlign='center'>
					&copy; {new Date().getFullYear()}
					<Text as='span' fontWeight='500' ms='4px'>
						© All rights reserved.
					</Text>
				</Text>
			</Flex>
		</Flex>
	);
}
