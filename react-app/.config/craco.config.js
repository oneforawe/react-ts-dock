require('json5/lib/register'); // craco+react-app-alias needs this json5 support
const { CracoAliasPlugin } = require('react-app-alias');

// See https://github.com/oklas/react-app-alias/issues/92
// require.extensions deprecated, but no alternatives?
// See https://github.com/nodejs/node/issues/32483
require.extensions['.json'] = require.extensions['.json5'];


module.exports = {
  // eslint: {
  //   mode: 'file',
  // },
  plugins: [
    {
      plugin:  CracoAliasPlugin,
      options: {}, // default is empty for most cases
    },
  ],
};
