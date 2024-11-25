import Page from "@components/Page";
import { View, ViewProps } from "react-native";
import { useSearchStore } from "../store";
import useSearch from "../queries";

import { ScreenListV2 } from "@/components/ScreenFlatList";
import { Question } from "@/types/forum.types";
import { ThemedText } from "@/components/ThemedText";
import { t } from "i18next";
import ForumQuestionCard from "@forum/questions/components/QuestionsCard";

type SearchResultQuestionsScreenProps = {} & ViewProps;

const SearchResultQuestionsScreen = ({
  ...props
}: SearchResultQuestionsScreenProps) => {
  const query = useSearchStore((state) => state.query);

  const q = useSearch<Question>({ query, type: "questions" });

  const renderItem = ({ item, index }: { item: Question; index: number }) => {
    return <ForumQuestionCard question={item} />;
  };

  const renderEmptyList = () => {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 40,
        }}
      >
        <ThemedText bold variant="titleMedium">
          {t("no_questions_maches_your_query")}
        </ThemedText>
      </View>
    );
  };

  return (
    <Page>
      <ScreenListV2
        ListEmptyComponent={renderEmptyList}
        renderItem={renderItem}
        data={q.data}
        estimatedItemSize={200}
        onRetry={q.refetch}
        isPending={q.isFetching}
        isError={q.isError}
      />
    </Page>
  );
};

export default SearchResultQuestionsScreen;
