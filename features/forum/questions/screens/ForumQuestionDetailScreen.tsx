import Text from "@/components/styled/Text";
import { Container } from "@/components/styled/View";
import { ThemedText } from "@/components/ThemedText";
import AnswerCard from "@forum/components/answer/AnswerCard";
import CreateAnswer from "@forum/components/answer/CreateAnswer";
import QuestionDetail from "@forum/components/question/detail/QuestionDetail";
import { useQuestion } from "@forum/hooks/useQuestions";
import { AppBar } from "@features/navigation/components/AppBar";
import { Answer } from "@/types/forum.types";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Divider } from "react-native-paper";
import { useQuestionIdParams } from "../hooks";
import { MultiQueryScreenList, Page } from "@/components";
import { useForumAnswers } from "@forum/answers/queries";

export default function ForumQuestionDetailScreen() {
  const { t } = useTranslation();
  const questionId = useQuestionIdParams();
  const questionQuery = useQuestion(questionId);
  const answersQuery = useForumAnswers({
    question: questionId,
  });

  const renderHeader = useCallback(() => {
    if (questionQuery.data) {
      return (
        <Container style={{ gap: 12 }}>
          <QuestionDetail question={questionQuery.data} />
          <Divider bold />
          <Text variant="headlineSmall">{t("Answers")}</Text>
        </Container>
      );
    }
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: Answer }) => {
      return <AnswerCard key={item.id} answer={item} />;
    },
    [questionId]
  );

  // TODO: handle this better
  if (!questionId) return <ThemedText>must provide question id</ThemedText>;

  return (
    <BottomSheetModalProvider>
      <Page>
        <AppBar title="detail" />
        <Divider />
        <MultiQueryScreenList
          ListHeaderComponent={renderHeader}
          dataStatus={answersQuery.status}
          renderItem={renderItem}
          estimatedItemSize={200}
          ItemSeparatorComponent={Divider}
          contentContainerStyle={{ paddingTop: 20 }}
          showsVerticalScrollIndicator={false}
          data={answersQuery.data}
          headerStatus={questionQuery.status}
          onRetry={() => {
            questionQuery.refetch();
            answersQuery.refetch();
          }}
        />
      </Page>
      <CreateAnswer question={questionQuery.data} />
    </BottomSheetModalProvider>
  );
}
