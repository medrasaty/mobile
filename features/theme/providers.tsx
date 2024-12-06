import React from "react";
import { View, ViewProps, useColorScheme } from "react-native";
import { PaperProvider } from "react-native-paper";
import { Darktheme, LightTheme } from "@/constants/theme";
import { DarkColors, LightColors } from "@/features/theme/colors";

type PaperThemeProviderProps = {} & React.PropsWithChildren;

const PaperThemeProvider = ({
  children,
  ...props
}: PaperThemeProviderProps) => {
  // System color Scheam

  const colorscheme = useColorScheme();
  const theme = colorscheme === "dark" ? Darktheme : LightTheme;
  const colors = colorscheme === "dark" ? DarkColors : LightColors;

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
