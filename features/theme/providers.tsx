import React from "react";
import { View, ViewProps, useColorScheme } from "react-native";
import { PaperProvider } from "react-native-paper";
import { Darktheme, LightTheme } from "@/constants/theme";
import { DarkColors, LightColors } from "@/features/theme/colors";
import { useSettingsStore } from "@features/settings/store";

type PaperThemeProviderProps = {} & React.PropsWithChildren;

const PaperThemeProvider = ({
  children,
  ...props
}: PaperThemeProviderProps) => {
  // System color Scheam

  const settings = useSettingsStore((state) => state.settings);

  const colorscheme = useColorScheme();
  // TODO: refactor this mess
  const theme =
    settings.theme === "system"
      ? colorscheme === "dark"
        ? Darktheme
        : LightTheme
      : settings.theme === "dark"
      ? Darktheme
      : LightTheme;
  const colors =
    settings.theme === "system"
      ? colorscheme === "dark"
        ? DarkColors
        : LightColors
      : settings.theme === "dark"
      ? DarkColors
      : LightColors;
  return (
    <PaperProvider theme={{ ...theme, colors: colors.gray.colors }}>
      {children}
    </PaperProvider>
  );
};

/**
 * Return theme based on user settings choice
 */
function useCustomTheme() {}

export default PaperThemeProvider;
