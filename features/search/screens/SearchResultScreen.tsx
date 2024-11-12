import Page from "@/components/Page";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { SafeAreaView } from "@/components/styled";
import { useLocalSearchParams } from "expo-router";
import useSearch from "../queries";
import { ScreenListV2 } from "@/components/ScreenFlatList";
import { AppBar } from "@/features/navigation/components/AppBar";
import QuestionCard from "@/features/forum/components/question/QuestionCard";
import { Question } from "@/types/forum.types";

type SearchResultScreenProps = {};

const SearchResultScreen = ({}: SearchResultScreenProps) => {
  const { q: searchQuery } = useLocalSearchParams<{ q: string }>();

  const q = useSearch(searchQuery ?? "");

  const renderItem = ({ item, index }: { item: Question; index: number }) => {
    return <QuestionCard question={item} />;
  };

  return (
    <>
      <AppBar title="result" />
      <Page>
        <ScreenListV2
          renderItem={renderItem}
          data={q.data}
          estimatedItemSize={200}
          onRetry={q.refetch}
          isPending={q.isFetching}
          isError={q.isError}
        />
      </Page>
    </>
  );
};

export default SearchResultScreen;
