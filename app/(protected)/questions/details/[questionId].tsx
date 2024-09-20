import FullPageLoadingIndicator from "@/components/FullPageLoadingIndicator";
import Page from "@/components/Page";
import Text from "@/components/styled/Text";
import { Container } from "@/components/styled/View";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { containerMargins } from "@/constants/styels";
import AnswerCard from "@/features/forum/components/answer/AnswerCard";
import CreateAnswer from "@/features/forum/components/answer/CreateAnswer";
import QuestionDetail from "@/features/forum/components/question/detail/QuestionDetail";
import { useQuestionAnswers } from "@/features/forum/hooks/useAnswers";
import { useQuestion } from "@/features/forum/hooks/useQuestions";
import { AppBar } from "@/features/navigation/components/AppBar";
import { Answer } from "@/types/forum.types";
import { FlashList } from "@shopify/flash-list";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useMemo, useRef } from "react";
import { RefreshControl } from "react-native";
import { ActivityIndicator, Divider } from "react-native-paper";

export default function QuestionDetailPage() {
  return (
    <Page>
      <AnswersList />
    </Page>
  );
}

function useScrollToAnswerEffect(
  answers: Answer[] | undefined,
  ListRef: React.RefObject<FlashList<Answer>>
) {
  const params = useLocalSearchParams<{ answerId?: string }>();
  const router = useRouter();

  const answerIndex = useMemo(() => {
    return answers?.findIndex((answer) => answer.id === params.answerId);
  }, [answers, params.answerId]);

  useEffect(() => {
    if (params.answerId && answers && answerIndex !== -1 && ListRef.current) {
      // find answer index in the list
      ListRef.current.scrollToIndex({
        index: answerIndex ?? 0,
        animated: true,
        viewPosition: 1,
      });
      console.log("scrollToIndex finished");
    }

    return () => {
      router.setParams({ answerId: undefined });
    };
  }, [answers]);
}
const AnswersList = () => {
  const { questionId } = useLocalSearchParams<{ questionId: string }>();
  const questionQuery = useQuestion(questionId as string);
  const answersQuery = useQuestionAnswers(questionId as string);

  const ListRef = useRef<FlashList<Answer>>(null);
  useScrollToAnswerEffect(answersQuery.data, ListRef);

  if (questionQuery.isLoading) return <FullPageLoadingIndicator />;
  if (questionQuery.isError) return <Text>error</Text>;
  if (!questionQuery.data) return <Text>there is not question</Text>;

  const question = questionQuery.data;

  const renderEmptyComponent = () => {
    // first time loading
    if (!answersQuery.isLoading) {
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
      <Container style={{ gap: 12 }}>
        <QuestionDetail question={question} />
        <Text variant="headlineSmall">الإجابات</Text>
      </Container>
    );
  };

  const handleRenderItem = ({ item }: { item: Answer }) => {
    return <AnswerCard key={item.id} answer={item} />;
  };

  return (
    <>
      <AppBar title={question.title} />
      <FlashList
        ref={ListRef}
        data={answersQuery.data}
        ListHeaderComponent={renderHeader}
        keyExtractor={(item) => item.id}
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
        onLayout={() => console.log("solo is onLayout")}
      />
      <CreateAnswer question={question} />
    </>
  );
};
