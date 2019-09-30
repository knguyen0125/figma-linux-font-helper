const userDir = require('os').userInfo().homedir;
const userFontDir = require('path').join(userDir, '.local/share/fonts');

module.exports = {
  HTTP_PORT: 18412,
  FONT_DIRECTORIES: ['/usr/share/fonts', 'usr/local/share/fonts', userFontDir],
  EXTENSIONS: ['ttf', 'otf', 'ttc', 'woff', 'woff2'],
  FIGMA_VERSION: 21,
  FONT_DEFAULT_LANG: 'en',
};
