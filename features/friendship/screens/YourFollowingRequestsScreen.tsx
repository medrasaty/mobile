import Page from "@/components/Page";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { FlashList, FlashListProps } from "@shopify/flash-list";
import React from "react";
import { ActivityIndicator, Surface } from "react-native-paper";
import useYourFollowingRequestQuery from "../hooks/useYourFollowingRequestQuery";
import { FollowingRequest } from "../types";
import Row from "@/components/Row";
import FollowingRequestCell from "../components/FollowingRequestCell";
import { FlatList, RefreshControl } from "react-native";

const YourFollowingRequestsScreen = () => {
  const query = useYourFollowingRequestQuery();

  return (
    <Page>
      {query.isPending ? (
        <ActivityIndicator />
      ) : query.isError ? (
        <ThemedText>Error</ThemedText>
      ) : query.data ? (
        <FollowingRequestList
          data={query.data}
          refreshing={query.isRefetching}
          onRefresh={query.refetch}
        />
      ) : (
        <ThemedText>Couldn't get daa</ThemedText>
      )}
    </Page>
  );
};

type FollowingRequestsListProps = Omit<
  Omit<FlashListProps<FollowingRequest>, "renderItem">,
  "estimatedItemSize"
>;

const FollowingRequestList = ({
  data,
  ...props
}: FollowingRequestsListProps) => {
  return (
    <FlashList
      data={data}
      renderItem={({ item, index }) => <FollowingRequestCell request={item} />}
      estimatedItemSize={100}
      refreshControl={
        <RefreshControl
          refreshing={props.refreshing ?? false}
          onRefresh={props.onRefresh ?? undefined}
        />
      }
      {...props}
    />
  );
};

export default YourFollowingRequestsScreen;
