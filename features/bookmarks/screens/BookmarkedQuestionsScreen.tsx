import { ViewProps } from "react-native";
import { useBookmarkedQuestionsQuery } from "../queries";
import { AppBar } from "@features/navigation/components/AppBar";
import Page from "@components/Page";
import { QueryPage } from "@components/QueryView";
import { ContainerView } from "@components/styled";
import { useTranslation } from "react-i18next";
import { FAB } from "react-native-paper";
import FilterOptionsView from "@components/FilterOptionsView";
import { SearchContextProvider, SearchContextbar, useSearchContext } from "@/contexts/SearchContext";
import { Appbar } from "react-native-paper";

type BookmarkedQuestionsScreenProps = {} & ViewProps;

const OptionsAppbar = () => {
  const { setIsSearch } = useSearchContext();
  const { t } = useTranslation();
  return (
    <AppBar divider title={t("Solo")}>
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

const BookmarkedQuestionsScreenContent = ({
  ...props
}: BookmarkedQuestionsScreenProps) => {
  const { t } = useTranslation();
  const { options, currentFilter, onFilterChange } = useFilterOptions([
    { label: t("Newest"), value: "-bookmarked_at" },
    { label: t("Oldest"), value: "bookmarked_at" },
  ]);
  const { searchValue } = useSearchContext();
  const q = useBookmarkedQuestionsQuery({
    ordering: currentFilter,
    search: searchValue,
  });

  const renderHeader = () => (
    <ContainerView>
      <FilterOptionsView
        container={false}
        currentFilter={currentFilter}
        filterOptions={options}
        onFilterChange={onFilterChange}
      />
    </ContainerView>
  );

  const renderItem = ({ item }: { item: BookmarkQuestion }) => (
    <Animated.View layout={LinearTransition}>
      <BookmarkQuestionCard question={item} />
    </Animated.View>
  );

  return (
    <Page>
      <BookmarkAppbar />
      <QueryPage query={q}>
        <AnimatedFlashList
          showsVerticalScrollIndicator={false}
          scrollEnabled={!q.isRefetching}
          estimatedItemSize={BOOKMARK_QUESTION_CARD_HEIGHT}
          ItemSeparatorComponent={Divider}
          ListFooterComponent={Divider}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={{
            paddingTop: 10,
            paddingBottom: 100,
          }}
          renderItem={renderItem}
          data={q.data?.results ?? []}
          keyExtractor={(item) => item.question.id}
          refreshing={q.isRefetching}
          onRefresh={q.refetch}
        />
      </QueryPage>
    </Page>
  );
};

const BookmarkQuestionAppBar = ({ title }: { title: string }) => {
  return <AppBar title={title} />;
}

import { memo } from "react";
import { AnimatedFlashList, FlashListProps } from "@shopify/flash-list";
import { BookmarkQuestion } from "../types";
import BookmarkQuestionCard, { BOOKMARK_QUESTION_CARD_HEIGHT } from "../components/BookmarkQuestionCard";
import { Divider } from "react-native-paper";
import Animated, { LinearTransition } from 'react-native-reanimated';
import useFilterOptions from "@/hooks/useFilterOptions";

/**
 * A memoized list component for displaying bookmarked questions
 * Extracted to its own file to improve hot reload performance
 */
export const BookmarkedQuestionsList = memo(function BookmarkedQuestionsList({
  ...props
}: Omit<FlashListProps<BookmarkQuestion>, "renderItem">) {
  return (
    <AnimatedFlashList
      showsVerticalScrollIndicator={false}
      estimatedItemSize={BOOKMARK_QUESTION_CARD_HEIGHT}
      ItemSeparatorComponent={Divider}
      renderItem={({ item }: { item: BookmarkQuestion }) => (
        <Animated.View layout={LinearTransition}>
          <BookmarkQuestionCard question={item} />
        </Animated.View>
      )}
      {...props}
    />
  );
});

export default BookmarkedQuestionsScreen;
