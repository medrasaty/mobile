import Page from "@/components/Page";
import { ScreenListV3 } from "@/components/ScreenFlatList";
import useUsernameParam from "@/features/profile/hooks/useUsernameParam";
import { useCallback } from "react";
import { FORUM_QUESTION_CARD_HEIGHT } from "@forum/questions/components/QuestionsCard";
import { Question } from "@/types/forum.types";
import FullPageLoadingIndicator from "@/components/FullPageLoadingIndicator";
import useFilterOptions from "@/hooks/useFilterOptions";
import { t } from "i18next";
import FilterOptionsView from "@/components/FilterOptionsView";
import useUserQuestions from "../queries";
import ForumQuestionCard from "@forum/questions/components/QuestionsCard";

const UserQuestionsScreen = () => {
  const userId = useUsernameParam();

  const { currentFilter, options, onFilterChange } = useFilterOptions([
    {
      label: t("newest"),
      value: "-created",
    },
    {
      label: t("most rated"),
      value: "-ratings_value",
    },
    {
      label: t("oldest"),
      value: "created",
    },
  ]);

  const q = useUserQuestions(userId, { ordering: currentFilter });

  const renderItem = useCallback(({ item }: { item: Question }) => {
    return <ForumQuestionCard question={item} />;
  }, []);

  const renderHeader = useCallback(() => {
    return (
      <FilterOptionsView
        style={{ marginBottom: 10, marginTop: 15 }}
        filterOptions={options}
        currentFilter={currentFilter}
        onFilterChange={onFilterChange}
      />
    );
  }, [currentFilter]);

  const handleRefresh = useCallback(() => {
    q.refetch();
  }, []);

  if (!userId) return <FullPageLoadingIndicator />;
  return (
    <Page>
      <ScreenListV3
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 10 }}
        estimatedItemSize={FORUM_QUESTION_CARD_HEIGHT}
        onRefresh={handleRefresh}
        refreshing={q.isRefetching}
        q={q}
        renderItem={renderItem}
      />
    </Page>
  );
};

export default UserQuestionsScreen;
