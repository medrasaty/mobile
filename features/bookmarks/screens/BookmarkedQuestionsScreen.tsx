import { ViewProps } from "react-native";
import { useBookmarkedQuestionsQuery } from "../queries";
import { AppBar } from "@features/navigation/components/AppBar";
import Page from "@components/Page";
import { useTranslation } from "react-i18next";
import { Divider } from "react-native-paper";
import FilterOptionsView from "@components/FilterOptionsView";
import {
  SearchContextProvider,
  SearchContextbar,
  useSearchContext,
} from "@/contexts/SearchContext";
import { Appbar } from "react-native-paper";
import { PaginatedScreenListV3 } from "@/components/ScreenFlatList";
import { View } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { BookmarkQuestion } from "../types";
import BookmarkQuestionCard, {
  BOOKMARK_QUESTION_CARD_HEIGHT,
} from "../components/BookmarkQuestionCard";
import useFilterOptions from "@/hooks/useFilterOptions";

type BookmarkedQuestionsScreenProps = {} & ViewProps;

const OptionsAppbar = () => {
  const { setIsSearch } = useSearchContext();
  const { t } = useTranslation();
  return (
    <AppBar title={t("Solo")}>
      <Appbar.Action icon="magnify" onPress={() => setIsSearch(true)} />
    </AppBar>
  );
};

const BookmarkAppbar = () => {
  const { isSearch } = useSearchContext();
  return isSearch ? <SearchContextbar /> : <OptionsAppbar />;
};

const BookmarkedQuestionsScreen = ({
  ...props
}: BookmarkedQuestionsScreenProps) => (
  <SearchContextProvider>
    <BookmarkedQuestionsScreenContent {...props} />
  </SearchContextProvider>
);

const EmptyBookmarks = () => {
  const { t } = useTranslation();
  return (
    <View
      style={{ justifyContent: "center", alignItems: "center", marginTop: 40 }}
    >
      <ThemedText variant="titleMedium">{t("No bookmarks")}</ThemedText>
    </View>
  );
};

const BookmarkedQuestionsScreenContent = ({
  ...props
}: BookmarkedQuestionsScreenProps) => {
  const { t } = useTranslation();
  const { options, currentFilter, onFilterChange } = useFilterOptions([
    { label: t("Newest"), value: "-bookmarked_at" },
    { label: t("Oldest"), value: "bookmarked_at" },
  ]);
  const { searchValue } = useSearchContext();
  const bookmarksQuery = useBookmarkedQuestionsQuery({
    ordering: currentFilter,
    search: searchValue,
  });

  const renderHeader = () => (
    <FilterOptionsView
      currentFilter={currentFilter}
      filterOptions={options}
      onFilterChange={onFilterChange}
      />
  );

  const renderFooter = () => {
    return null;
    // if (bookmarksQuery.isFetching) return <ListFooterActivityIndicator />;
  };

  const renderItem = ({ item }: { item: BookmarkQuestion }) => (
    <BookmarkQuestionCard question={item} />
  );

  return (
    <Page {...props}>
      <BookmarkAppbar />
      <PaginatedScreenListV3<BookmarkQuestion>
        q={bookmarksQuery}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={BOOKMARK_QUESTION_CARD_HEIGHT}
        ItemSeparatorComponent={Divider}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={EmptyBookmarks}
        contentContainerStyle={{
          paddingBottom: 50,
        }}
        renderItem={renderItem}
        keyExtractor={(item) => item.question.id}
        refreshing={bookmarksQuery.isRefetching}
        onRefresh={bookmarksQuery.refetch}
        overScrollMode="always"
      />
    </Page>
  );
};

export default BookmarkedQuestionsScreen;
