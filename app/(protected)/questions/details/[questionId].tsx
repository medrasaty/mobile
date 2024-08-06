import Text from "@/components/styled/Text";
import View, { Container, SafeAreaView } from "@/components/styled/View";
import { useQuestion } from "@/hooks/forum/useQuestions";
import { FlashList } from "@shopify/flash-list";
import { useLocalSearchParams, useNavigation } from "expo-router";

import AnswerCard from "@/components/AnswerCard";
import FullPageLoadingIndicator from "@/components/FullPageLoadingIndicator";
import QuestionDetailActions from "@/components/question/QuestionDetailActions";
import QuestionDetailInfo from "@/components/question/QuestionDetailInfo";
import { DetailQuestion } from "@/definitions/forum.types";
import { useQuestionAnswers } from "@/hooks/forum/useAnswers";
import { useEffect } from "react";
import { ActivityIndicator } from "react-native-paper";
import { SnackbarProvider } from "@/contexts/SnackbarContext";
import { WINDOW_HEIGHT } from "@gorhom/bottom-sheet";

export default function QuestionDetailPage() {
  return (
    <SnackbarProvider>
      <View style={{ flex: 1 }}>
        <QuestionDetail />
      </View>
    </SnackbarProvider>
  );
}

const QuestionDetail = () => {
  const navigation = useNavigation();
  const { questionId } = useLocalSearchParams();

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

  return (
    <FlashList
      data={answersQuery.data}
      ListHeaderComponent={() => <QuestionDetailHeader question={question} />}
      renderItem={({ item }) => <AnswerCard answer={item} />}
      contentContainerStyle={{ paddingTop: 10 }}
      estimatedItemSize={20}
      ListEmptyComponent={renderEmptyComponent}
      overScrollMode="never"
    />
  );
};

const QuestionDetailHeader = ({ question }: { question: DetailQuestion }) => {
  return (
    <Container>
      <View>
        <View style={{ flexDirection: "row", gap: 12 }}>
          <QuestionDetailActions question={question} />
          <QuestionDetailInfo question={question} />
        </View>
      </View>
    </Container>
  );
};
