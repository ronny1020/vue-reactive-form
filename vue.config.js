/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
  pages: {
    index: {
      entry: 'example/src/main.ts',
      template: 'example/public/index.html',
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'example/src'),
      },
    },
  },
};
