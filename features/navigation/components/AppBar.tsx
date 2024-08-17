import { useAnimatedAppBar } from "@/contexts";
import { useNavigation } from "expo-router";
import React from "react";
import { Appbar, useTheme } from "react-native-paper";
import { modeAppbarHeight } from "react-native-paper/src/components/Appbar/utils";
import Animated, { useAnimatedStyle } from "react-native-reanimated";


type AppBarProps = {
  title: string | undefined;
  backAction?: boolean;
} & React.PropsWithChildren;

const APPBAR_MODE = "small";
const APPBAR_HEIGHT = modeAppbarHeight[APPBAR_MODE];

export function AppBar({ title, backAction = false, ...props }: AppBarProps) {
  const navigation = useNavigation();
  const canGoBack = navigation.canGoBack();
  const theme = useTheme();

  return (
    <>
      <Appbar.Header {...props}>
        {canGoBack && <Appbar.BackAction onPress={() => navigation.goBack()} />}
        <Appbar.Content title={title} />
        {props.children}
      </Appbar.Header>
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

export const IndexAppBar = ({ title }: { title: string }) => {
  return (
    <AnimatedAppBar backAction title={title}>
      <Appbar.Action icon="magnify" onPress={() => {}} />
      <Appbar.Action
        icon="dots-vertical"
        onPress={() => alert("solo is menu")}
      />
    </AnimatedAppBar>
  );
};