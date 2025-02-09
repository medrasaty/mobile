import React from "react";
import { View as BaseView, ViewProps } from "react-native";
import { useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemedText } from "../ThemedText";
import { containerPaddings } from "@/constants/styels";
import { ThemedView } from "../ThemedView";

export default function View({ style, ...props }: ViewProps) {
  const { colors } = useTheme();

  return (
    <BaseView style={[{ backgroundColor: colors.surface }, style]} {...props}>
      {props.children}
    </BaseView>
  );
}

type PageContainerProps = {} & ViewProps;

export function SafeAreaView({
  children,
  style,
  ...props
}: PageContainerProps) {
  const insets = useSafeAreaInsets();

  const safeStyles = {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  };

  return (
    <View style={[{ flex: 1, ...safeStyles }, style]} {...props}>
      {children}
    </View>
  );
}

export const Container = ({ children, style, ...props }: ViewProps) => {
  const { colors } = useTheme();

  return (
    <BaseView
      style={[
        style,
        {
          flex: 1,
          backgroundColor: colors.surface,
          paddingStart: 16,
          paddingEnd: 16,
        },
      ]}
      {...props}
    >
      {children}
    </BaseView>
  );
};

export const ContainerView = ({ children, style, ...props }: ViewProps) => {
  return (
    <ThemedView style={[style, { ...containerPaddings }]} {...props}>
      {children}
    </ThemedView>
  );
};
