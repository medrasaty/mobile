import Page from "@/components/Page";
import { ScreenListV3 } from "@/components/ScreenFlatList";
import useProfileAnswers from "@/features/profile/hooks/useProfileAnswers";
import useUserIdParams from "@/features/profile/hooks/useUsernameParam";
import { Answer } from "@/types/forum.types";
import ForumAnswerCompactCard from "@forum/answers/components/AnswerCompactCard";
import { useCallback } from "react";
import { Divider } from "react-native-paper";

const UserAnswersScreen = () => {
  const userId = useUserIdParams();
  const q = useProfileAnswers(userId);

  const renderItem = useCallback(
    ({ item }: { item: Answer }) => {
      return <ForumAnswerCompactCard answer={item} />;
    },
    [q.status]
  );
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
