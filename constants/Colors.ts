/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

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

export const CyanDark = {
  colors: {
    primary: "rgb(79, 216, 235)",
    onPrimary: "rgb(0, 54, 61)",
    primaryContainer: "rgb(0, 79, 88)",
    onPrimaryContainer: "rgb(151, 240, 255)",
    secondary: "rgb(177, 203, 208)",
    onSecondary: "rgb(28, 52, 56)",
    secondaryContainer: "rgb(51, 75, 79)",
    onSecondaryContainer: "rgb(205, 231, 236)",
    tertiary: "rgb(186, 198, 234)",
    onTertiary: "rgb(36, 48, 77)",
    tertiaryContainer: "rgb(59, 70, 100)",
    onTertiaryContainer: "rgb(218, 226, 255)",
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
