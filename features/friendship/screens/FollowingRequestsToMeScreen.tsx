import Page from "@/components/Page";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useInfiniteFollwingRequestsToMe } from "../hooks/useFollowingRequestsToMe";
import FullPageLoadingIndicator from "@/components/FullPageLoadingIndicator";
import { FollowingRequest } from "../types";
import FollowingRequestsToMeCell from "../components/FollowingRequestToMeCell";
import Animated, { LinearTransition } from "react-native-reanimated";
import {
  FlatListProps,
  RefreshControl,
  useWindowDimensions,
} from "react-native";
import { useMemo } from "react";
import ListFooterActivityIndicator from "@/components/ListFooterActivityIndicator";
import NetworkError from "@/components/NetworkError";

const FollowingRequestsToMeScreen = () => {
  const user = useCurrentUser();
  return user.is_private ? <FollowingRequestsToMe /> : <NotPrivateAccount />;
};

export const FollowingRequestsToMe = () => {
  const q = useInfiniteFollwingRequestsToMe();

  const data = useMemo(() => {
    if (!q.data) return [];

    return q.data.pages.map((page) => page.results).flat();
  }, [q.data]);

  return (
    <Page>
      {q.isPending ? (
        <FullPageLoadingIndicator />
      ) : q.isSuccess ? (
        <FollowingRequestsToMeList
          refreshing={q.isRefetching}
          onRefresh={q.refetch}
          data={data}
        />
      ) : (
        <NetworkError onRetry={q.refetch} />
      )}
    </Page>
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
  const { height } = useWindowDimensions();

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
      <ThemedView
        style={{
          marginTop: height / 2.6,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ThemedText>No items left</ThemedText>
      </ThemedView>
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
      onEndReachedThreshold={15}
      ListEmptyComponent={renderEmptyList}
      onEndReached={handleOnEndReached}
      itemLayoutAnimation={LinearTransition}
      {...props}
    />
  );
};

const Error = () => {
  return <ThemedText>Error</ThemedText>;
};

const NotPrivateAccount = () => {
  // TODO: create beautifull and descriptfull page
  return (
    <Page>
      <ThemedView>
        <ThemedText>
          You must change your account type to see this page.
        </ThemedText>
      </ThemedView>
    </Page>
  );
};

export default FollowingRequestsToMeScreen;
