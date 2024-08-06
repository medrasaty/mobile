import { MD3Theme } from "react-native-paper";

export const CUSTOM_FONT_FAMILY = "";

export const applyCustomFontFamily = (theme: MD3Theme) => {
  const customFonts = Object.keys(theme.fonts).reduce((acc, fontVariant) => {
    acc[fontVariant] = {
      ...theme.fonts[fontVariant],
      fontFamily: CUSTOM_FONT_FAMILY,
    };
    return acc;
  }, {});

  return {
    ...theme,
    fonts: customFonts,
  };
};
