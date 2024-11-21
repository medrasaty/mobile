import { StyleSheet } from "react-native";
import { Divider, IconButton, Menu, useTheme } from "react-native-paper";
import { Question } from "@/types/forum.types";
import { useVisibleV2 } from "@/hooks/useVisible";
import ReportDialog from "@/features/reports/components/ReportDialog";

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

export const ReportQuestionMenuItem = ({
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

const styles = StyleSheet.create({
  item: {
    paddingLeft: 10,
    paddingRight: 10,
  },
});
