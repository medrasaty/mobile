import Page from "@/components/Page";
import { ThemedText } from "@/components/ThemedText";
import { ActivityIndicator } from "react-native";
import { UserGridList } from "../components/UsersGridList";
import useFollowingQuery from "../hooks/useFollowingQuery";
import useFriendsQuery from "../hooks/useFriendsQuery";
import { useMemo } from "react";
import FrienshipScreenActivityIndicator from "../components/FrienshipScreenActivityIndicator";

const FollowingScreen = () => {
  const query = useFriendsQuery();

  const followings = useMemo(
    () => query.data?.filter((user) => user.is_following) || [],
    [query]
  );

  return (
    <Page>
      {query.isPending ? (
        <FrienshipScreenActivityIndicator />
      ) : query.isError ? (
        <ThemedText>Error</ThemedText>
      ) : followings ? (
        <UserGridList
          onRefresh={query.refetch}
          isRefreshing={query.isRefetching}
          users={followings}
        />
      ) : (
        <ThemedText>Couldn't get the data</ThemedText>
      )}
    </Page>
  );
};

export default FollowingScreen;
