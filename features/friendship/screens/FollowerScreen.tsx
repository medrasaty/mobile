import Page from "@/components/Page";
import { ScreenListV3 } from "@components/ScreenFlatList";
import UserCompactCell from "../components/UserCompactCell";
import EmptyStateView from "@components/EmptyStateView";
import { useCallback } from "react";
import { useFollowersQuery } from "../queries";

type FollowerScreenProps = {};

const FollowerScreen = ({}: FollowerScreenProps) => {
  const q = useFollowersQuery();

  const renderEmpty = useCallback(() => {
    return <EmptyStateView 
        iconName="people-outline"
        title="No followers"
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
  );
};

export default FollowerScreen;
