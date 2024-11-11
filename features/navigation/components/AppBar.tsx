import { useAnimatedAppBar } from "@/contexts";
import { useSession } from "@/hooks/useSession";
import { useNavigation } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { Appbar, AppbarHeaderProps } from "react-native-paper";
import { modeAppbarHeight } from "react-native-paper/src/components/Appbar/utils";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

type AppBarProps = React.PropsWithChildren<{
  title: string | undefined;
  backAction?: boolean;
  opacity?: number;
  options?: AppbarHeaderProps;
}>;

const APPBAR_MODE = "small";
const APPBAR_HEIGHT = modeAppbarHeight[APPBAR_MODE];

export function AppBar({
  title,
  backAction = true,
  opacity,
  options,
  ...props
}: AppBarProps) {
  const { canGoBack, goBack } = useNavigation();

  return (
    <Appbar.Header
      style={[styles.header, { opacity: opacity ?? 1 }]}
      {...options}
      {...props}
    >
      {/* TODO: write description */}
      {backAction && canGoBack() && (
        <Appbar.BackAction onPress={() => goBack()} />
      )}
      <Appbar.Content title={title} />
      {props.children}
    </Appbar.Header>
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

export const IndexAppBar = ({ title }: { title: string }) => {
  const { signOut } = useSession();

  return (
    <AnimatedAppBar backAction title={title}>
      <Appbar.Action icon="magnify" onPress={() => {}} />
      <Appbar.Action icon="logout" onPress={() => signOut()} />
    </AnimatedAppBar>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 0,
  },
});
