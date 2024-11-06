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

  const query = useYourFollowingRequestQuery({
    params: { status: filter },
  });

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
        {query.isPending ? (
          <ActivityIndicator />
        ) : query.isError ? (
          <ThemedText>Error</ThemedText>
        ) : query.data ? (
          <>
            <FollowingRequestList
              data={query.data}
              refreshing={query.isRefetching}
              onRefresh={query.refetch}
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
        ItemSeparatorComponent={Divider}
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
