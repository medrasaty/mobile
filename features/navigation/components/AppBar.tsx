import { useAnimatedAppBar } from "@/contexts";
import { useSession } from "@/hooks/useSession";
import { useNavigation } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import {
  Appbar,
  AppbarContentProps,
  AppbarHeaderProps,
  Divider,
  useTheme,
} from "react-native-paper";
import { modeAppbarHeight } from "react-native-paper/src/components/Appbar/utils";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

type AppBarProps = React.PropsWithChildren<{
  title: string | undefined;
  titleStyle?: AppbarContentProps["titleStyle"];
  backAction?: boolean;
  opacity?: number;
  divider?: boolean;
  options?: AppbarHeaderProps;
}>;

const APPBAR_MODE = "small";
const APPBAR_HEIGHT = modeAppbarHeight[APPBAR_MODE];

export function AppBar({
  title,
  titleStyle,
  backAction = true,
  opacity,
  divider = false,
  options,
  ...props
}: AppBarProps) {
  const { canGoBack, goBack } = useNavigation();
  const theme = useTheme();

  return (
    <>
      <Appbar.Header
        style={[styles.header, { opacity: opacity ?? 1 }]}
        {...options}
        {...props}
      >
        {backAction && canGoBack() && (
          <Appbar.BackAction onPress={() => goBack()} />
        )}
        <Appbar.Content
          titleStyle={[titleStyle, { fontSize: 24 }]}
          title={title}
        />
        {props.children}
      </Appbar.Header>
      {divider && (
        <Divider bold style={{ backgroundColor: theme.colors.primary }} />
      )}
    </>
  );
}

export function AnimatedAppBar({ title, children }: AppBarProps) {
  const { visible } = useAnimatedAppBar();

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: (1 - visible.value) * -APPBAR_HEIGHT }],
    };
  });

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
        },
        animatedStyle,
      ]}
    >
      <AppBar title={title}>{children}</AppBar>
    </Animated.View>
  );
}

export const HomeAppBar = () => {
  const { signOut } = useSession();
  const { t } = useTranslation();
  const theme = useTheme();

  return (
    <>
      <AppBar
        titleStyle={{ color: theme.colors.secondary }}
        backAction={false}
        title={t("Home")}
      >
        <Appbar.Action icon="magnify" onPress={() => {}} />
        <Appbar.Action icon="dots-vertical" onPress={() => signOut()} />
      </AppBar>
      <Divider style={{ backgroundColor: theme.colors.primary }} />
    </>
  );
};

const styles = StyleSheet.create({
  header: {},
});
