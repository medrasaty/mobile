import Page from "@/components/Page";
import { ThemedText } from "@/components/ThemedText";
import { UserGridList } from "../components/UsersGridList";
import useFriendsQuery, { useFollowingQuery } from "../hooks/useFriendsQuery";
import { useMemo } from "react";
import FrienshipScreenActivityIndicator from "../components/FrienshipScreenActivityIndicator";
import { FriendUser } from "../types";
import NetworkError from "@/components/NetworkError";

const FollowingScreen = () => {
  const query = useFollowingQuery();

  return (
    <Page>
      {query.isPending ? (
        <FrienshipScreenActivityIndicator />
      ) : query.isError ? (
        <NetworkError onRetry={query.refetch} />
      ) : query.data ? (
        <UserGridList
          onRefresh={query.refetch}
          isRefreshing={query.isRefetching}
          users={query.data}
        />
      ) : (
        <ThemedText>Couldn't get the data</ThemedText>
      )}
    </Page>
  );
};

export default FollowingScreen;
