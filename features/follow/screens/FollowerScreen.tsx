import Page from "@/components/Page";
import { ThemedText } from "@/components/ThemedText";
import UserGridList from "../components/UsersGridList";
import useFriendsQuery from "../hooks/useFriendsQuery";
import { useMemo } from "react";
import FrienshipScreenActivityIndicator from "../components/FrienshipScreenActivityIndicator";
import FrienshipScreenError from "../components/FrienshipScreenError";

type FollowerScreenProps = {};

const FollowerScreen = ({}: FollowerScreenProps) => {
  const query = useFriendsQuery();

  const followers = useMemo(
    () => query.data?.filter((user) => user.is_follower) || [],
    [query]
  );

  return (
    <Page>
      {query.isPending ? (
        <FrienshipScreenActivityIndicator />
      ) : query.isError ? (
        <FrienshipScreenError message="something went wrong!" />
      ) : followers ? (
        <UserGridList
          onRefresh={query.refetch}
          isRefreshing={query.isRefetching}
          users={followers}
        />
      ) : (
        <ThemedText>Couldn't get the data</ThemedText>
      )}
    </Page>
  );
};

export default FollowerScreen;
