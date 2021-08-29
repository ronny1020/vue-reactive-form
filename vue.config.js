module.exports = {
  pages: {
    index: {
      entry: 'example/src/main.ts',
      template: 'example/public/index.html',
    },
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/vue-reactive-form/' : '/',
}
