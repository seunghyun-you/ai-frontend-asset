import {Box} from '@chakra-ui/react';
import MaintenanceTable from './components/MaintenanceTable';

export default function Settings() {

	return (
		<Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
			<MaintenanceTable />
		</Box>
	);
}
