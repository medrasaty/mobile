import {
  MD3DarkTheme as DefaultDarkTheme,
  MD3LightTheme as DefaultLightTheme,
} from "react-native-paper";

import { CyanDark, CyanLight } from "@/constants/Colors";
import { applyCustomFontFamily } from "@/constants/fonts";

export const Darktheme = applyCustomFontFamily({
  ...DefaultDarkTheme,
  colors: CyanDark.colors,
});

export const LightTheme = applyCustomFontFamily({
  ...DefaultLightTheme,
  colors: CyanLight.colors,
});
