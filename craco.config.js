/* craco.config.js */
const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@styles': path.resolve(__dirname, 'src/styles'),
      '@contexts': path.resolve(__dirname, 'src/contexts'),
      '@images': path.resolve(__dirname, 'src/images'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@utils': path.resolve(__dirname, 'src/utils'),
    }
  },
};