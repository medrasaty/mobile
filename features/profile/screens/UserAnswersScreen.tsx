import Page from "@/components/Page";
import { ScreenListV3 } from "@/components/ScreenFlatList";
import useProfileAnswers from "@/features/profile/hooks/useProfileAnswers";
import useUsernameParam from "@/features/profile/hooks/useUsernameParam";
import { Answer } from "@/types/forum.types";
import ForumAnswerCompactCard from "@forum/answers/components/AnswerCompactCard";
import { useCallback } from "react";
import { Divider } from "react-native-paper";

const UserAnswersScreen = () => {
  const username = useUsernameParam();
  const q = useProfileAnswers(username);

  const renderItem = useCallback(({ item }: { item: Answer }) => {
    return <ForumAnswerCompactCard answer={item} />;
  }, []);
  return (
    <Page>
      <ScreenListV3
        ItemSeparatorComponent={Divider}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={300}
        q={q}
        renderItem={renderItem}
      />
    </Page>
  );
};

export default UserAnswersScreen;
