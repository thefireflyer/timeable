
const withPWA = require('next-pwa');

module.exports = withPWA({
  reactStrictMode: true,
  basePath: '/timeable',
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
  },
});