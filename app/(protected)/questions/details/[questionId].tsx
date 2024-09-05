import FullPageLoadingIndicator from "@/components/FullPageLoadingIndicator";
import Page from "@/components/Page";
import Text from "@/components/styled/Text";
import View, { Container } from "@/components/styled/View";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { containerMargins } from "@/constants/styels";
import AnswerCard from "@/features/forum/components/answer/AnswerCard";
import CreateAnswer from "@/features/forum/components/answer/CreateAnswer";
import QuestionDetail from "@/features/forum/components/question/detail/QuestionDetail";
import { QuestionProvider } from "@/features/forum/contexts/QuestionContext";
import { useQuestionAnswers } from "@/features/forum/hooks/useAnswers";
import { useQuestion } from "@/features/forum/hooks/useQuestions";
import { Answer, Question } from "@/types/forum.types";
import { FlashList } from "@shopify/flash-list";
import { useLocalSearchParams, useNavigation } from "expo-router";
import React, { useEffect } from "react";
import { RefreshControl } from "react-native";
import { ActivityIndicator, Divider } from "react-native-paper";
import { Facebook } from "react-content-loader/native";
import Toast, { BaseToast } from "react-native-toast-message";

export default function QuestionDetailPage() {
  return (
    <Page>
      <List />
    </Page>
  );
}

const List = () => {
  const { questionId } = useLocalSearchParams();
  const navigation = useNavigation();
  const questionQuery = useQuestion(questionId as string);
  const answersQuery = useQuestionAnswers(questionId as string);

  useEffect(() => {
    if (questionQuery.data) {
      navigation.setOptions({ headerTitle: questionQuery.data.title });
      Toast.show({ text1: "solo is info toast", type: "success" });
    }
  }, [questionQuery.data]);

  if (questionQuery.isLoading) return <FullPageLoadingIndicator />;
  if (questionQuery.isError) return <Text>error</Text>;
  if (!questionQuery.data) return <Text>there is not question</Text>;

  const question = questionQuery.data;

  const renderEmptyComponent = () => {
    if (!answersQuery.isFetching) {
      return (
        <ThemedView style={{ marginTop: 30, alignItems: "center" }}>
          <ThemedText>لا اجابات</ThemedText>
        </ThemedView>
      );
    }
    return null;
  };

  const renderFooter = () => {
    if (answersQuery.isLoading) {
      return <ActivityIndicator size={"large"} />;
    }
  };

  const renderHeader = () => {
    return (
      <Container style={{ marginBottom: 20, gap: 12 }}>
        <QuestionDetail question={question} />
        <Text variant="headlineSmall">الإجابات</Text>
      </Container>
    );
  };

  const handleRenderItem = ({ item, index }: { item: Answer; index }) => {
    return <AnswerCard key={item.id} answer={item} />;
  };

  return (
    <>
      <FlashList
        data={answersQuery.data}
        ListHeaderComponent={renderHeader}
        renderItem={handleRenderItem}
        contentContainerStyle={{ paddingTop: 10, paddingBottom: 70 }}
        refreshControl={
          <RefreshControl
            refreshing={questionQuery.isRefetching || answersQuery.isRefetching}
            onRefresh={() => {
              questionQuery.refetch();
              answersQuery.refetch();
            }}
          />
        }
        ItemSeparatorComponent={() => <Divider style={containerMargins} />}
        estimatedItemSize={170}
        ListEmptyComponent={renderEmptyComponent}
      />
      <CreateAnswer question={question} />
    </>
  );
};
