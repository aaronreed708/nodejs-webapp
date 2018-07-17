const path = require('path');

module.exports = {
entry: './src/index.js',
output: {
  filename: './javascripts/global.js',
  path: path.resolve(__dirname, 'public')
},
mode: 'development',
devtool: 'inline-source-map'
};
