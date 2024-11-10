import Page from "@/components/Page";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React, { useMemo, useState } from "react";
import { ActivityIndicator, Divider } from "react-native-paper";
import useYourFollowingRequestQuery from "../hooks/useYourFollowingRequestQuery";
import { FollowingRequest } from "../types";
import FollowingRequestCell from "../components/FollowingRequestCell";
import { RefreshControl, useWindowDimensions } from "react-native";
import { FlashList, FlashListProps } from "@shopify/flash-list";
import FilterOptionsView, {
  FilterOption,
} from "@/components/FilterOptionsView";
import { useTranslation } from "react-i18next";
import { YourFollowingRequestsScreenContext } from "../contexts/YourFollowingScreenContexts";
import ScreenList from "@/components/ScreenFlatList";

const FollowingRequestsFromMeScreen = () => {
  const { t } = useTranslation();
  const filterOptions = useMemo(
    () => [
      { label: t("all"), value: "" },
      { label: t("accepted"), value: "accepted" },
      { label: t("rejected"), value: "rejected" },
      { label: t("pending"), value: "pending" },
    ],
    []
  );

  const [filter, setFilter] = useState<FilterOption["value"]>(
    filterOptions[0]["value"]
  );

  const q = useYourFollowingRequestQuery({
    params: { status: filter },
  });
  const { height } = useWindowDimensions();

  const emptyList = () => {
    return (
      <ThemedView style={{ marginTop: height / 2.5, alignItems: "center" }}>
        <ThemedText variant="titleMedium">No requests yet.</ThemedText>
      </ThemedView>
    );
  };

  return (
    <YourFollowingRequestsScreenContext.Provider
      value={{ filter, setFilter, filterOptions }}
    >
      <Page>
        <FilterOptionsView
          filterOptions={filterOptions}
          currentFilter={filter}
          onFilterChange={(filter) => setFilter(filter)}
        />
        <ScreenList
          renderItem={({ item, index }) => (
            <FollowingRequestCell request={item} />
          )}
          onRetry={q.refetch}
          estimatedItemSize={100}
          refreshing={q.isRefetching}
          onRefresh={q.refetch}
          isPending={q.isPending}
          isError={q.isError}
          data={q.data}
          ListEmptyComponent={emptyList}
        />
      </Page>
    </YourFollowingRequestsScreenContext.Provider>
  );

  return (
    <YourFollowingRequestsScreenContext.Provider
      value={{ filter, setFilter, filterOptions }}
    >
      <Page>
        <ThemedView style={{ margin: 10 }}>
          <FilterOptionsView
            filterOptions={filterOptions}
            currentFilter={filter}
            onFilterChange={(filter) => setFilter(filter)}
          />
        </ThemedView>
        {q.isPending ? (
          <ActivityIndicator />
        ) : q.isError ? (
          <ThemedText>Error</ThemedText>
        ) : q.data ? (
          <>
            <FollowingRequestList
              data={q.data}
              refreshing={q.isRefetching}
              onRefresh={q.refetch}
            />
          </>
        ) : (
          <ThemedText>Couldn't get daa</ThemedText>
        )}
      </Page>
    </YourFollowingRequestsScreenContext.Provider>
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
  const { height } = useWindowDimensions();

  const emptyList = () => {
    return (
      <ThemedView style={{ marginTop: height / 2.5, alignItems: "center" }}>
        <ThemedText variant="titleMedium">No requests yet.</ThemedText>
      </ThemedView>
    );
  };

  return (
    <ThemedView style={{ flex: 1 }}>
      <FlashList
        data={data}
        renderItem={({ item, index }) => (
          <FollowingRequestCell request={item} />
        )}
        estimatedItemSize={120}
        refreshControl={
          <RefreshControl
            refreshing={props.refreshing ?? false}
            onRefresh={props.onRefresh ?? undefined}
          />
        }
        ListEmptyComponent={emptyList}
        {...props}
      />
    </ThemedView>
  );
};

export default FollowingRequestsFromMeScreen;
