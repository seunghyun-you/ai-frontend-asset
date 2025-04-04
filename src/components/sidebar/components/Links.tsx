/* eslint-disable */

import { NavLink, useLocation } from 'react-router-dom';
// chakra imports
import { Box, Flex, HStack, Text, useColorModeValue } from '@chakra-ui/react';

export function SidebarLinks(props: {
	routes: RoutesType[];
}) {
	//   Chakra color mode
	let location = useLocation();
	let activeColor = useColorModeValue('white', 'white');
	let inactiveColor = useColorModeValue('secondaryGray.500', 'secondaryGray.500');
	let activeIcon = useColorModeValue('brand.500', 'white');
	let textColor = useColorModeValue('secondaryGray.500', 'secondaryGray.100');
	let brandColor = useColorModeValue('white', 'white');

	const { routes } = props;

	// verifies if routeName is the one active (in browser input)
	const activeRoute = (routeName: string) => {
		return location.pathname.includes(routeName);
	};

	// this function creates the links from the secondary accordions (for example auth -> sign-in -> default)
	const createLinks = (
		routes: RoutesType[],
	) => {
		return routes.filter(route => !route.disabled)
			.map(
				(
					route: RoutesType,
					index: number
				) => {
					if (route.layout === '/admin' || route.layout === '/auth' || route.layout === '/rtl') {
						return (
							<NavLink key={index} to={route.layout + route.path}>
								{route.icon ? (
									<Box>
										<HStack
											spacing={activeRoute(route.path.toLowerCase()) ? '22px' : '26px'}
											py='5px'
											ps='10px'>
											<Flex w='100%' alignItems='center' justifyContent='center'>
												<Box
													color={activeRoute(route.path.toLowerCase()) ? activeIcon : textColor}
													me='18px'>
													{route.icon}
												</Box>
												<Text
													me='auto'
													color={activeRoute(route.path.toLowerCase()) ? activeColor : textColor}
													fontWeight={activeRoute(route.path.toLowerCase()) ? 'bold' : 'normal'}>
													{route.name}
												</Text>
											</Flex>
											{/* Side-bar Page Link 우측에 활성화된 Page Link 표시하기 위한 작은 박스 컴포넌트 */}
											<Box
												h='36px'
												w='4px'
												bg={activeRoute(route.path.toLowerCase()) ? brandColor : 'transparent'}
												borderRadius='5px'
											/>
										</HStack>
									</Box>
								) : (
									<Box>
										<HStack
											spacing={activeRoute(route.path.toLowerCase()) ? '22px' : '26px'}
											py='5px'
											ps='10px'>
											<Text
												me='auto'
												color={activeRoute(route.path.toLowerCase()) ? activeColor : inactiveColor}
												fontWeight={activeRoute(route.path.toLowerCase()) ? 'bold' : 'normal'}>
												{route.name}
											</Text>
											<Box h='36px' w='4px' bg='brand.400' borderRadius='5px' />
										</HStack>
									</Box>
								)}
							</NavLink>
						);
					}
				}
			);
	};
	//  BRAND
	return <>{createLinks(routes)}</>
}

export default SidebarLinks;
