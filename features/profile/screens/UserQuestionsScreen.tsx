import Page from "@/components/Page";
import { ScreenListV3 } from "@/components/ScreenFlatList";
import { ThemedText } from "@/components/ThemedText";
import useUsernameParam from "@/features/profile/hooks/useUsernameParam";
import { useCallback } from "react";
import { useTheme } from "react-native-paper";
import useProfileQuestions from "../hooks/useProfileQuestions";
import QuestionCard, {
  QUESTION_CARD_HEIGHT,
} from "@/features/forum/components/question/QuestionCard";
import { Question } from "@/types/forum.types";
import FullPageLoadingIndicator from "@/components/FullPageLoadingIndicator";
import useFilterOptions from "@/hooks/useFilterOptions";
import { t } from "i18next";
import FilterOptionsView from "@/components/FilterOptionsView";
import { useForumQuestions } from "@/features/forum/queries";
import useUserQuestions from "../queries";
import ForumQuestionCard from "@forum/questions/components/QuestionsCard";

const UserQuestionsScreen = () => {
  const username = useUsernameParam();

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

  const q = useUserQuestions(username, { ordering: currentFilter });

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

  if (!username) return <FullPageLoadingIndicator />;
  return (
    <Page>
      <ScreenListV3
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 10 }}
        estimatedItemSize={QUESTION_CARD_HEIGHT}
        onRefresh={handleRefresh}
        refreshing={q.isRefetching}
        q={q}
        renderItem={renderItem}
      />
    </Page>
  );
};

export default UserQuestionsScreen;
