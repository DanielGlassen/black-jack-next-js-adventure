import React from 'react';
import SEO from './SEO';

const Layout = ({ children }) => {
	return (
		<>
			<SEO />
			{children}
		</>
	);
};

export default Layout;
