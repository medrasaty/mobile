import Page from "@/components/Page";
import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "@/components/styled";

const AnswerBookmarkPage = () => {
  return (
    <SafeAreaView>
      <Page
        container
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <ThemedText variant="titleLarge">Answers</ThemedText>
        <ThemedText variant="displaySmall">Answers</ThemedText>
      </Page>
    </SafeAreaView>
  );
};

export default AnswerBookmarkPage;
