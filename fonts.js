const child_process = require('child_process');
const fc = require('./fontconfig');
const config = require('./config');

const getFontStyle = (fontDir) => {
  const format =
    '%{file}\t%{postscriptname}\t%{family}\t%{slant}\t%{weight}\t%{width}\t%{style}\n';
  const output = child_process.execSync(
    `fc-scan ${fontDir} -b -f '${format}'`,
    {
      encoding: 'utf-8',
    },
  );

  const result = {};

  // Extracts fonts
  const fonts = output.split('\n');
  fonts.pop();

  fonts.map((font) => {
    const splitted = font.split('\t');

    const fileName = splitted[0];
    const postscriptName = splitted[1];
    const family = splitted[2];
    const italic = Number(splitted[3]) !== 0;
    const weight = fc.convertFontWeight(Number(splitted[4]));
    const stretch = fc.convertFontWidth(Number(splitted[5]));
    const style = splitted[6];

    if (!postscriptName) return;

    const fontStyle = {
      postscriptName,
      family,
      italic,
      weight,
      stretch,
      style,
    };

    if (result[fileName]) {
      result[fileName] = [...result[fileName], fontStyle];
    } else {
      result[fileName] = [fontStyle];
    }
  });

  return result;
};

class FontManager {
  fonts = {};

  constructor() {
    config.DIRECTORIES.map((fontDir) => {
      try {
        const font = getFontStyle(fontDir);
        this.fonts = { ...this.fonts, ...font };
      } catch (e) {
        return;
      }
    });
  }

  getFonts() {
    return this.fonts;
  }

  isFontExists(fontPath) {
    return this.fonts[fontPath] !== undefined;
  }
}

module.exports = FontManager;
