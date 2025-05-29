import { ThemedView } from "@/components/ThemedView";
import { DEFAULT_CONTAINER_SPACING } from "@/constants/styels";
import { FlatList, RefreshControl, StyleSheet } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";
import UserCompactCell from "./UserCompactCell";
import { FriendUser } from "../types";
import View from "@components/styled/View";

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
  const numOfCells = 1;
  return (
    <View style={styles.container}>
      <FlatList
        renderItem={({ item, index }) => {
          return <UserCompactCell key={index} user={item} />;
        }}
        data={users}
        // estimatedItemSize={400}
        showsVerticalScrollIndicator={false}
        numColumns={numOfCells}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default UserGridList;
