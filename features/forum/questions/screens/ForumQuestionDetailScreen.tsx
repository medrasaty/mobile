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
import React, { useCallback, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Divider } from "react-native-paper";
import { useQuestionIdParams } from "../hooks";
import { MultiQueryScreenList, Page } from "@/components";
import { useForumAnswers } from "@forum/answers/queries";
import { View } from "react-native";
import MoreOptions from "../components/QuestionCardOptionsMenu";
import { useForumQuestion } from "../queries";
import EmptyView from "@components/EmptyList";
import { Ionicons } from "@expo/vector-icons";
import { useNotificationScrollAndHighlight } from "@/hooks/useScrollToIndexListRef";
import useStore from "@/store";

export default function ForumQuestionDetailScreen() {
  const { t } = useTranslation();
  const questionId = useQuestionIdParams();
  
  // Optimize query calls to prevent unnecessary re-renders - with prefetch hints
  const questionQuery = useForumQuestion(questionId, {
    staleTime: 1000 * 60 * 5, // Keep data fresh for 5 minutes
  });
  
  const answersQuery = useForumAnswers({
    question: questionId
  }, {
    staleTime: 1000 * 60 * 5 // Keep data fresh for 5 minutes
  });

  // Memoize the data to prevent unnecessary re-renders
  const answersData = useMemo(() => answersQuery.data || [], [answersQuery.data]);
  
  // Use our hook to handle scrolling to and highlighting answers
  const { 
    listRef, 
    handleDataChange,
    isHighlighted
  } = useNotificationScrollAndHighlight(questionId);
  
  // Only process data changes when necessary - with debouncing
  useEffect(() => {
    if (answersData.length > 0) {
      // Use requestAnimationFrame to delay until after render
      requestAnimationFrame(() => {
        handleDataChange(answersData);
      });
    }
  }, [answersData, handleDataChange]);

  // Memoize header to prevent re-rendering when data hasn't changed
  const headerComponent = useMemo(() => {
    if (!questionQuery.data) return null;
    
    return (
      <Container style={{ gap: 12 }}>
        <QuestionDetail question={questionQuery.data} />
        <Divider bold />
        <Text variant="headlineMedium">{t("Answers")}</Text>
      </Container>
    );
  }, [questionQuery.data, t]);

  // Optimize render item function to only depend on the item itself and isHighlighted check
  const renderItem = useCallback(
    ({ item }: { item: any }) => (
      <AnswerCard 
        answer={item} 
        isHighlighted={isHighlighted(item.id)}
      />
    ),
    [isHighlighted]
  );

  // Memoize empty component 
  const emptyComponent = useMemo(() => (
    <View style={{ flex: 1, marginTop: 30 }}>
      <EmptyView
        message="no answers"
        icon={(props) => <Ionicons name="book-outline" {...props} />}
      />
    </View>
  ), []);

  if (!questionId) return <ThemedText>must provide question id</ThemedText>;

  return (
    <Page>
      <Headerbar question={questionQuery.data} />
      <MultiQueryScreenList
        ref={listRef}
        ListHeaderComponent={headerComponent}
        dataStatus={answersQuery.status}
        renderItem={renderItem}
        estimatedItemSize={200}
        ListEmptyComponent={emptyComponent}
        ItemSeparatorComponent={Divider}
        contentContainerStyle={{
          paddingTop: 20,
          paddingBottom: CREATE_ANSWER_FAB_MARGIN,
        }}
        showsVerticalScrollIndicator={false}
        data={answersData}
        headerStatus={questionQuery.status}
        onRetry={() => {
          questionQuery.refetch();
          answersQuery.refetch();
        }}
      />
      {/* 
        only display when question is available 
        or it will raise and error due to question not yet loaded ! 
        */}
      {questionQuery.data &&
        <CreateAnswer
          questionId={questionQuery.data.id}
          question={questionQuery.data}
        />
      }
    </Page>
  );
}

export const Headerbar = React.memo(({ question }: { question: Question | undefined }) => {
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
});
