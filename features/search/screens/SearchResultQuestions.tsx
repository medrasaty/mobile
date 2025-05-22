import Page from "@components/Page";
import { StyleSheet, View, ViewProps } from "react-native";
import { useSearchStore } from "../store";
import useSearch from "../queries";
import { ScreenListV2 } from "@/components/ScreenFlatList";
import { Question } from "@/types/forum.types";
import { useTranslation } from "react-i18next";
import ForumQuestionCard from "@forum/questions/components/QuestionsCard";
import { ActivityIndicator, Divider } from "react-native-paper";
import EmptyStateView from "@/components/EmptyStateView";

type SearchResultQuestionsScreenProps = {} & ViewProps;

const SearchResultQuestionsScreen = ({
  ...props
}: SearchResultQuestionsScreenProps) => {
  const { t } = useTranslation();
  const query = useSearchStore((state) => state.query);

  // Use the enhanced search hook
  const searchQuery = useSearch<Question>({ query, type: "questions" });

  const renderItem = ({ item }: { item: Question }) => {
    return <ForumQuestionCard question={item} />;
  };

  // If no query is provided, show empty query view
  if (!query.trim()) {
    return (
      <Page {...props}>
        <EmptyStateView
          iconName="search-outline"
          title={t("Enter a search query to find questions")}
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
              title={t("No questions found")}
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
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  emptyText: {
    textAlign: "center",
    fontWeight: "600",
  },
  subtitleText: {
    textAlign: "center",
    marginTop: 8,
    opacity: 0.7,
    maxWidth: "80%",
  },
  retryButton: {
    marginTop: 8,
    paddingHorizontal: 24,
  },
  loadingIndicator: {
    padding: 16,
  },
});

export default SearchResultQuestionsScreen;
