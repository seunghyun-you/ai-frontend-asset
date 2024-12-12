// Chakra imports
import { Box, Flex, Image, Link, Text, useColorModeValue } from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';

interface MaintenanceSourceDocumentProps {
	abnormalSymptom: string;
	abnormalSymptomDetails: string;
	abnormalPart: string;
	ranking: number | string;
	link: string;
	image: string;
	[x: string]: any;
}

export default function MaintenanceSourceDocument(
	{
		abnormalSymptom,
		abnormalSymptomDetails,
		abnormalPart,
		ranking,
		link,
		image,
		...rest
	}: MaintenanceSourceDocumentProps
) {
	const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
	const textColorSecondary = 'gray.400';
	const brandColor = useColorModeValue('brand.500', 'white');
	const bg = useColorModeValue('white', 'navy.700');
	return (
		<Card bg={bg} {...rest} p='14px' key={ranking}>
			<Flex align='center' direction={{ base: 'column', md: 'row' }}>
				<Image h='80px' w='80px' src={image} borderRadius='8px' me='20px' />
				<Box mt={{ base: '10px', md: '0' }}>
					<Text fontWeight='500' color={textColorSecondary} fontSize='sm' me='4px'>
						Search Ranking #{ranking} •{'  '} {abnormalPart} {abnormalSymptom} •{'  '}
						<Link fontWeight='500' color={brandColor} href={link} fontSize='sm'>
							See details
						</Link>
					</Text>
					<Text color={textColorPrimary} fontWeight='500' fontSize='sm' mb='4px'>
						{abnormalSymptomDetails}
					</Text>
				</Box>

			</Flex>
		</Card>
	);
}
