import Page from "@/components/Page";
import React, { useEffect, useRef } from "react";

import { ThemedText } from "@/components/ThemedText";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useTheme } from "react-native-paper";

type ProfileProps = {};

const useHighlightAnimatedStyle = () => {
  const theme = useTheme();
  const backgroundColor = useSharedValue(theme.colors.surfaceVariant);

  useEffect(() => {
    backgroundColor.value = withTiming(theme.colors.surface, {
      duration: 2500,
    });
  }, []);

  if (true) {
    return useAnimatedStyle(() => {
      return {
        backgroundColor: backgroundColor.value,
      };
    });
  }
};

const Profile = ({}: ProfileProps) => {
  const theme = useTheme();
  const highlightStyle = useHighlightAnimatedStyle();

  return (
    <Page container style={{ justifyContent: "center", alignItems: "center" }}>
      <Animated.View style={highlightStyle}>
        <ThemedText variant="titleLarge">solo is animating text</ThemedText>
      </Animated.View>
    </Page>
  );
};

export default Profile;
