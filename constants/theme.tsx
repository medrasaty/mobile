import { MD3DarkTheme as DefaultDarkTheme, MD3LightTheme as DefaultLightTheme } from "react-native-paper";

import { CyanDark, CyanLight } from "@/constants/Colors";


export const Darktheme = {
  ...DefaultDarkTheme,
  colors: CyanDark.colors,
};

export const LightTheme = {
  ...DefaultLightTheme,
  colors: CyanLight.colors,
};