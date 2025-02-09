import { View, ViewProps } from "react-native";
import { BookmarkQuestion } from "../types";
import { ThemedText } from "@components/ThemedText";
import { d } from "@/lib/dates";
import { IconButton, Surface, useTheme } from "react-native-paper";
import { ConfirmDialogV2 } from "@components/ConfirmDialog";
import { useVisibleV2 } from "@/hooks/useVisible";
import LoadingDialog from "@components/LoadingDialog";
import { useRemoveBookmarkQuestionMutation } from "../mutations";

type BookmarkQuestionCardProps = {
  bookmarkQuestion: BookmarkQuestion;
} & ViewProps;

const BookmarkQuestionCard = ({
  bookmarkQuestion,
  ...props
}: BookmarkQuestionCardProps) => {
  const theme = useTheme();

  return (
    <Surface mode="flat" style={{ borderRadius: theme.roundness * 3 }}>
      <View
        {...props}
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ flex: 1, padding: 20, gap: 20 }}>
          <View style={{ gap: 10 }}>
            <ThemedText numberOfLines={1} variant="titleLarge">
              {bookmarkQuestion.question.title}
            </ThemedText>
            <ThemedText numberOfLines={2} color="gray" variant="bodySmall">
              {bookmarkQuestion.question.text}
            </ThemedText>
          </View>
          <ThemedText color="gray" variant="labelSmall">
            {d(bookmarkQuestion.bookmarked_at).toString()}
          </ThemedText>
        </View>
        <View>
          <DeleteCardButton id={bookmarkQuestion.question.id} />
        </View>
      </View>
    </Surface>
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
      <LoadingDialog
        visible={isPending}
        message="deleting from bookmarks ..."
      />
    </>
  );
}

export default BookmarkQuestionCard;
