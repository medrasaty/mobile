import Page from "@/components/Page";
import { ThemedText } from "@/components/ThemedText";
import { SafeAreaView } from "@/components/styled";

const BookmarkQuestionsPage = () => {
  return (
    <SafeAreaView>
      <Page
        container
        style={{ justifyContent: "center", alignItems: "center" }}
      >
        <ThemedText variant="titleLarge">Question</ThemedText>
        <ThemedText variant="displaySmall">Questions</ThemedText>
      </Page>
    </SafeAreaView>
  );
};

export default BookmarkQuestionsPage;
