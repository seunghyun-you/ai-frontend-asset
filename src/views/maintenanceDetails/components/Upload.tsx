// Chakra imports
import {
	Box,
	Button,
	Flex,
	Icon,
	Text,
	Textarea,
	useColorModeValue,
} from '@chakra-ui/react';
// Custom components
import Card from 'components/card/Card';
// Assets
import {MdAutoAwesome, MdUpload} from 'react-icons/md';
import Dropzone from 'views/admin/profile/components/Dropzone';
import React, {useEffect, useState} from "react";

import { REACT_APP_API_URL } from "../../../config";

export default function Upload(props: { used?: number; total?: number; [x: string]: any }) {

	const { used, total, title, savedImageDescriptions, maintenancePictureCount, setMaintenancePictureCount, index, setSavedFiles, savedFiles, model, modelType, abnormalSymptom, abnormalSymptomDetails, actionDetails, maintenanceId, ...rest } = props;
	const [display, setDisplay] = useState<boolean>(true);
	const [imageDescription, setImageDescription] = useState<string>('');
	const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
	const brandColor = useColorModeValue('brand.500', 'white');
	const borderColor = useColorModeValue("gray.200", "whiteAlpha.200");
	const [loading, setLoading] = useState<boolean>(false);

	const generateDescription = async () => {

		if (savedFiles[index]) {
			setLoading(true);
			savedFiles[index].model = model
			savedFiles[index].model_type = modelType
			savedFiles[index].abnormal_symptom = abnormalSymptom
			savedFiles[index].abnormal_symptom_details = abnormalSymptomDetails
			savedFiles[index].action_details = actionDetails
			savedFiles[index].image_description = imageDescription
			try {
				const response = await fetch(`${REACT_APP_API_URL}/bedrock/generate/image`, {
			// const response = await fetch("http://poc-genai-alb-app-server-1997415878.ap-northeast-2.elb.amazonaws.com/bedrock/generate/image", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(savedFiles[index]),
				});


				if (!response.ok) {
					setLoading(false);
					if (response) {
						alert("Something went wrong went fetching from the API.");
					}
					return;
				}

				const data = response.body;

				if (!data) {
					setLoading(false);
					alert("Something went wrong");
					return;
				}

				const reader = data.getReader();
				const decoder = new TextDecoder();
				let done = false;

				let output_response = "";

				setImageDescription("")

				while (!done) {
					const { value, done: doneReading } = await reader.read();
					done = doneReading;
					const chunkValue = decoder.decode(value);
					output_response += chunkValue;
					setImageDescription((prevString) => prevString + chunkValue);
				}

				savedImageDescriptions[index] = output_response
				setLoading(false);
			} catch (error) {
				setLoading(false);
				console.error(error);
			}
		} else {
			alert('Upload Image')
		}
	};

	const handleImageDescriptionManualInput = (event:any) => {
		setImageDescription(event)
		savedImageDescriptions[index] = event
	}

	const handleUpload = async (file: any) => {

		if (file) {
			const formData = new FormData();
			formData.append("uploaded_file", file);

			try {
				const result = await fetch(`${REACT_APP_API_URL}/maintenances/files`, {
					method: "POST",
					body: formData,
				});

				const data = await result.json();
				props.savedFiles[index] = {'filename' : data.filename, 'uuid' : data.uuid}
				const count = maintenanceId ?  props.savedFiles.length : props.savedFiles.length + 1
				props.setMaintenancePictureCount(count)
			} catch (error) {
				console.error(error);
			}
		}
	};

	useEffect(() => {
		setImageDescription(savedImageDescriptions[index])
	}, [savedImageDescriptions, index]);

	return (
		<Card {...rest} w='100%' mb='20px' alignItems='center' p='20px'>
			<Flex w='100%' h='100%'>
				<Dropzone
					w={{ base: '268px', '2xl': '268px' }}
					h={{ base: '268px', '2xl': '268px' }}
					me='36px'
					maxH={{ base: '60%', lg: '50%', '2xl': '100%' }}
					minH={{ base: '60%', lg: '50%', '2xl': '100%' }}
					justify='center'
					index={index}
					maintenanceId={maintenanceId}
					setDisplay={setDisplay}
					handleUpload={handleUpload}
					savedFiles={savedFiles}
					content={
						<Box>
							{display ? (
								<Box>
									<Icon as={MdUpload} w='20px' h='20px' color={brandColor} />
									<Flex justify='center' mx='auto' mb='12px'>
										<Text fontSize='xl' fontWeight='700' color={brandColor}>
											Upload Files
										</Text>
									</Flex>
									<Text fontSize='sm' fontWeight='500' color='secondaryGray.500'>
										PNG, JPG and GIF files are allowed!!
									</Text>
								</Box>
							):null}
						</Box>
					}
				/>
				<Flex w='100%' direction='column'>
					<Flex w='100%' mb='10px'>
						<Text
							color={textColorPrimary}
							fontWeight='bold'
							textAlign='start'
							fontSize='1xl'
							mt='10px'
							mr='10px'
							>
							{props.title}
						</Text>
						<Button variant='action'
							isDisabled={!!maintenanceId}
							isLoading={loading}
							onClick={generateDescription}>
							<Icon h='24px' w='24px' mr='10px' color='blue.500' as={MdAutoAwesome} />
							Automatic image captioning
						</Button>
					</Flex>
					<Textarea
						value={imageDescription}
						isRequired={true}
						fontSize='sm'
						placeholder='Describe Image or click auto generate image describe'
						mb='24px'
						size='lg'
						border = '1px solid'
						borderColor={borderColor}
						borderRadius = '16px'
						minH='220px'
						onChange={(event) => handleImageDescriptionManualInput(event.target.value)}
					/>
				</Flex>
			</Flex>
		</Card>
	);
}
