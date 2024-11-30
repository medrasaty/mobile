import Page from "@/components/Page";
import { ThemedText } from "@/components/ThemedText";
import UserGridList from "../components/UsersGridList";
import { useFollowersQuery } from "../queries";
import FrienshipScreenActivityIndicator from "../components/FrienshipScreenActivityIndicator";
import NetworkError from "@/components/NetworkError";

type FollowerScreenProps = {};

const FollowerScreen = ({}: FollowerScreenProps) => {
  const q = useFollowersQuery();

  return (
    <Page>
      {q.isPending ? (
        <FrienshipScreenActivityIndicator />
      ) : q.isError ? (
        <NetworkError onRetry={q.refetch} message="something went wrong!" />
      ) : q.data ? (
        <UserGridList
          onRefresh={q.refetch}
          isRefreshing={q.isRefetching}
          users={q.data}
        />
      ) : (
        <ThemedText>Couldn't get the data</ThemedText>
      )}
    </Page>
  );
};

export default FollowerScreen;
