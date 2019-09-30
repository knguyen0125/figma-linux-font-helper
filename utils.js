const child_process = require('child_process');
const fc = require('./fontconfig');
const config = require('./config');

const getKeyInLanguage = (
  keys,
  langs,
  defaultLang = config.FONT_DEFAULT_LANG,
) => {
  const index = langs.indexOf(defaultLang);
  if (index >= 0) return keys[index];

  // Sometimes number of keys > number of langs, with English as default language.
  // For now, it's okay to just get the last language
  if (keys.length > langs.length) {
    return keys[keys.length - 1];
  }

  return keys.join('');
};

const getFontStyle = (fontDir) => {
  // Formatter Configuration
  // https://www.freedesktop.org/software/fontconfig/fontconfig-user.html#AEN21
  const format =
    '%{file}\t%{postscriptname}\t%{family}\t%{familylang}\t%{slant}\t%{weight}\t%{width}\t%{style}\t%{stylelang}\n';

  // Gets font style from fc-scan
  const output = child_process.execSync(
    `fc-scan ${fontDir} -b -f '${format}'`,
    {
      encoding: 'utf-8',
    },
  );

  // Extracts fonts
  const fonts = output.split('\n');
  fonts.pop();

  const result = {};

  fonts.map((font) => {
    const splitted = font.split('\t');

    const fileName = splitted[0];
    const postscriptName = splitted[1];
    const family = splitted[2].split(',');
    const familyLang = splitted[3].split(',');
    const actualFamily = getKeyInLanguage(family, familyLang);

    const italic = Number(splitted[4]) !== 0;
    const weight = fc.convertFontWeight(Number(splitted[5]));
    const stretch = fc.convertFontWidth(Number(splitted[6]));
    const style = splitted[7].split(',');
    const styleLang = splitted[8].split(',');
    const actualStyle = getKeyInLanguage(style, styleLang);

    if (!postscriptName) return;

    const fontStyle = {
      postscriptName,
      family: actualFamily,
      italic,
      weight,
      stretch,
      style: actualStyle,
    };

    if (result[fileName]) {
      // In case of font collection (otf, ttc), add to array
      result[fileName] = [...result[fileName], fontStyle];
    } else {
      result[fileName] = [fontStyle];
    }
  });

  return result;
};

module.exports = {
  getFontStyle,
};
