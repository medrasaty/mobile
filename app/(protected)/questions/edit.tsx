import { ThemedText } from "@components/ThemedText";
import CreateQuestionScreen from "@forum/questions/screens/CreateQuestionScreen";
import EditQuestionScreen from "@forum/questions/screens/EditQuestionScreen";
import { useLocalSearchParams } from "expo-router";

const EditQuestionPage = () => {
  const { questionId } = useLocalSearchParams<{ questionId: string }>();

  if (!questionId) return <ThemedText>something went wrong goback</ThemedText>;

  return <EditQuestionScreen questionId={questionId} />;
};

export default EditQuestionPage;
