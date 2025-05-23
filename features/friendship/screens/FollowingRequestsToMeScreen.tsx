import Page from "@/components/Page";
import { useInfiniteFollwingRequestsToMe } from "../hooks/useFollowingRequestsToMe";
import FullPageLoadingIndicator from "@/components/FullPageLoadingIndicator";
import { FollowingRequest } from "../types";
import FollowingRequestsToMeCell from "../components/FollowingRequestToMeCell";
import Animated, { LinearTransition } from "react-native-reanimated";
import { FlatListProps, RefreshControl } from "react-native";
import { useMemo } from "react";
import ListFooterActivityIndicator from "@/components/ListFooterActivityIndicator";
import ErrorView from "@components/ErrorView";
import { AppBar } from "@features/navigation/components/AppBar";
import EmptyStateView from "@components/EmptyStateView";
import { Divider } from "react-native-paper";

const FollowingRequestsToMeScreen = () => {
  return (
    <Page>
      <AppBar title="following request to me" />
      <FollowingRequestsToMe />
    </Page>
  );
};

export const FollowingRequestsToMe = () => {
  const q = useInfiniteFollwingRequestsToMe();

  const data = useMemo(() => {
    if (!q.data) return [];

    return q.data.pages.map((page) => page.results).flat();
  }, [q.data]);

  return (
    <>
      {q.isPending ? (
        <FullPageLoadingIndicator />
      ) : q.isSuccess ? (
        <FollowingRequestsToMeList
          refreshing={q.isRefetching}
          onRefresh={q.refetch}
          data={data}
        />
      ) : (
        <ErrorView
          error={"Network error, check you internet connection and try again!"}
          onRetry={q.refetch}
        />
      )}
    </>
  );
};

type FollowingRequestsToMeListProps = Omit<
  Omit<FlatListProps<FollowingRequest>, "renderItem">,
  "estimatedItemSize"
>;

const FollowingRequestsToMeList = ({
  data,
  ...props
}: FollowingRequestsToMeListProps) => {
  const q = useInfiniteFollwingRequestsToMe();

  const renderFooter = () => {
    if (q.isFetchingNextPage) {
      return <ListFooterActivityIndicator />;
    }
  };

  const handleOnEndReached = () => {
    q.fetchNextPage();
  };

  const renderEmptyList = () => {
    return (
      <EmptyStateView
        iconName="person-remove-outline"
        title="You don't have any following requests"
      />
    );
  };

  return (
    <Animated.FlatList
      renderItem={({ item, index }) => {
        return <FollowingRequestsToMeCell key={index} request={item} />;
      }}
      // estimatedItemSize={120}
      data={data}
      contentContainerStyle={{ paddingTop: 20, paddingBottom: 30 }}
      refreshControl={
        <RefreshControl
          refreshing={props.refreshing ?? false}
          onRefresh={props.onRefresh ?? undefined}
        />
      }
      ListFooterComponent={renderFooter}
      ItemSeparatorComponent={Divider}
      onEndReachedThreshold={15}
      ListEmptyComponent={renderEmptyList}
      onEndReached={handleOnEndReached}
      itemLayoutAnimation={LinearTransition}
      {...props}
    />
  );
};

export default FollowingRequestsToMeScreen;
