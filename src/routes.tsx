import { Icon } from '@chakra-ui/react';
import {
	MdLock,
	MdAutoAwesome,
} from 'react-icons/md';

// Auth Imports
import SignInCentered from 'views/auth/signIn';
import Chat from 'views/chat';

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
	}
];

export default routes;
