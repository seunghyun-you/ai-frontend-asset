/* eslint-disable */
// Chakra Imports
import {
	Box,
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	Flex, Img,
	Link,
	Select,
	Text,
	Image,
	useColorModeValue, Icon, MenuButton, MenuList, MenuItem, Menu, useColorMode, Avatar
} from '@chakra-ui/react';
import React, {useState, useEffect, CSSProperties} from 'react';
import AdminNavbarLinks from 'components/navbar/NavbarLinksAdmin';

import claude from 'assets/img/layout/claude-ai-icon.png'
import openai from 'assets/img/layout/openai-icon.png'
import chatgpt from 'assets/img/layout/chatgpt-icon.png'

export default function AdminNavbar(props: {
	secondary: boolean;
	message: string|boolean;
	brandText: string;
	logoText: string;
	fixed: boolean;
	onOpen: (...args: any[]) => any;
}) {
	const [ scrolled, setScrolled ] = useState(false);
	const [ selectedLLM, setSelectedLLM ] = useState('Claude V3 Haiku');
	const [ selectedLLMLogo, setSelectedLLMLogo ] = useState(claude);
	const menuColor = useColorModeValue("aliceblue", "blue");

	useEffect(() => {
		window.addEventListener('scroll', changeNavbar);

		return () => {
			window.removeEventListener('scroll', changeNavbar);
		};
	});

	const { secondary,  brandText } = props;

	const selectModelBoxWrapper = {
		style: {
			fontSize: '13px',
			fontWeight: 'bold',} as CSSProperties,
		mr:"5px",
		// w: '150px',
		minW: 'max-content',
		h: '30px',
		size:"md",
		borderRadius:'30px',
		bg: "black",
		color: "white",
		// alignSelf: "end",
		ml: "20px",
		mt: "35px",
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
		// _expanded: {
		// 	bg: 'white',
		// 	borderColor: 'blue.500',
		// 	borderRadius: 'md',
		// 	boxShadow: 'lg',
		// },
	}

	const { colorMode, toggleColorMode } = useColorMode();
	// Chakra Color Mode
	const navbarIcon = useColorModeValue('gray.400', 'white');
	let menuBg = useColorModeValue('white', 'navy.800');
	const textColor = useColorModeValue('secondaryGray.900', 'white');
	const textColorBrand = useColorModeValue('brand.700', 'brand.400');
	const ethColor = useColorModeValue('gray.700', 'white');
	const borderColor = useColorModeValue('#E6ECFA', 'rgba(135, 140, 189, 0.3)');
	const ethBg = useColorModeValue('secondaryGray.300', 'navy.900');
	const ethBox = useColorModeValue('white', 'navy.800');
	const shadow = useColorModeValue(
		'14px 17px 40px 4px rgba(112, 144, 176, 0.18)',
		'14px 17px 40px 4px rgba(112, 144, 176, 0.06)'
	);



	// Here are all the props that may change depending on navbar's type or state.(secondary, variant, scrolled)
	let mainText = useColorModeValue('navy.700', 'white');
	let secondaryText = useColorModeValue('gray.700', 'white');
	let navbarPosition = 'fixed' as const;
	let navbarFilter = 'none';
	let navbarBackdrop = 'blur(20px)';
	let navbarShadow = 'none';
	let navbarBg = useColorModeValue('rgba(244, 247, 254, 0.2)', 'rgba(11,20,55,0.5)');
	let navbarBorder = 'transparent';
	let secondaryMargin = '0px';
	let paddingX = '15px';
	let gap = '0px';
	const changeNavbar = () => {
		if (window.scrollY > 1) {
			setScrolled(true);
		} else {
			setScrolled(false);
		}
	};

	const handleLLMChange = (llm:string) => {
		localStorage.setItem('llm', llm);
		llm.includes('GPT') ? setSelectedLLMLogo(chatgpt) : setSelectedLLMLogo(claude)
		setSelectedLLM(llm)
	}

	useEffect(() => {
		const llm = localStorage.getItem('llm')
		if (llm) {
			handleLLMChange(llm)
		} else {
			const defaultLLM = 'Claude V3 Haiku'
			localStorage.setItem('llm', defaultLLM)
			handleLLMChange(defaultLLM)
		}
	}, []);

	return (
		<Box
			position={navbarPosition}
			boxShadow={navbarShadow}
			bg={navbarBg}
			borderColor={navbarBorder}
			filter={navbarFilter}
			backdropFilter={navbarBackdrop}
			backgroundPosition='center'
			backgroundSize='cover'
			borderRadius='16px'
			borderWidth='1.5px'
			borderStyle='solid'
			transitionDelay='0s, 0s, 0s, 0s'
			transitionDuration=' 0.25s, 0.25s, 0.25s, 0s'
			transition-property='box-shadow, background-color, filter, border'
			transitionTimingFunction='linear, linear, linear, linear'
			alignItems={{ xl: 'center' }}
			display={secondary ? 'block' : 'flex'}
			minH='75px'
			justifyContent={{ xl: 'center' }}
			lineHeight='25.6px'
			mx='auto'
			mt={secondaryMargin}
			pb='8px'
			right={{ base: '12px', md: '30px', lg: '30px', xl: '30px' }}
			px={{
				sm: paddingX,
				md: '10px'
			}}
			ps={{
				xl: '12px'
			}}
			pt='8px'
			top={{ base: '12px', md: '16px', xl: '18px' }}
			w={{
				base: 'calc(100vw - 5%)',
				md: 'calc(100vw - 7%)',
				lg: 'calc(100vw - 5%)',
				xl: 'calc(100vw - 300px)',
				'2xl': 'calc(100vw - 315px)'
			}}>
			<Flex
				w='100%'
				flexDirection={{
					sm: 'column',
					md: 'row'
				}}
				alignItems={{ xl: 'center' }}
				mb={gap}>
				<Box mb={{ sm: '8px', md: '0px' }}>
					<Text 
						color={secondaryText} 
						fontSize='sm' 
						mb='10px'
					>
						Pages /
					</Text>
					<Text 
						color={mainText} 
						fontWeight='bold' 
						fontSize='34px'
					>
						{brandText} 
					</Text>
				</Box>
				{ brandText ==='Chat' ? (
					<Menu>
						<MenuButton {...selectModelBoxWrapper}>
							<Flex alignItems='center' mx="auto" my="auto">
								<Image src={selectedLLMLogo} w='15px' h='15px' ml='10px'></Image>
								<Text  mx='10px'> {selectedLLM} </Text>
							</Flex>
						</MenuButton>
						<MenuList boxShadow={shadow} p='0px' mt='10px' borderRadius='20px' bg={menuBg} border='none'>
							<Flex w='100%' mb='0px' flexDirection='row' borderBottom='1px solid'
								  borderColor={borderColor}>
								<Flex alignItems='center' ml='10px'>
									<Image 
										src={claude} 
										w='25px' 
										h='25px'
										ml='10px'
										mt='5px'
										mb='5px'>
									</Image>
									<Text
										ps='10px'
										pt='10px'
										pb='10px'
										w='300px'
										fontSize='md'
										fontWeight='700'
										color={textColor}>

										Anthropic
									</Text>
								</Flex>
							</Flex>
							<Flex flexDirection='column' p='10px'>
								<MenuItem bg={menuBg} _hover={{ bg: menuColor }} _focus={{ bg: menuColor }} borderRadius='8px' px='14px'
										  onClick={() => handleLLMChange('Claude V3 Haiku')}>
									<Text fontSize='sm'>Claude V3 Haiku</Text>
								</MenuItem>
								<MenuItem bg={menuBg} _hover={{ bg: menuColor }} _focus={{ bg: menuColor }} borderRadius='8px' px='14px'
										  onClick={() => handleLLMChange('Claude V3 Opus')}>
									<Text fontSize='sm'>Claude V3 Opus</Text>
								</MenuItem>
								<MenuItem bg={menuBg} _hover={{ bg: menuColor }} _focus={{ bg: menuColor }} borderRadius='8px' px='14px'
										  onClick={() => handleLLMChange('Claude V3 Sonnet')}>
									<Text fontSize='sm'>Claude V3 Sonnet</Text>
								</MenuItem>
								<MenuItem bg={menuBg} _hover={{ bg: menuColor }} _focus={{ bg: menuColor }} borderRadius='8px' px='14px'
										  onClick={() => handleLLMChange('Claude V3.5 Sonnet')}>
									<Text fontSize='sm'>Claude V3.5 Sonnet</Text>
								</MenuItem>
							</Flex>
							{/* <Flex w='100%' mb='0px' flexDirection='row' borderBottom='1px solid'
								  borderColor={borderColor}>
								<Flex alignItems='center' ml='10px'>
									<Image src={openai} w='25px' h='25px'></Image>
									<Text
										ps='10px'
										pt='10px'
										pb='10px'
										w='300px'
										fontSize='md'
										fontWeight='700'
										color={textColor}>
										OpenAI
									</Text>
								</Flex>
							</Flex>
							<Flex flexDirection='column' p='10px'>
								<MenuItem bg={menuBg} _hover={{ bg: menuColor }} _focus={{ bg: menuColor }} borderRadius='8px' px='14px'
										  onClick={() => handleLLMChange('GPT-4o')}>
									<Text fontSize='sm'>GPT-4o</Text>
								</MenuItem>
								<MenuItem bg={menuBg} _hover={{ bg: menuColor }} _focus={{ bg: menuColor }} borderRadius='8px' px='14px'
										  onClick={() => handleLLMChange('GPT-4 Turbo')}>
									<Text fontSize='sm'>GPT-4 Turbo</Text>
								</MenuItem>
								<MenuItem bg={menuBg} _hover={{ bg: menuColor }} _focus={{ bg: menuColor }} borderRadius='8px' px='14px'
										  onClick={() => handleLLMChange('GPT-3.5 Turbo')}>
									<Text fontSize='sm'>GPT-3.5 Turbo</Text>
								</MenuItem>
							</Flex> */}
						</MenuList>
					</Menu>
				) : null}

				<Box ms='auto' w={{sm: '100%', md: 'unset'}}>
					<AdminNavbarLinks
						onOpen={props.onOpen} 
						secondary={props.secondary}
						fixed={props.fixed} 
					/>
				</Box>
			</Flex> 
		</Box>
	);
}
