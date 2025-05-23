import { NewQuestionFAB } from "@/components/FAB";
import { Question } from "@/types/forum.types";
import { Divider, useTheme, Appbar } from "react-native-paper";
import ForumQuestionCard, {
  FORUM_QUESTION_CARD_HEIGHT,
} from "@forum/questions/components/QuestionsCard";
import { useForumQuestions } from "@forum/queries";
import Page from "@components/Page";
import { ScreenListV3 } from "@components/ScreenFlatList";
import FilterOptionsView from "@components/FilterOptionsView";
import useFilterOptions from "@/hooks/useFilterOptions";
import { useTranslation } from "react-i18next";
import React from "react";
import { useSearchStore } from "@features/search/store";
import { HomeSearchAppbar } from "@features/search/components/HomeSearchAppbar";

export const HomeAppBar = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  const { isSearchActive, setSearchActive } = useSearchStore();

  return isSearchActive ? (
    <HomeSearchAppbar />
  ) : (
    <>
      <Appbar.Header>
        <Appbar.Content
          titleStyle={{ fontSize: 24, color: theme.colors.secondary }}
          title={t("Home")}
        />
        <Appbar.Action icon="magnify" onPress={() => setSearchActive(true)} />
      </Appbar.Header>
    </>
  );
};

export default function HomeScreen() {
  const q = useForumQuestions();

  const { options, onFilterChange, currentFilter } = useFilterOptions([
    // TODO: implement this filtering
    { label: "for you", value: "foryou" },
    { label: "following", value: "followings" },
  ]);

  const renderItem = ({ item }: { item: Question; index: number }) => {
    return <ForumQuestionCard question={item} />;
  };

  const renderHeader = () => {
    return (
      <FilterOptionsView
        filterOptions={options}
        onFilterChange={onFilterChange}
        currentFilter={currentFilter}
      />
    );
  };

  return (
    <Page>
      <HomeAppBar />
      <ScreenListV3
        q={q}
        ListHeaderComponent={renderHeader}
        estimatedItemSize={FORUM_QUESTION_CARD_HEIGHT}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        ItemSeparatorComponent={Divider}
      />
      <NewQuestionFAB />
    </Page>
  );
}
