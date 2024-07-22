const path = require('path');

module.exports = {
  reactStrictMode: true,
  output: 'export',
  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname);
    return config;
  }
};
