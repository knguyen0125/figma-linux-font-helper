const { getFontStyle } = require('./utils');

class FontManager {
  constructor(directories) {
    this.directories = directories;
    this.fonts = {};

    this.updateFonts();
  }

  updateFonts() {
    this.directories.map((fontDir) => {
      try {
        const font = getFontStyle(fontDir);
        this.fonts = { ...this.fonts, ...font };
      } catch (e) {
        return;
      }
    });
  }

  getFonts() {
    this.updateFonts();

    return this.fonts;
  }

  isFontExists(fontPath) {
    return this.fonts[fontPath] !== undefined;
  }
}

module.exports = FontManager;
