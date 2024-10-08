import React, { useEffect, useMemo, useState } from "react";
import { StyleSheet } from "react-native";
import { Divider, useTheme } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import useProfile from "../hooks/useProfile";
import { BaseUser } from "@/types/user.types";
import UserProfileScreenLoading from "../components/UserProfileScreenLoading";
import UserProfileScreenError from "../components/UserProfileScreenError";
import {
  ProfileNavigatorChoices,
  SortingOption,
  UserProfile,
} from "@/features/profile/types.types";
import { ThemedText } from "@/components/ThemedText";
import Page from "@/components/Page";
import { ContainerView } from "@/components/styled";
import { ProfileBackgroundImage } from "../components/Profile";
import ProfileInfo from "../components/ProfileInfo";
import useProfileQuestions, {
  questionOrderKeys,
} from "../hooks/useProfileQuestions";
import useProfileAnswers from "../hooks/useProfileAnswers";
import { FlashList } from "@shopify/flash-list";
import { ThemedView } from "@/components/ThemedView";
import LoadingIndicator from "@/components/LoadingIndicator";
import { Answer, Question } from "@/types/forum.types";
import QuestionCard from "@/features/forum/components/question/QuestionCard";
import ProfileNavigator from "../components/ProfileQuestionAnswerNavigator";
import { NavigatorButtonType } from "../types";
import Row from "@/components/Row";
import { useTranslation } from "react-i18next";
import SortingMenu from "../components/SortingMenu";
import useProfileListData from "../hooks/useProfileListData";
import { BlurView } from "expo-blur";
import { debugStyle } from "@/constants/styels";

interface UserProfileScreenProps {
  username: BaseUser["username"] | undefined;
}

const UserProfileScreen = ({ username }: UserProfileScreenProps) => {
  // REFACTORME
  if (!username) return <UserProfileScreenError />;

  const q = useProfile(username);

  if (q.isPending) return <UserProfileScreenLoading />;
  if (q.isError) return <UserProfileScreenError />;

  return <UserProfileScreenContent onRefresh={q.refetch} profile={q.data} />;
};

interface UserProfileScreenContentProps {
  profile: UserProfile;
  onRefresh: () => void;
}

const Buttons: NavigatorButtonType[] = [
  { index: 0, label: "Questions", value: ProfileNavigatorChoices.QUESTIONS },
  { index: 1, label: "Answers", value: ProfileNavigatorChoices.ANSWERS },
];

type TypedData = {
  type: ListTypedData;
  payload: any;
};

const enum ListTypedData {
  ANSWER = "ANSWER",
  QUESTION = "QUESTION",
  NAVIGATOR = "NAVIGATOR",
  FILTER = "FILTER",
}

function transformToTypedData(data: any[] | undefined, type: ListTypedData) {
  if (!data) return [];
  return data.map((d) => ({ type, payload: d }));
}

const sortingOptions = [
  {
    label: "Newest",
    key: questionOrderKeys.NEWEST,
  },
  {
    label: "Oldest",
    key: questionOrderKeys.OLDEST,
  },
  {
    label: "Most rated",
    key: questionOrderKeys.MOST_RATED,
  },
];

export const UserProfileScreenContent = ({
  profile,
  onRefresh,
}: UserProfileScreenContentProps) => {
  const initialButton = ProfileNavigatorChoices.QUESTIONS;
  const { t } = useTranslation();

  const [selectedList, setSelectedList] =
    useState<ProfileNavigatorChoices>(initialButton);

  const handleNavigatorSelect = (button: NavigatorButtonType) => {
    setSelectedList(button.value as ProfileNavigatorChoices);
  };

  const {
    questionQuery,
    answersQuery,
    onRefresh: onRefreshProfileList,
  } = useProfileListData(profile.username);

  const [isPullRefreshing, setIsPullRefreshing] = useState(false);

  useEffect(() => {
    if (!questionQuery.isRefetching || !answersQuery.isRefetching) {
      setIsPullRefreshing(false);
    }
  }, [isPullRefreshing, questionQuery.isRefetching, answersQuery.isRefetching]);

  const selectedButton =
    Buttons.find((b) => b.value === selectedList) ?? Buttons[0];

  const handleQuestionSortingChange = (
    option: SortingOption<questionOrderKeys>
  ) => {
    questionQuery.handleSortKeyChange(option.key);
  };
  const handleAnswerSortingChange = (
    option: SortingOption<questionOrderKeys>
  ) => {
    // answersQuery.handleSortKeyChange(option.key);
  };

  const listHeader = () => {
    return (
      <ThemedView>
        <ProfileBackgroundImage url={profile.background_picture} />
        <ProfileInfo profile={profile} />
      </ThemedView>
    );
  };

  const listFooter = () => {
    if (questionQuery.isFetching || answersQuery.isFetching) {
      return (
        <ThemedView style={styles.footerContainer}>
          <LoadingIndicator />
        </ThemedView>
      );
    }
    return null;
  };

  const handleRefresh = () => {
    setIsPullRefreshing(true);
    onRefreshProfileList();
    onRefresh();
  };

  const data = useMemo(() => {
    return selectedList === ProfileNavigatorChoices.QUESTIONS
      ? transformToTypedData(questionQuery.data, ListTypedData.QUESTION)
      : transformToTypedData(answersQuery.data, ListTypedData.ANSWER);
  }, [selectedList, answersQuery.data, questionQuery.data]);

  const renderItem = ({ item }: { item: TypedData }) => {
    if (item.type === ListTypedData.QUESTION) {
      return <QuestionCard question={item.payload} />;
    } else if (item.type === ListTypedData.ANSWER) {
      return <AnswerCell answer={item.payload} />;
    } else if (item.type === ListTypedData.NAVIGATOR) {
      return (
        <ThemedView>
          <ProfileNavigator
            onSelectChange={handleNavigatorSelect}
            currentIndex={selectedButton?.index}
            navigatorButtons={Buttons}
            style={{ paddingTop: 20 }}
          />
        </ThemedView>
      );
    } else if (item.type === ListTypedData.FILTER) {
      return (
        <ContainerView style={{ marginTop: 20 }}>
          <Row alignItems="center" style={{ justifyContent: "space-between" }}>
            <ThemedText bold variant="titleLarge">
              {t(selectedButton?.label)}
            </ThemedText>
            <SortingMenu
              onSelect={handleQuestionSortingChange}
              options={sortingOptions}
            />
          </Row>
        </ContainerView>
      );
    }
  };

  return (
    <Page>
      <FlashList
        ListHeaderComponent={listHeader}
        ListFooterComponent={listFooter}
        stickyHeaderIndices={[0]}
        data={[
          {
            type: ListTypedData.NAVIGATOR,
            payload: {},
          },
          {
            type: ListTypedData.FILTER,
            payload: {},
          },
          ...data,
        ]}
        renderItem={renderItem}
        estimatedItemSize={150}
        onRefresh={handleRefresh}
        refreshing={isPullRefreshing}
        onScroll={(props) => console.log(props)}
      />
    </Page>
  );
};

export const AnswerCell = ({ answer }: { answer: Answer }) => {
  return <ThemedText>{answer.text}</ThemedText>;
};

const styles = StyleSheet.create({
  footerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default UserProfileScreen;
