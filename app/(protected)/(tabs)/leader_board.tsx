import { Container } from "@/components/styled";
import { SafeAreaView, useAnimatedValue } from "react-native";
import { Button, Text } from "react-native-paper";
import View from "@/components/styled/View";

import LottieView from "lottie-react-native";
import Animated, {
  useSharedValue,
  withSpring,
  withTiming,
  withDelay,
  useAnimatedStyle,
  LinearTransition,
} from "react-native-reanimated";

export default function LeaderBoard() {
  const width = useSharedValue(100);
  const handlePress = () => {
    width.value = withSpring(width.value + 22);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container></Container>
    </SafeAreaView>
  );
}

function App() {
  const width = useSharedValue<number>(0);
  const height = useSharedValue<number>(0);

  const handleRight = () => {
    width.value += 50;
    height.value += 50;
  };

  const handleLeft = () => {
    width.value -= 50;
    height.value -= 50;
  };

  const animatedStyle = useAnimatedStyle(() => ({
    width: withSpring(width.value * 2),
    height: withSpring(height.value * 3),
  }));

  return (
    <>
      <Animated.View
        style={[
          {
            width: 100,
            height: 100,
            borderRadius: 100,
            backgroundColor: "red",
          },
          animatedStyle,
        ]}
      />
      <Button onPress={handleRight}>right</Button>
      <Button onPress={handleLeft}>left</Button>
    </>
  );
}
