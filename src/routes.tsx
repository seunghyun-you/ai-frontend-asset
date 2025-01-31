import { Icon } from '@chakra-ui/react';
import {
	MdBarChart,
	MdPerson,
	MdHome,
	MdLock,
	MdOutlineShoppingCart,
	MdAutoAwesome,
	MdEventNote
} from 'react-icons/md';

// Admin Imports
import MainDashboard from 'views/admin/default';
import NFTMarketplace from 'views/admin/marketplace';
import Profile from 'views/admin/profile';
import DataTables from 'views/admin/dataTables';
import RTL from 'views/admin/rtl';

// Auth Imports
import SignInCentered from 'views/auth/signIn';
import Chat from 'views/chat';
import MaintenanceDetails from "views/maintenanceDetails";
import MaintenanceList from "views/maintenanceList";

const routes = [
	// 사용 PAGE
	{
		disabled: true,
		name: 'Sign In',
		layout: '/auth',
		path: '/sign-in',
		icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
		component: SignInCentered
	},
	{
		name: 'Chat',
		layout: '/admin',
		path: '/chat',
		icon: <Icon as={MdAutoAwesome} width='20px' height='20px' color='white' />,
		component: Chat
	},
	{
		disabled: true,
		name: 'Maintenance Details',
		layout: '/admin',
		path: '/maintenance/:id',
		icon: <Icon as={MdEventNote} width='20px' height='20px' color='white' />,
		component: MaintenanceDetails
	},
	{
		disabled: false,
		name: 'Maintenance',
		layout: '/admin',
		path: '/maintenance',
		icon: <Icon as={MdEventNote} width='20px' height='20px' color='white' />,
		component: MaintenanceList
	},
	// 미사용 PAGE
	{
		disabled: true,
		name: 'Main Dashboard',
		layout: '/admin',
		path: '/default',
		icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
		component: MainDashboard
	},
	{
		disabled: true,
		name: 'NFT Marketplace',
		layout: '/admin',
		path: '/nft-marketplace',
		icon: <Icon as={MdOutlineShoppingCart} width='20px' height='20px' color='inherit' />,
		component: NFTMarketplace,
		secondary: true
	},
	{
		disabled: true,
		name: 'Data Tables',
		layout: '/admin',
		icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
		path: '/data-tables',
		component: DataTables
	},
	{
		disabled: true,
		name: 'Profile',
		layout: '/admin',
		path: '/profile',
		icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
		component: Profile
	},
	{
		disabled: true,
		name: 'RTL Admin',
		layout: '/rtl',
		path: '/rtl-default',
		icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
		component: RTL
	},
];

export default routes;
