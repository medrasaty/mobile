import { UserGridList } from "../components/UsersGridList";
import { useFollowingQuery } from "../queries";
import { ServerPage } from "@components/ServerView";

const FollowingScreen = () => {
  const q = useFollowingQuery();

  return (
    <ServerPage onRetry={q.refetch} status={q.status}>
      <UserGridList
        onRefresh={q.refetch}
        isRefreshing={q.isRefetching}
        users={q.data ?? []}
      />
    </ServerPage>
  );
};

export default FollowingScreen;
