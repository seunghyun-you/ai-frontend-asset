// Chakra imports
import {Flex, Icon, Link, Text, useColorModeValue} from '@chakra-ui/react';

// Custom components

import { HSeparator } from 'components/separator/Separator';
import React from "react";
import {FaSpinner} from "react-icons/fa6";

export function SidebarBrand() {
	const logoColor = useColorModeValue('black', 'white');
	const explainColor = useColorModeValue('secondaryGray.800', 'white.700');
	return (
		<Flex alignItems='center' flexDirection='column' w='250px'>
			<Link href="/">
				<Flex alignItems='center' mb='5px'>
					<Icon as={FaSpinner} width='25px' height='25px' color='deepskyblue' mr='7px' />
					<Text
						color={logoColor}
						fontWeight="600"
						fontSize={{ base: "lg", md: "xl" }}
						lineHeight={{ base: "24px", md: "26px" }}
					>
						G.ProServ
					</Text>
				</Flex>
			</Link>
			<Text
				color={explainColor}
				fontSize='10px'
				mb='1vh'
				textAlign='center'>
				AWS SA Generative AI Frontend Asset.
			</Text>
			<HSeparator mb='20px' />
		</Flex>
	);
}

export default SidebarBrand;