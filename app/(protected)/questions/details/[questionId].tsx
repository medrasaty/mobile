import FullPageLoadingIndicator from "@/components/FullPageLoadingIndicator";
import Page from "@/components/Page";
import Text from "@/components/styled/Text";
import { Container } from "@/components/styled/View";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { containerMargins } from "@/constants/styels";
import AnswerCard from "@forum/components/answer/AnswerCard";
import CreateAnswer from "@forum/components/answer/CreateAnswer";
import QuestionDetail from "@forum/components/question/detail/QuestionDetail";
import { useQuestionAnswers } from "@forum/hooks/useAnswers";
import { useQuestion } from "@forum/hooks/useQuestions";
import { AppBar } from "@features/navigation/components/AppBar";
import { Answer } from "@/types/forum.types";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { FlashList } from "@shopify/flash-list";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { RefreshControl } from "react-native";
import { ActivityIndicator, Divider } from "react-native-paper";

export default function QuestionDetailPage() {
  return (
    <BottomSheetModalProvider>
      <Page>
        <AnswersList />
      </Page>
    </BottomSheetModalProvider>
  );
}

function useScrollToAnswer(
  answers: Answer[] | undefined,
  listRef: React.RefObject<FlashList<Answer>>
) {
  const { answerId } = useLocalSearchParams<{ answerId?: string }>();

  const [hasScrolled, setHasScrolled] = useState(false);

  const answerIndex = useMemo(
    () => answers?.findIndex((answer) => answer.id === answerId) ?? -1,
    [answers, answerId]
  );

  useEffect(() => {
    if (
      answerId &&
      answers &&
      answerIndex !== -1 &&
      listRef.current &&
      !hasScrolled
    ) {
      listRef.current.scrollToIndex({
        index: answerIndex,
        animated: true,
        viewPosition: 0,
      });
      setHasScrolled(true);
    }
  }, [answers, answerId, answerIndex, listRef, hasScrolled]);
}

const AnswersList = () => {
  const { questionId } = useLocalSearchParams<{ questionId: string }>();
  const {
    data: question,
    isLoading: isQuestionLoading,
    isError: isQuestionError,
    refetch: refetchQuestion,
  } = useQuestion(questionId as string);
  const {
    data: answers,
    isLoading: isAnswersLoading,
    isRefetching: isAnswersRefetching,
    refetch: refetchAnswers,
  } = useQuestionAnswers(questionId as string);
  const { t } = useTranslation();

  const listRef = useRef<FlashList<Answer>>(null);
  useScrollToAnswer(answers, listRef);

  if (isQuestionLoading) return <FullPageLoadingIndicator />;
  if (isQuestionError) return <Text>Error loading question</Text>;
  if (!question) return <Text>Question not found</Text>;

  const renderEmptyComponent = () =>
    !isAnswersLoading && (
      <ThemedView style={{ marginTop: 30, alignItems: "center" }}>
        <ThemedText>No answers yet</ThemedText>
      </ThemedView>
    );

  const renderFooter = () =>
    isAnswersLoading && <ActivityIndicator size="large" />;

  const renderHeader = () => (
    <Container style={{ gap: 12 }}>
      <QuestionDetail question={question} />
      <Text variant="headlineSmall">{t("Answers")}</Text>
    </Container>
  );

  const handleRenderItem = ({ item }: { item: Answer }) => (
    <AnswerCard key={item.id} answer={item} />
  );

  const handleRefresh = () => {
    refetchQuestion();
    refetchAnswers();
  };

  return (
    <>
      <AppBar title={question.title} />
      <FlashList
        ref={listRef}
        data={answers}
        ListHeaderComponent={renderHeader}
        keyExtractor={(item) => item.id}
        renderItem={handleRenderItem}
        contentContainerStyle={{ paddingTop: 10, paddingBottom: 70 }}
        refreshControl={
          <RefreshControl
            refreshing={isAnswersRefetching}
            onRefresh={handleRefresh}
          />
        }
        ItemSeparatorComponent={() => <Divider style={containerMargins} />}
        estimatedItemSize={170}
        ListEmptyComponent={renderEmptyComponent}
        ListFooterComponent={renderFooter}
      />
      <CreateAnswer question={question} />
    </>
  );
};
