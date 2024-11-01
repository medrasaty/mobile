import { useState, useEffect, useMemo } from "react";
import { StyleSheet, useWindowDimensions } from "react-native";
import { useTheme } from "react-native-paper";

export default function useDrawerLayoutStyles() {
  const theme = useTheme();
  const { height: windowHeight } = useWindowDimensions();
  return useMemo(() => {
    return {
      container: {
        backgroundColor: theme.colors.surface,
        height: windowHeight,
      },
      item: {
        backgroundColor: theme.colors.surface,
      },
    };
  }, [theme]);
}
