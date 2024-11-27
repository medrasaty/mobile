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
import ForumQuestionCard from "@forum/questions/components/QuestionsCard";
import { containerMargins, containerPaddings } from "@/constants/styels";
import LoadingIndicator from "@components/LoadingIndicator";
import {
  useLatestQuestions,
  useLatestSchools,
  useLatestUsers,
} from "../queries";
import SchoolCell from "@features/schools/components/SchoolCell";
import SchoolMemberCell from "@features/schools/components/SchoolMemberCell";
import { UseQueryResult } from "@tanstack/react-query";

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
      renderItem={({ item }) => <SchoolMemberCell member={item} />}
    />
  );
};

type LatestSectionProps<T> = {
  title: string;
  status: UseQueryResult["status"];
} & FlatListProps<T>;

const LatestSection = <T,>({
  title,
  data,
  status,
  renderItem,
  ...props
}: LatestSectionProps<T>) => {
  return (
    <View style={{ gap: 10 }}>
      <ThemedText style={containerMargins} variant="titleLarge">
        {title}
      </ThemedText>
      {status === "success" && data ? (
        <FlatList
          contentContainerStyle={containerPaddings}
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
        <LoadingIndicator />
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
