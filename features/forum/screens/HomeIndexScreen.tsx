import { NewQuestionFAB } from "@/components/FAB";
import { Question } from "@/types/forum.types";
import { Divider } from "react-native-paper";
import ForumQuestionCard, {
  FORUM_QUESTION_CARD_HEIGHT,
} from "@forum/questions/components/QuestionsCard";
import { useForumQuestions } from "@forum/queries";
import Page from "@components/Page";
import { ScreenListV2 } from "@components/ScreenFlatList";
import { HomeAppBar } from "@features/navigation/components/AppBar";
import FilterOptionsView from "@components/FilterOptionsView";
import useFilterOptions from "@/hooks/useFilterOptions";

export default function HomeScreen() {
  const q = useForumQuestions();
  const { options, onFilterChange, currentFilter } = useFilterOptions([
    // TODO: impolement this filtering
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
      <ScreenListV2
        ListHeaderComponent={renderHeader}
        estimatedItemSize={FORUM_QUESTION_CARD_HEIGHT}
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        ItemSeparatorComponent={Divider}
        data={q.data}
        isPending={q.isPending}
        isError={q.isError}
        onRetry={q.refetch}
        errorMessage="error"
      />
      <NewQuestionFAB />
    </Page>
  );
}
