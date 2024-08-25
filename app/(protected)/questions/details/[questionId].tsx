import Text from "@/components/styled/Text";
import View, { Container } from "@/components/styled/View";
import { useQuestion } from "@/features/forum/hooks/useQuestions";
import { FlashList } from "@shopify/flash-list";
import { useLocalSearchParams, useNavigation } from "expo-router";
import FullPageLoadingIndicator from "@/components/FullPageLoadingIndicator";
import { SnackbarProvider } from "@/contexts/SnackbarContext";
import AnswerCard from "@/features/forum/components/answer/AnswerCard";
import { useQuestionAnswers } from "@/features/forum/hooks/useAnswers";
import React, { ReducerWithoutAction, useEffect } from "react";
import { RefreshControl } from "react-native";
import { ActivityIndicator, AnimatedFAB, Divider } from "react-native-paper";
import QuestionDetail from "@/features/forum/components/question/detail/QuestionDetail";
import Page from "@/components/Page";
import { containerMargins, containerPaddings } from "@/constants/styels";
import { AddQuestionFAB } from "@/components/FAB";

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
    }
  }, [questionQuery.data]);

  if (questionQuery.isLoading) return <FullPageLoadingIndicator />;
  if (questionQuery.isError) return <Text>error</Text>;
  if (!questionQuery.data) return <Text>there is not question</Text>;

  const question = questionQuery.data;

  const renderEmptyComponent = () => {
    if (!answersQuery.isFetching) {
      return (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        ></View>
      );
    }
    return null;
  };

  const renderFooter = () => {
    if (answersQuery.isFetching) {
      return (
        <View style={{ padding: 20 }}>
          <ActivityIndicator size={"large"} />
        </View>
      );
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

  return (
    <FlashList
      data={answersQuery.data}
      ListHeaderComponent={renderHeader}
      renderItem={({ item }) => <AnswerCard answer={item} />}
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
      estimatedItemSize={160}
      ListEmptyComponent={renderEmptyComponent}
    />
  );
};
