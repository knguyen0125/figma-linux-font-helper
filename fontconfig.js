// https://github.com/servo/libfontconfig/blob/master/fontconfig/fontconfig.h
const FC_WEIGHT_THIN = 0;
const FC_WEIGHT_EXTRALIGHT = 40;
const FC_WEIGHT_ULTRALIGHT = FC_WEIGHT_EXTRALIGHT;
const FC_WEIGHT_LIGHT = 50;
const FC_WEIGHT_BOOK = 75;
const FC_WEIGHT_REGULAR = 80;
const FC_WEIGHT_NORMAL = FC_WEIGHT_REGULAR;
const FC_WEIGHT_MEDIUM = 100;
const FC_WEIGHT_DEMIBOLD = 180;
const FC_WEIGHT_SEMIBOLD = FC_WEIGHT_DEMIBOLD;
const FC_WEIGHT_BOLD = 200;
const FC_WEIGHT_EXTRABOLD = 205;
const FC_WEIGHT_ULTRABOLD = FC_WEIGHT_EXTRABOLD;
const FC_WEIGHT_BLACK = 210;
const FC_WEIGHT_HEAVY = FC_WEIGHT_BLACK;
const FC_WEIGHT_EXTRABLACK = 215;
const FC_WEIGHT_ULTRABLACK = FC_WEIGHT_EXTRABLACK;

const FC_SLANT_ROMAN = 0;
const FC_SLANT_ITALIC = 100;
const FC_SLANT_OBLIQUE = 110;

const FC_WIDTH_ULTRACONDENSED = 50;
const FC_WIDTH_EXTRACONDENSED = 63;
const FC_WIDTH_CONDENSED = 75;
const FC_WIDTH_SEMICONDENSED = 87;
const FC_WIDTH_NORMAL = 100;
const FC_WIDTH_SEMIEXPANDED = 113;
const FC_WIDTH_EXPANDED = 125;
const FC_WIDTH_EXTRAEXPANDED = 150;
const FC_WIDTH_ULTRAEXPANDED = 200;

/** Convert font weight from fontconfig output to web */
const convertFontWeight = (fontWeight) => {
  switch (fontWeight) {
    case FC_WEIGHT_THIN:
      return 100;
    case FC_WEIGHT_ULTRALIGHT:
      return 200;
    case FC_WEIGHT_LIGHT:
      return 300;
    case FC_WEIGHT_NORMAL:
      return 400;
    case FC_WEIGHT_MEDIUM:
      return 500;
    case FC_WEIGHT_SEMIBOLD:
      return 600;
    case FC_WEIGHT_BOLD:
      return 700;
    case FC_WEIGHT_ULTRABOLD:
      return 800;
    case FC_WEIGHT_HEAVY:
      return 900;
    default:
      return 0;
  }
};

/** Convert font width from fontconfig output to web */
const convertFontWidth = (fontWidth) => {
  switch (fontWidth) {
    case FC_WIDTH_ULTRACONDENSED:
      return 1;
    case FC_WIDTH_EXTRACONDENSED:
      return 2;
    case FC_WIDTH_CONDENSED:
      return 3;
    case FC_WIDTH_SEMICONDENSED:
      return 4;
    case FC_WIDTH_NORMAL:
      return 5;
    case FC_WIDTH_SEMIEXPANDED:
      return 6;
    case FC_WIDTH_EXPANDED:
      return 7;
    case FC_WIDTH_EXTRAEXPANDED:
      return 8;
    case FC_WIDTH_ULTRAEXPANDED:
      return 9;
    default:
      return 0;
  }
};

module.exports = {
  convertFontWeight,
  convertFontWidth,
};
