import Page from "@components/Page";
import { StyleSheet, View, ViewProps } from "react-native";
import { useSearchStore } from "../store";
import useSearch from "../queries";
import { ScreenListV2 } from "@/components/ScreenFlatList";
import { ThemedText } from "@/components/ThemedText";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, Button, Divider } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import SchoolCell from "@features/schools/components/SchoolCell";
import { School } from "@features/schools/types";
import EmptyStateView from "@/components/EmptyStateView";

type SearchResultSchoolsScreenProps = {} & ViewProps;


const SearchResultSchoolsScreen = ({
  ...props
}: SearchResultSchoolsScreenProps) => {
  const { t } = useTranslation();
  const query = useSearchStore((state) => state.query);

  // Use the enhanced search hook
  const searchQuery = useSearch<School>({ query, type: "schools" });

  const renderItem = ({ item }: { item: School }) => {
    return <SchoolCell school={item} />;
  };

  // If no query is provided, show empty query view
  if (!query.trim()) {
    return (
      <Page {...props}>
        <EmptyStateView
          iconName="search-outline"
          title={t("Enter a search query to find schools")}
          subtitle={t("Type in the search bar above to get started")}
        />
      </Page>
    );
  }

  const handleRetry = () => {
    searchQuery.refetch();
  };

  // If we have data, show the list
  return (
    <Page {...props}>
      <ScreenListV2
        data={searchQuery.data}
        renderItem={renderItem}
        ItemSeparatorComponent={Divider}
        ListEmptyComponent={
          searchQuery.isLoading ? null : (
            <EmptyStateView
              iconName="alert-circle-outline"
              title={t("No schools found")}
              subtitle={t("Try different keywords or check your spelling")}
            />
          )
        }
        ListFooterComponent={
          searchQuery.isFetchingNextPage ? (
            <ActivityIndicator style={styles.loadingIndicator} />
          ) : null
        }
        estimatedItemSize={200}
        onRefresh={searchQuery.refetch}
        refreshing={searchQuery.isRefetching}
        onEndReached={() => searchQuery.fetchNextPage()}
        onEndReachedThreshold={0.5}
        isPending={searchQuery.isLoading}
        isError={searchQuery.isError}
        onRetry={handleRetry}
        errorMessage={t("Error loading search results")}
      />
    </Page>
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginTop: 40,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 16,
    color: "gray",
  },
  retryButton: {
    marginTop: 16,
  },
  loadingIndicator: {
    padding: 16,
  },
});

export default SearchResultSchoolsScreen;
