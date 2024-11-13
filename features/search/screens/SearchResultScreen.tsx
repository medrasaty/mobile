import Page from "@/components/Page";
import { SafeAreaView } from "@/components/styled";
import { useLocalSearchParams, useRouter } from "expo-router";
import useSearch from "../queries";
import { ScreenListV2 } from "@/components/ScreenFlatList";
import QuestionCard from "@/features/forum/components/question/QuestionCard";
import { Question } from "@/types/forum.types";
import { Searchbar, useTheme } from "react-native-paper";
import { containerMargins } from "@/constants/styels";
import { useState } from "react";
import { MotiView } from "moti";
import { View, ViewProps } from "react-native";
import useSearchQuery from "../hooks";
import { ThemedText } from "@/components/ThemedText";
import { t } from "i18next";

type SearchResultScreenProps = {};

const QuestionsSearchResultScreen = ({}: SearchResultScreenProps) => {
  const searchQuery = useSearchQuery();

  const q = useSearch(searchQuery);

  const renderItem = ({ item, index }: { item: Question; index: number }) => {
    return <QuestionCard question={item} />;
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
    <SafeAreaView>
      <Page>
        <SearchResultSearchbar />
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
    </SafeAreaView>
  );
};

export const SearchResultSearchbar = (props: ViewProps) => {
  const theme = useTheme();
  const router = useRouter();
  const { q: searchQuery } = useLocalSearchParams<{ q: string }>();
  const [searchValue, setSearchValue] = useState(searchQuery ?? "");

  const handelSearchIconPress = () => {
    if (searchValue.trim() === "") {
      router.back();
    }
    router.setParams({
      q: searchValue,
    });
  };

  return (
    <MotiView {...props}>
      <Searchbar
        style={containerMargins}
        onChangeText={(text) => setSearchValue(text)}
        onIconPress={handelSearchIconPress}
        icon={searchValue.trim() === "" ? "arrow-right" : "magnify"}
        showDivider={false}
        mode="bar"
        value={searchValue}
      />
    </MotiView>
  );
};

export default QuestionsSearchResultScreen;
