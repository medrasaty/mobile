import Page from "@components/Page";
import { useFollowingQuery } from "../queries";
import { ScreenListV3 } from "@components/ScreenFlatList";
import UserCompactCell from "../components/UserCompactCell";
import { useCallback } from "react";
import EmptyStateView from "@components/EmptyStateView";

const FollowingScreen = () => {
  const q = useFollowingQuery();

  const renderEmpty = useCallback(() => {
    return <EmptyStateView 
        iconName="people-outline"
        title="No following"
        subtitle="Be the first to follow someone"
      />
  }, [q.status]);

  return (
    <Page>
      <ScreenListV3
        q={q}
        renderItem={({ item }) => {
          return <UserCompactCell user={item} />;
        }}
        ListEmptyComponent={renderEmpty}
      />
    </Page>
  )
};

export default FollowingScreen;
