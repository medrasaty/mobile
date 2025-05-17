import React from "react";
import { View as BaseView, ViewProps } from "react-native";
import { useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { containerPaddings } from "@/constants/styels";

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
  return (
    <BaseView
      style={[
        style,
        {
          flex: 1,
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
    <View style={[style, { ...containerPaddings }]} {...props}>
      {children}
    </View>
  );
};
