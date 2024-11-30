import Text from "@/components/styled/Text";
import { Container } from "@/components/styled/View";
import { ThemedText } from "@/components/ThemedText";
import AnswerCard from "@forum/answers/components/AnswerCard";
import CreateAnswer, {
  CREATE_ANSWER_FAB_MARGIN,
} from "@forum/components/answer/CreateAnswer";
import QuestionDetail from "@forum/components/question/detail/QuestionDetail";
import { AppBar } from "@features/navigation/components/AppBar";
import { Question } from "@/types/forum.types";
import { Answer } from "@forum/answers/types";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Divider } from "react-native-paper";
import { useQuestionIdParams } from "../hooks";
import { MultiQueryScreenList, Page } from "@/components";
import { useForumAnswers } from "@forum/answers/queries";
import { View } from "react-native";
import MoreOptions from "../components/QuestionCardOptionsMenu";
import { useForumQuestion } from "../queries";

export default function ForumQuestionDetailScreen() {
  const { t } = useTranslation();
  const questionId = useQuestionIdParams();
  const questionQuery = useForumQuestion(questionId);
  const answersQuery = useForumAnswers({
    question: questionId,
  });

  const renderHeader = () => {
    if (questionQuery.data) {
      return (
        <Container style={{ gap: 12 }}>
          <QuestionDetail question={questionQuery.data} />
          <Divider bold />
          <Text variant="headlineMedium">{t("Answers")}</Text>
        </Container>
      );
    }
  };

  const renderItem = useCallback(
    ({ item }: { item: Answer }) => {
      return <AnswerCard key={item.id} answer={item} />;
    },
    [questionId, answersQuery]
  );

  if (!questionId) return <ThemedText>must provide question id</ThemedText>;

  return (
    <BottomSheetModalProvider>
      <Page>
        <Headerbar question={questionQuery.data} />
        <MultiQueryScreenList
          ListHeaderComponent={renderHeader}
          dataStatus={answersQuery.status}
          renderItem={renderItem}
          estimatedItemSize={200}
          ItemSeparatorComponent={Divider}
          ListFooterComponent={() => {
            return (
              <CreateAnswer
                questionId={questionQuery?.data?.id}
                question={questionQuery.data}
              />
            );
          }}
          contentContainerStyle={{
            paddingTop: 20,
            paddingBottom: CREATE_ANSWER_FAB_MARGIN,
          }}
          showsVerticalScrollIndicator={false}
          data={answersQuery.data}
          headerStatus={questionQuery.status}
          onRetry={() => {
            questionQuery.refetch();
            answersQuery.refetch();
          }}
        />
      </Page>
    </BottomSheetModalProvider>
  );
}

export const Headerbar = ({ question }: { question: Question | undefined }) => {
  return (
    <View>
      <AppBar title={question?.title}>
        {question && (
          <MoreOptions
            ownerUsername={question.owner.username}
            questionId={question.id}
            contentTypeId={question.contenttype}
          />
        )}
      </AppBar>
      <Divider />
    </View>
  );
};
