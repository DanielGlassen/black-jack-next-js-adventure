import React from 'react';
import { AuthProvider } from 'components/context/AuthContext';
import Layout from '@/components/Layout';
import 'bootstrap/scss/bootstrap.scss';
import 'styles/globals.css';

function MyApp({ Component, pageProps }) {
	return (
		<Layout>
			<AuthProvider>
				<Component {...pageProps} />
			</AuthProvider>
		</Layout>
	);
}

export default MyApp;
