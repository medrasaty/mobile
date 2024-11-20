import { StyleSheet } from "react-native";
import { Divider, IconButton, Menu, useTheme } from "react-native-paper";
import { Question } from "@/types/forum.types";
import { useVisibleV2 } from "@/hooks/useVisible";
import ReportDialog from "@/features/reports/components/ReportDialog";
import useCurrentUser from "@/hooks/useCurrentUser";
import OptionsMenu from "@/components/OptionsMenu";

const MoreOptions = ({
  ownerUsername,
  questionId,
  contentTypeId,
}: {
  ownerUsername: Question["owner"]["username"];
  questionId: Question["id"];
  contentTypeId: number;
}) => {
  const theme = useTheme();
  const [visible, show, hide] = useVisibleV2(false);
  const user = useCurrentUser();
  return (
    <Menu
      visible={visible}
      onDismiss={hide}
      anchorPosition="bottom"
      style={{ marginTop: 20 }}
      contentStyle={{
        backgroundColor: theme.colors.surface,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: theme.colors.primary,
      }}
      anchor={<IconButton icon={"dots-vertical"} onPress={show} />}
    >
      <BookmarkQuestionItem />
      <RegisterQuestionItem />
      <Divider />
      {ownerUsername === user.username ? (
        <>
          <Menu.Item
            style={styles.item}
            onPress={() => {}}
            trailingIcon={"delete"}
            title="delete"
          />
          <Menu.Item
            style={styles.item}
            onPress={() => {}}
            trailingIcon={"circle"}
            title="edit"
          />
        </>
      ) : (
        <ReportQuestionMenuItem
          questionId={questionId}
          contentTypeId={contentTypeId}
        />
      )}
    </Menu>
  );
};

export const BookmarkQuestionItem = () => {
  return (
    <Menu.Item
      style={styles.item}
      onPress={() => alert("bookmarking")}
      trailingIcon={"bookmark-outline"}
      title="bookmark"
    />
  );
};

export const RegisterQuestionItem = () => {
  return (
    <Menu.Item
      style={styles.item}
      onPress={() => alert("registering")}
      trailingIcon={"bell-outline"}
      title="register"
    />
  );
};

const ReportQuestionMenuItem = ({
  questionId,
  contentTypeId,
}: {
  questionId: Question["id"];
  contentTypeId: number;
}) => {
  const [visible, show, hide] = useVisibleV2(false);
  return (
    <>
      <Menu.Item
        style={styles.item}
        onPress={show}
        trailingIcon={"share"}
        title="report"
      />
      <ReportDialog
        onDismiss={hide}
        visible={visible}
        contentTypeId={contentTypeId}
        objectId={questionId}
      />
    </>
  );
};

export const ReportQuestion = () => {};

export const QUESTION_CARD_HEIGHT = 220;

const styles = StyleSheet.create({
  item: {
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default MoreOptions;
