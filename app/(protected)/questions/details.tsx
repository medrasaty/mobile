import { ThemedText } from "@components/ThemedText";
import ForumQuestionDetailScreen from "@forum/questions/screens/ForumQuestionDetailScreen";
import { useLocalSearchParams } from "expo-router";
import { View, ViewProps } from "react-native";

type QuestionDetailsPageProps = {} & ViewProps;

const QuestionDetailsPage = ({ ...props }: QuestionDetailsPageProps) => {
  const { questionId } = useLocalSearchParams<{ questionId: string }>();

  if (!questionId) return <ThemedText>must provide question</ThemedText>;

  return <ForumQuestionDetailScreen questionId={questionId} />;
};

export default QuestionDetailsPage;
