require('babel-register')({
  only: [/assets/]
})
require('babel-polyfill')
require('isomorphic-fetch')

const hook = require('css-modules-require-hook')

// FIXME: require.extensions is deprecated.
require.extensions['.png'] = () => {}
