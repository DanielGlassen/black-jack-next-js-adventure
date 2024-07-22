const path = require('path');

module.exports = {
	reactStrictMode: true,
	output: 'export',
	images: {
		unoptimized: true
	},
	distDir: 'dist',
	webpack: (config) => {
		config.resolve.alias['@'] = path.resolve(__dirname);
		return config;
	}
};
