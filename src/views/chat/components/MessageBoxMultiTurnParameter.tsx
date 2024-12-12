import {Box, Select, Text, useColorModeValue} from '@chakra-ui/react';

import Card from 'components/card/Card';
import React from "react";

interface MessageBoxMultiTurnParameterProps {
	disabled: boolean;
	title: string;
	value: string;
	options: string[];
	setMultiTurnValue: any;
	[x: string]: any;
}


export default function MessageBoxMultiTurnParameter(
	{disabled, title, value, options, setMultiTurnValue, ...rest}: MessageBoxMultiTurnParameterProps) {

	const textColorSecondary = 'gray.400';
	const bg = useColorModeValue('white', 'navy.700');

	const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		setMultiTurnValue(event.target.value)
	};

	const customSelectOptions = options.map((option) => ({
		value: option,
		label: option,
	}));

	return (
		<Card bg={bg} {...rest}>
			<Box>
				<Text fontWeight='500' color={textColorSecondary} fontSize='sm'>
					{title}
				</Text>
				<Select
					value={value}
					isDisabled={disabled}
					id='multiTurnParameter'
					w='unset'
					variant='transparent'
					display='flex'
					alignItems='center'
					onChange={handleChange}
					>
					<option value="">Select Value</option>
					{options.map((option, index) => (
						<option key={index} value={option}>
							{option}
						</option>
					))}
				</Select>
			</Box>
		</Card>
	);
}
