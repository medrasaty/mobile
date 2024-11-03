import { ThemedView } from "@/components/ThemedView";
import { FlatList } from "react-native";
import { BaseUser } from "@/types/user.types";
import UserCompactCell from "../components/UserCompactCell";
import { RefreshControl } from "react-native";
import { DEFAULT_CONTAINER_SPACING } from "@/constants/styels";
import { StyleSheet } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";

type UserGridListProps = {
  users: BaseUser[];
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
  return (
    <ThemedView style={styles.container}>
      <Animated.FlatList
        renderItem={({ item, index }) => {
          return <UserCompactCell key={index} user={item} />;
        }}
        data={users}
        // estimatedItemSize={400}
        showsVerticalScrollIndicator={false}
        numColumns={3}
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
