import { ChakraProvider } from '@chakra-ui/react';
import theme from 'ui/theme';
import { AppProps } from 'next/app';
import CheckAuth from 'ui/layout/CheckAuth';
import MainLayout from 'ui/layout/MainLayout';
import Sidebar from 'ui/layout/Sidebar';
import Header from 'ui/layout/Header';
import Head from 'next/head';
import { NextPage } from 'next';
import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

type Page<P = {}> = NextPage<P> & {
	getLayout?: (page: ReactNode) => ReactNode;
};

type Props = AppProps & {
	Component: Page;
};

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
	await require('../mocks');
}

function MyApp({ Component, pageProps: { session, ...pageProps } }: Props) {
	const getLayout = Component.getLayout ?? ((page: ReactNode) => page);

	// for testing again
	return (
		<>
			<Head>
				<link rel="shortcut icon" href="/mdata-group.ico" />
				<title>測試頁面</title>
			</Head>
			<SessionProvider session={session}>
				<ChakraProvider theme={theme}>
					<CheckAuth>
						<MainLayout header={<Header />} sidebar={<Sidebar />}>
							{getLayout(<Component {...pageProps} />)}
						</MainLayout>
					</CheckAuth>
				</ChakraProvider>
			</SessionProvider>
		</>
	);
}

export default MyApp;
