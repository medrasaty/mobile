import {
  MD3DarkTheme as DefaultDarkTheme,
  MD3LightTheme as DefaultLightTheme,
} from "react-native-paper";

import { GruvboxDarkCyan, GruvboxLightCyan } from "@/constants/Colors";
import { applyCustomFontFamily } from "@/constants/fonts";

export const Darktheme = applyCustomFontFamily({
  ...DefaultDarkTheme,
  colors: GruvboxDarkCyan.colors,
});

export const LightTheme = applyCustomFontFamily({
  ...DefaultLightTheme,
  colors: GruvboxLightCyan.colors,
});
