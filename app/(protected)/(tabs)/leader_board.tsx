import Page from "@/components/Page";
import React, { useState } from "react";
import {} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useTheme, Text, Divider } from "react-native-paper";
import View from "@/components/styled/View";
import { Pressable, Image, StyleSheet } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { ImageViewer } from "react-native-image-zoom-viewer";
import { useQuery } from "@tanstack/react-query";
import { AppBar } from "@/features/navigation/components/AppBar";

export default function LeaderBoard() {
  return (
    <Page>
      <Divider />
    </Page>
  );
}

const Line = () => {
  return <Divider />;
};

const PositionIndicator = () => {
  const originX = 0;
  const originY = 0;

  const translateX = useSharedValue(originX);
  const translateY = useSharedValue(originY);
  const [isPressed, setIsPressed] = useState(false);

  const soloGesture = Gesture.LongPress().onStart(() => {});

  const dragGesture = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = e.translationX;
      translateY.value = e.translationY;
    })
    .onEnd(() => {
      translateX.value = withTiming(originX);
      translateY.value = withTiming(originY);
    })
    .onStart(() => {});

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });
  const theme = useTheme();

  return (
    <GestureDetector gesture={dragGesture}>
      <Animated.View
        style={[
          animatedStyles,
          {
            backgroundColor: theme.colors.errorContainer,
            width: 100,
            height: 100,
            borderRadius: theme.roundness + 20,
          },
        ]}
      />
    </GestureDetector>
  );
};

const AnimatedImage = Animated.createAnimatedComponent(Image);

export function ZoomableImage({ uri, initialSize }) {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const scale = useSharedValue(1);

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
    scale.value = withTiming(1);
  };

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const gesture = Gesture.Pan()
    .onUpdate((e) => {})
    .onEnd(() => {});

  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      scale.value = e.scale;
    })
    .onEnd(() => {
      scale.value = withTiming(1);
    });

  const composed = Gesture.Simultaneous(gesture, pinchGesture);
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <GestureDetector gesture={composed}>
        <Pressable onPress={toggleFullScreen}>
          <AnimatedImage
            source={{ uri }}
            style={[styles.image, initialSize, animatedStyles]}
          />
        </Pressable>
      </GestureDetector>
      {isFullScreen && (
        <View style={styles.fullScreenContainer}>
          <ImageViewer
            imageUrls={[{ url: uri }]}
            onCancel={toggleFullScreen}
            enableSwipeDown
            onSwipeDown={toggleFullScreen}
            backgroundColor="gray"
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    resizeMode: "contain",
  },
  fullScreenContainer: {
    ...StyleSheet.absoluteFillObject,
  },
});
