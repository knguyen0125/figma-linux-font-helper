const userDir = require('os').userInfo().homedir;
const userFontDir = require('path').join(userDir, '.local/share/fonts');
const extensions = ['ttf', 'otf', 'ttc', 'woff', 'woff2'];

module.exports = {
  PORT: 18412,
  DIRECTORIES: ['/usr/share/fonts', 'usr/local/share/fonts', userFontDir],
  EXTENSIONS: extensions,
  FIGMA_VERSION: 21,
};
