import { ThemedView } from "@/components/ThemedView";
import { DEFAULT_CONTAINER_SPACING } from "@/constants/styels";
import { RefreshControl, StyleSheet } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";
import UserCompactCell from "./UserCompactCell";
import { FriendUser } from "../types";

type UserGridListProps = {
  users: FriendUser[];
  onRefresh?: () => void;
  isRefreshing?: boolean;
};

export const UserGridList = ({
  users,
  onRefresh,
  isRefreshing = false,
}: UserGridListProps) => {
  /**
   * Render a grid of users compact cells.
   */
  const numOfCells = 2;
  return (
    <ThemedView style={styles.container}>
      <Animated.FlatList
        renderItem={({ item, index }) => {
          return (
            <UserCompactCell numOfCells={numOfCells} key={index} user={item} />
          );
        }}
        data={users}
        // estimatedItemSize={400}
        showsVerticalScrollIndicator={false}
        numColumns={numOfCells}
        contentContainerStyle={{
          gap: 2 * DEFAULT_CONTAINER_SPACING,
          paddingTop: 10,
        }}
        columnWrapperStyle={{ gap: DEFAULT_CONTAINER_SPACING }}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
        onRefresh={onRefresh}
        refreshing={isRefreshing}
        itemLayoutAnimation={LinearTransition}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default UserGridList;
