// Chakra imports
import { Flex, Icon, Link, Text, useColorModeValue } from '@chakra-ui/react';

// Custom components
import { HSeparator } from 'components/separator/Separator';
import { GiArtificialHive } from "react-icons/gi";

export function SidebarBrand() {
	const logoColor = useColorModeValue('white', 'white');

	return (
		<Flex alignItems='center' flexDirection='column' w='250px'>
			<Link href="/">
				<Flex alignItems='center' mb='25px'>
					<Icon as={GiArtificialHive} width='25px' height='25px' color='white' mr='10px' />
					<Text
						color={logoColor}
						fontWeight="600"
						fontSize={{ base: "lg", md: "xl" }}
						lineHeight={{ base: "24px", md: "26px" }}
					>
						Gererative AI
					</Text>
				</Flex>
			</Link>
			<HSeparator mb='20px' />
		</Flex>
	);
}

export default SidebarBrand;