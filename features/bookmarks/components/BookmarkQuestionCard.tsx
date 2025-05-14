import { View, ViewProps, Pressable, StyleSheet, TouchableOpacity } from "react-native";
import { BookmarkQuestion } from "../types";
import { ThemedText } from "@/components/ThemedText";
import { d } from "@/lib/dates";
import { Divider, IconButton, Surface, TouchableRipple, useTheme } from "react-native-paper";
import { ConfirmDialogV2 } from "@/components/ConfirmDialog";
import { useVisibleV2 } from "@/hooks/useVisible";
import LoadingDialog from "@/components/LoadingDialog";
import { useRemoveBookmarkQuestionMutation } from "../mutations";
import { t } from "i18next";
import { useRouter } from "expo-router";
import { path } from "@/lib/routing";
import Row from "@/components/Row";
import UserInfo from "@/components/UserInfo";
import { debugStyle, DEFAULT_CONTAINER_SPACING } from "@/constants/styels";
import { ContainerView } from "@components/styled";

type BookmarkQuestionCardProps = {
  question: BookmarkQuestion;
} & ViewProps;

export const BOOKMARK_QUESTION_CARD_HEIGHT = 150;

const BookmarkQuestionCard = ({ question }: BookmarkQuestionCardProps) => {
  const router = useRouter();
  const theme = useTheme();
  const goToDetail = () => router.push(path.questions.detail(question.question.id));

  return (
    <TouchableRipple onPress={goToDetail}>
      <Surface elevation={0} style={[styles.container]}>
        <Row style={{ gap: 10, }}>
          <View style={{ flex: 1, margin: DEFAULT_CONTAINER_SPACING }}>
            <ThemedText  numberOfLines={2} variant="titleLarge">
              {question.question.title}
            </ThemedText>
            <View style={{ marginTop: 10,  }}>
              <ThemedText color="lightgray" numberOfLines={2} variant="bodySmall">
                {question.question.text}
              </ThemedText>
            </View>
          </View>
          <View>
            <DeleteCardButton id={question.question.id} />
          </View>
        </Row>

        <View style={{ padding: DEFAULT_CONTAINER_SPACING }}>
          <ThemedText color={theme.colors.onPrimaryContainer} variant="labelSmall">
            {d(question.bookmarked_at).fromNow()}
          </ThemedText>
        </View>
      </Surface>
    </TouchableRipple>
  );
};

/**
 * Remove question ( card ) from bookmarks
 * @params id: question identifier
 */

function DeleteCardButton({ id }: { id: BookmarkQuestion["question"]["id"] }) {
  const [visible, show, hide] = useVisibleV2(false);
  const { isPending, mutate: remove } = useRemoveBookmarkQuestionMutation();

  const handleConfirm = () => {
    // hide confirm dialog
    hide();
    // delete question
    remove(id);
  };

  return (
    <>
      <IconButton onPress={show} icon="close" />
      <ConfirmDialogV2
        visible={visible}
        onCancel={hide}
        onConfirm={handleConfirm}
        message="are you sure you want to remove this question from bookmars?"
      />
      <LoadingDialog visible={isPending} message={t("deleting")} />
    </>
  );
}

export default BookmarkQuestionCard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: BOOKMARK_QUESTION_CARD_HEIGHT,
    justifyContent: 'space-between',
  },
});