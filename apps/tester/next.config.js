const path = require('path');

module.exports = {
	reactStrictMode: true,
	transpilePackages: ['ui', 'utils'],
	output: 'standalone',
	experimental: {
		outputFileTracingRoot: path.join(__dirname, '../../'),
	},
};
