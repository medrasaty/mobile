import Page from "@/components/Page";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import useFollowerQuery from "../hooks/useFollowersQuery";
import { ActivityIndicator, FlatList } from "react-native";
import { BaseUser } from "@/types/user.types";
import UserCompactCell from "../components/UserCompactCell";
import {
  DEFAULT_CONTAINER_SPACING,
  containerPaddings,
} from "@/constants/styels";
import { StyleSheet } from "react-native";

type FollowingScreenProps = {};

const FollowingScreen = ({}: FollowingScreenProps) => {
  const query = useFollowerQuery();
  return (
    <Page>
      {query.isPending ? (
        <ActivityIndicator />
      ) : query.isError ? (
        <ThemedText>Error</ThemedText>
      ) : query.data ? (
        <FollowingList followings={query.data} />
      ) : (
        <ThemedText>Couldn't get the data</ThemedText>
      )}
    </Page>
  );
};

export const FollowingList = ({ followings }: { followings: BaseUser[] }) => {
  return (
    <ThemedView style={styles.container}>
      <FlatList
        renderItem={({ item, index }) => {
          return <UserCompactCell key={index} user={item} />;
        }}
        data={followings}
        // estimatedItemSize={400}
        showsVerticalScrollIndicator={false}
        numColumns={3}
        contentContainerStyle={{
          gap: 2 * DEFAULT_CONTAINER_SPACING,
          paddingTop: 10,
        }}
        columnWrapperStyle={{ gap: DEFAULT_CONTAINER_SPACING }}
      />
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FollowingScreen;
