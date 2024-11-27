import { Container, SafeAreaView } from "@/components/styled";
import { router } from "expo-router";
import { Searchbar } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { useSearchStore } from "../store";
import { ThemedText } from "@components/ThemedText";
import {
  FlatList,
  FlatListProps,
  ScrollView,
  View,
  useWindowDimensions,
} from "react-native";
import ForumQuestionCard, {
  FORUM_QUESTION_CARD_HEIGHT,
} from "@forum/questions/components/QuestionsCard";
import { containerMargins, containerPaddings } from "@/constants/styels";
import LoadingIndicator from "@components/LoadingIndicator";
import {
  useLatestQuestions,
  useLatestSchools,
  useLatestUsers,
} from "../queries";
import SchoolCell from "@features/schools/components/SchoolCell";
import SchoolMemberCell, {
  MEMBER_CELL_HEIGHT,
} from "@features/schools/components/SchoolMemberCell";
import { UseQueryResult } from "@tanstack/react-query";
import { FlashList, FlashListProps } from "@shopify/flash-list";

const MainSearchScreen = () => {
  console.log("main rendering");
  const { height } = useWindowDimensions();

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{ paddingBottom: height / 5 }}
        showsVerticalScrollIndicator={false}
      >
        <Container>
          <Search />
        </Container>
        {/* Latest Questions */}
        <View style={{ gap: 20, marginTop: 20 }}>
          <LatestQuestions />
          <LatestUsers />
          <LatestSchools />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export const LatestQuestions = () => {
  const q = useLatestQuestions();
  return (
    <LatestSection
      title={"احدث السؤالات"}
      data={q.data}
      status={q.status}
      estimatedItemHeight={FORUM_QUESTION_CARD_HEIGHT}
      renderItem={({ item }) => <ForumQuestionCard compact question={item} />}
    />
  );
};

export const LatestSchools = () => {
  const q = useLatestSchools();
  return (
    <LatestSection
      title={"احدث المدارس"}
      data={q.data}
      status={q.status}
      estimatedItemHeight={150}
      renderItem={({ item }) => <SchoolCell school={item} />}
    />
  );
};

export const LatestUsers = () => {
  const q = useLatestUsers();
  return (
    <LatestSection
      title={"احدث المستخدمين"}
      data={q.data}
      status={q.status}
      estimatedItemHeight={MEMBER_CELL_HEIGHT}
      renderItem={({ item }) => <SchoolMemberCell member={item} />}
    />
  );
};

type LatestSectionProps<T> = {
  title: string;
  status: UseQueryResult["status"];
  estimatedItemHeight: number;
} & FlatListProps<T>;

const LatestSection = <T,>({
  title,
  data,
  status,
  renderItem,
  estimatedItemHeight: estimatedItemSize,
  ...props
}: LatestSectionProps<T>) => {
  return (
    <View style={{ gap: 10 }}>
      <ThemedText style={containerMargins} variant="titleLarge">
        {title}
      </ThemedText>
      {status === "success" && data ? (
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={data}
          renderItem={renderItem}
          contentContainerStyle={[
            props.contentContainerStyle,
            { gap: 10, ...containerPaddings },
          ]}
          {...props}
        />
      ) : (
        // placeholder the same size as the item to avoid UI jumping
        <View style={{ height: estimatedItemSize, justifyContent: "center" }}>
          <LoadingIndicator />
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
      onSubmitEditing={hanldeSearchIconPress}
      onChangeText={(text) => setQuery(text)}
      placeholder={t("Search")}
      blurOnSubmit
    />
  );
};

export default MainSearchScreen;
