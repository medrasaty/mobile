import { SafeAreaView } from "@/components/styled";
import { router } from "expo-router";
import { Searchbar } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { useSearchStore } from "../store";
import { ThemedText } from "@components/ThemedText";
import { FlatList, ScrollView, View } from "react-native";
import { useForumQuestions } from "@forum/queries";
import ForumQuestionCard, {
  FORUM_QUESTION_CARD_HEIGHT,
} from "@forum/questions/components/QuestionsCard";
import {
  containerMargins,
  containerPaddings,
  debugStyle,
} from "@/constants/styels";
import LoadingIndicator from "@components/LoadingIndicator";

const MainSearchScreen = () => {
  console.log("main rendering");

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Search />
        {/* Latest Questions */}
        <View style={{ gap: 20, marginTop: 20 }}>
          <HSection />
          <HSection />
          <HSection />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export type HSectionProps = {};

export const HSection = () => {
  const q = useForumQuestions();
  return (
    <View>
      <ThemedText style={containerMargins} variant="displaySmall">
        احدث الأسئلة
      </ThemedText>
      {q.data ? (
        <FlatList
          contentContainerStyle={containerPaddings}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={q.data}
          renderItem={({ item }) => {
            return <ForumQuestionCard compact question={item} />;
          }}
        />
      ) : (
        <View
          style={{
            justifyContent: "center",
            height: FORUM_QUESTION_CARD_HEIGHT,
            ...debugStyle,
          }}
        >
          <LoadingIndicator size={"large"} />
        </View>
      )}
    </View>
  );
};

export const Search = () => {
  const { query, setQuery } = useSearchStore();
  const { t } = useTranslation();
  console.log("search rendering");

  const hanldeSearchIconPress = () => {
    if (query.trim() !== "")
      router.push({
        pathname: "/search/questions",
      });
  };

  return (
    <Searchbar
      value={query}
      onIconPress={hanldeSearchIconPress}
      onChangeText={(text) => setQuery(text)}
      placeholder={t("Search")}
      blurOnSubmit
      onKeyPress={(e) => console.log(e.nativeEvent.key)}
    />
  );
};

export default MainSearchScreen;
