/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { MD3Colors } from "react-native-paper/src/types";

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
};

const CyanDark = {
  colors: {
    primary: "rgb(79, 216, 235)",
    onPrimary: "rgb(0, 54, 61)",
    primaryContainer: "rgb(0, 79, 88)",
    onPrimaryContainer: "rgb(151, 240, 255)",
    secondary: "rgb(81, 215, 239)",
    onSecondary: "rgb(0, 54, 62)",
    secondaryContainer: "rgb(0, 78, 89)",
    onSecondaryContainer: "rgb(161, 239, 255)",
    tertiary: "rgb(176, 198, 255)",
    onTertiary: "rgb(0, 45, 111)",
    tertiaryContainer: "rgb(26, 67, 143)",
    onTertiaryContainer: "rgb(217, 226, 255)",
    error: "rgb(255, 180, 171)",
    onError: "rgb(105, 0, 5)",
    errorContainer: "rgb(147, 0, 10)",
    onErrorContainer: "rgb(255, 180, 171)",
    background: "rgb(25, 28, 29)",
    onBackground: "rgb(225, 227, 227)",
    surface: "rgb(25, 28, 29)",
    onSurface: "rgb(225, 227, 227)",
    surfaceVariant: "rgb(63, 72, 74)",
    onSurfaceVariant: "rgb(191, 200, 202)",
    outline: "rgb(137, 146, 148)",
    outlineVariant: "rgb(63, 72, 74)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(225, 227, 227)",
    inverseOnSurface: "rgb(46, 49, 50)",
    inversePrimary: "rgb(0, 104, 116)",
    /** Custom Colors */
    link: "rgb(79, 216, 235)",
    /** End of Custom Colors */
    elevation: {
      level0: "transparent",
      level1: "rgb(28, 37, 39)",
      level2: "rgb(29, 43, 46)",
      level3: "rgb(31, 49, 52)",
      level4: "rgb(32, 51, 54)",
      level5: "rgb(33, 54, 58)",
    },
    surfaceDisabled: "rgba(225, 227, 227, 0.12)",
    onSurfaceDisabled: "rgba(225, 227, 227, 0.38)",
    backdrop: "rgba(41, 50, 52, 0.4)",
  },
};

const CyanLight = {
  colors: {
    primary: "rgb(0, 104, 116)",
    onPrimary: "rgb(255, 255, 255)",
    primaryContainer: "rgb(151, 240, 255)",
    onPrimaryContainer: "rgb(0, 31, 36)",
    secondary: "rgb(0, 104, 118)",
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "rgb(161, 239, 255)",
    onSecondaryContainer: "rgb(0, 31, 37)",
    tertiary: "rgb(55, 92, 168)",
    onTertiary: "rgb(255, 255, 255)",
    tertiaryContainer: "rgb(217, 226, 255)",
    onTertiaryContainer: "rgb(0, 25, 69)",
    error: "rgb(186, 26, 26)",
    onError: "rgb(255, 255, 255)",
    errorContainer: "rgb(255, 218, 214)",
    onErrorContainer: "rgb(65, 0, 2)",
    background: "rgb(250, 253, 253)",
    onBackground: "rgb(25, 28, 29)",
    surface: "rgb(250, 253, 253)",
    onSurface: "rgb(25, 28, 29)",
    surfaceVariant: "rgb(219, 228, 230)",
    outline: "rgb(111, 121, 122)",
    outlineVariant: "rgb(191, 200, 202)",
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    inverseSurface: "rgb(46, 49, 50)",
    inverseOnSurface: "rgb(239, 241, 241)",
    inversePrimary: "rgb(79, 216, 235)",
    link: "rgb(0, 104, 116)",
    elevation: {
      level0: "transparent",
      level1: "rgb(238, 246, 246)",
      level2: "rgb(230, 241, 242)",
      level3: "rgb(223, 237, 238)",
      level4: "rgb(220, 235, 237)",
      level5: "rgb(215, 232, 234)",
    },
    surfaceDisabled: "rgba(25, 28, 29, 0.12)",
    onSurfaceDisabled: "rgba(25, 28, 29, 0.38)",
    backdrop: "rgba(41, 50, 52, 0.4)",
  },
};

export { CyanDark, CyanLight };
