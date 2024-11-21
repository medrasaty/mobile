import { ThemedText } from "@components/ThemedText";
import CreateQuestionScreen from "@forum/questions/screens/CreateQuestionScreen";
import { useLocalSearchParams } from "expo-router";

const EditQuestionPage = () => {
  const { questionId } = useLocalSearchParams<{ questionId: string }>();

  if (!questionId) return <ThemedText>something went wrong goback</ThemedText>;

  return <CreateQuestionScreen />;
};

export default EditQuestionPage;
