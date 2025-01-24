// Chakra imports
import {Button, Flex, Img, useColorModeValue} from '@chakra-ui/react';
// Assets
import { useDropzone } from 'react-dropzone';
import {ReactElement, useEffect, useState} from "react";
import {SavedFile} from "types/types";

import { REACT_APP_API_URL } from "../../../../config";

function Dropzone(props: { content: ReactElement  | string; [x: string]: any }) {
	const { content, setDisplay, handleUpload, maintenanceId, savedFiles, index, ...rest } = props;
	const thumbsContainer = {
		display: 'flex',
		direction: 'row',
		flexflow: 'row wrap',
		mt: 16
	};

	const thumb = {
		// display: 'inline-flex',
		borderRadius: 15,
		// border: '1px solid #eaeaea',
		// mb: 8,
		ml: 10,
	};

	const thumbInner = {
		display: 'flex',
		borderRadius: 15,
		minWidth: 0,
		overflow: 'hidden',
		// me: '36px',
		maxH: { base: '60%', lg: '50%', '2xl': '100%' },
		minH: { base: '60%', lg: '50%', '2xl': '100%' },
		w: { base: '260px', '2xl': '260px' },
		h: { base: '260px', '2xl': '260px' },
	};

	const img = {
		display: 'block',
		width: 'auto',
		height: '100%'
	};

	const [files, setFiles] = useState([]);

	const { getRootProps, getInputProps } = useDropzone({
			accept: [".jpeg", ".jpg", ".png", "gif"],
			maxFiles: 1,
			disabled: !!maintenanceId,
			onDrop: acceptedFiles => {
				setFiles(acceptedFiles.map(file => Object.assign(file, {
					preview: URL.createObjectURL(file)
				})));
			}
		}
	);

	const bg = useColorModeValue('gray.100', 'navy.700');
	const borderColor = useColorModeValue('secondaryGray.100', 'whiteAlpha.100');


	useEffect(() => {
		const handleFileDownload = async (savedFile: SavedFile) => {

			if(savedFile) {
				try {

					const response = await fetch(`${REACT_APP_API_URL}/maintenances/${maintenanceId}/files/download`, {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(savedFile)
					});

					const blob = await response.blob()
					let file = new File([blob], savedFile.filename);

					Object.assign(file, {
						preview: URL.createObjectURL(file)
					})

					setFiles([file])

				} catch (error) {
					console.error(error);
				}
			}
		};

		if (maintenanceId && savedFiles[index].uuid && savedFiles[index].filename) {
			handleFileDownload(savedFiles[index]).then((): void => undefined);
		}
	}, [maintenanceId, savedFiles, index]);

	return (
		<Flex
			align='center'
			justify='center'
			bg={bg}
			border='1px dashed'
			borderColor={borderColor}
			borderRadius='16px'
			w='100%'
			h='max-content'
			minH='100%'
			cursor='pointer'
			{...getRootProps({className: 'dropzone'})}
			{...rest}>
			<input {...getInputProps()} />
			<aside {...thumbsContainer}>
				{files.map((file, index) => {
					return (
						<Flex key={index} {...thumb}>
							<Flex {...thumbInner}>
								<Img
									src={file.preview}
									style={img}
									onLoad={() => {
										props.setDisplay(false)
										URL.revokeObjectURL(file.preview)
										if(!maintenanceId) props.handleUpload(file)
									}}
								/>
							</Flex>
						</Flex>
					)
				})}
			</aside>
			<Button variant='no-effects'>{content}</Button>
		</Flex>
	);
}

export default Dropzone;
