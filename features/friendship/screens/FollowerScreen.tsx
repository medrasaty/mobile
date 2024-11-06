import Page from "@/components/Page";
import { ThemedText } from "@/components/ThemedText";
import UserGridList from "../components/UsersGridList";
import { useFollowersQuery } from "../hooks/useFriendsQuery";
import FrienshipScreenActivityIndicator from "../components/FrienshipScreenActivityIndicator";
import FrienshipScreenError from "../components/FrienshipScreenError";

type FollowerScreenProps = {};

const FollowerScreen = ({}: FollowerScreenProps) => {
  const query = useFollowersQuery();

  return (
    <Page>
      {query.isPending ? (
        <FrienshipScreenActivityIndicator />
      ) : query.isError ? (
        <FrienshipScreenError message="something went wrong!" />
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

export default FollowerScreen;
