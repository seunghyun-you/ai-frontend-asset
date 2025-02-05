import React from 'react';
import { createRoot } from 'react-dom/client';
import './assets/css/App.css';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import AuthLayout from './layouts/auth';
import AdminLayout from './layouts/admin';
import RTLLayout from './layouts/rtl';

import { ChakraProvider, Spinner, Flex } from '@chakra-ui/react';
import theme from './theme/theme';
import { RouteComponentProps } from "react-router";

import { REACT_APP_API_URL } from "./config";

const PrivateRoute = ({ component: Component, ...rest }: {
	component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
	path: string;
	exact?: boolean;
}) => {
	const token = sessionStorage.getItem('token');
	const [isAuthenticated, setIsAuthenticated] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(true);

	React.useEffect(() => {
		const checkAuth = async () => {
			const username = await handleAuth(token);
			sessionStorage.setItem('username', username);
			setIsAuthenticated(username);
			setIsLoading(false);
		};
		checkAuth();
	}, [token]);

	if (isLoading) {
		return (
			<Flex
				height="100vh"
				align="center"
				justify="center"
				bg="gray.100">
				<Spinner
					thickness='4px'
					speed='0.65s'
					emptyColor='gray.200'
					color='blue.500'
					size='xl'
				/>
			</Flex>
		)
	}

	return (
		<Route
			{...rest}
			render={(props) =>
				isAuthenticated ? (
					<Component {...props} />
				) : (
					<Redirect to={{ pathname: '/auth/login', state: { from: props.location } }} />
				)
			}
		/>
	);
};

const handleAuth = async (token: string) => {
	try {
		const response = await fetch(`${REACT_APP_API_URL}/auth/verify`, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${token}`
			}
		});

		if (!response.ok) {
			throw new Error('Network response was not ok');
		}

		const data = await response.json();
		return data;
	} catch (error) {
		return false;
	}
};

const App = () => {

	return (
		<ChakraProvider theme={theme}>
			<HashRouter>
				<Switch>
					<Route path={`/auth`} component={AuthLayout} />
					<PrivateRoute path={`/admin`} component={AdminLayout} />
					<PrivateRoute path={`/rtl`} component={RTLLayout} />
					<Redirect from='/' to='/admin/chat' />
				</Switch>
			</HashRouter>
		</ChakraProvider>
	);
};

const container = document.getElementById('root');
createRoot(container).render(<App />);