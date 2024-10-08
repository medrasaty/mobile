import React, { useRef, useCallback } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

// Sample data with variable content length
const data = Array.from({ length: 50 }, (_, i) => ({
  id: i.toString(),
  title: `Item ${i}`,
  content: "Lorem ipsum ".repeat(Math.floor(Math.random() * 5) + 1), // Random content length
}));

export default function Component() {
  const itemHeights = useRef({});
  const viewableItems = useRef([]);

  const onLayout = useCallback((event, id) => {
    const { height } = event.nativeEvent.layout;
    itemHeights.current[id] = height;
  }, []);

  // calculate the total height of viewableItems
  let totalHeight = 0;
  viewableItems.current.forEach((item) => {
    totalHeight += itemHeights.current[item.item.id];
  });

  alert(totalHeight);

  const onViewableItemsChanged = useCallback(({ viewableItems: vItems }) => {
    viewableItems.current = vItems;
    console.log("Viewable items heights:");
    vItems.forEach((item) => {
      console.log(
        `Item ${item.item.id}: ${itemHeights.current[item.item.id]}px`
      );
    });
  }, []);

  const renderItem = useCallback(
    ({ item }) => (
      <View style={styles.item} onLayout={(event) => onLayout(event, item.id)}>
        <Text style={styles.title}>{item.title}</Text>
        <Text>{item.content}</Text>
      </View>
    ),
    []
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 50,
      }}
    />
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
});
// import Page from "@/components/Page";

// import { ThemedView } from "@/components/ThemedView";
// import { useSession } from "@/hooks/useSession";
// import { Animated, FlatList, StyleSheet } from "react-native";
// import { SafeAreaView } from "@/components/styled";
// import { AnimatedFlashList } from "@shopify/flash-list";

// type LeaderBoardProps = {};

// const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

// const LeaderBoard = ({}: LeaderBoardProps) => {
//   const y = new Animated.Value(0);
//   const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y } } }], {
//     useNativeDriver: true,
//   });

//   return (
//     <AnimatedFlatList
//       scrollEventThrottle={16}
//       bounces={false}
//       data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
//       renderItem={({ index }) => <Box key={index} y={y} />}
//       keyExtractor={(item) => item.toString()}
//       {...{ onScroll }}
//     />
//   );
// };

// const BOX_HEIGHT = 100;

// export const Box = ({ y }: { y: Animated.Value }) => {
//   // generate random backgroundColor
//   const backgroundColor = Math.floor(Math.random() * 16777215).toString(16);
//   const translateY = Animated.add(
//     y,
//     y.interpolate({
//       inputRange: [0, BOX_HEIGHT],
//       outputRange: [0, -BOX_HEIGHT],
//       extrapolate: "clamp",
//     })
//   );

//   return (
//     <Animated.View
//       style={[
//         styles.box,
//         { backgroundColor: `#${backgroundColor}`, transform: [{ translateY }] },
//       ]}
//     ></Animated.View>
//   );
// };

// const styles = StyleSheet.create({
//   box: {
//     flex: 1,
//     height: 100,
//     margin: 10,
//   },
// });

// export default LeaderBoard;
