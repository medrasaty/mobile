import { ConfirmDialogV2 } from "@/components/ConfirmDialog";
import LoadingDialog from "@/components/LoadingDialog";
import Row from "@/components/Row";
import { ThemedText } from "@/components/ThemedText";
import UserInfo from "@/components/UserInfo";
import { DEFAULT_CONTAINER_SPACING } from "@/constants/styels";
import { useVisibleV2 } from "@/hooks/useVisible";
import { d } from "@/lib/dates";
import { useRouter } from "expo-router";
import { t } from "i18next";
import { useCallback } from "react";
import { Pressable, StyleSheet, View, ViewProps } from "react-native";
import { IconButton, Surface, TouchableRipple, useTheme } from "react-native-paper";
import { useDeleteWatchHistoryMutation } from "../mutations";
import { WatchHistory } from "../types";
import { path } from "@/lib/routing";

type QuestionHistoryCellProps = {
  history: WatchHistory;
};

export const QUESTION_HISTORY_CELL_HEIGHT = 170;

const QuestionHistoryCell = ({ history }: QuestionHistoryCellProps) => {
  const { question } = history;
  const { owner } = question;
  const router = useRouter();
  const theme = useTheme();

  const goToQuestion = useCallback(() => {
    router.push(path.questions.detail(question.id));
  }, [history.id]);

  return (
    <TouchableRipple onPress={goToQuestion}>
      <Surface elevation={0} style={[styles.container, { borderRadius: theme.roundness }]}>
        <Row style={{ gap: 20 }}>
          <View style={{ flex: 1 }}>
            <Title title={question.title} />
            <Subject subject="math" />
            <View style={{ marginTop: 10 }}>
              <Description description={question.text} />
            </View>
          </View>
          <MoreOptoins historyId={history.id} />
        </Row>

        <Row alignItems="center" style={{ justifyContent: "space-between" }}>
          <UserInfo showSchool={false} user={owner} />
          <Date date={history.watched_at} />
        </Row>
      </Surface>
    </TouchableRipple>
  );
};

export const Title = ({ title, ...props }: { title: string } & ViewProps) => {
  return (
    <View {...props}>
      <ThemedText numberOfLines={2} variant="titleLarge">
        {title}
      </ThemedText>
    </View>
  );
};

export const Subject = ({
  subject,
  ...props
}: { subject: string } & ViewProps) => {
  const theme = useTheme();
  return (
    <View {...props}>
      <ThemedText color={theme.colors.tertiary} variant="labelSmall">
        {subject}
      </ThemedText>
    </View>
  );
};

export const Description = ({
  description,
  ...props
}: { description: string } & ViewProps) => {
  return (
    <View {...props}>
      <ThemedText color="gray" numberOfLines={2} variant="bodySmall">
        {description}
      </ThemedText>
    </View>
  );
};

export const MoreOptoins = ({
  historyId,
}: {
  historyId: WatchHistory["id"];
}) => {
  const [visible, show, hide] = useVisibleV2(false);
  const { mutate, isPending } = useDeleteWatchHistoryMutation();

  const handleHistoryDelete = () => {
    hide();
    mutate(historyId);
  };
  return (
    <View>
      <IconButton icon={"close"} onPress={show} />
      <ConfirmDialogV2
        visible={visible}
        onCancel={hide}
        onConfirm={handleHistoryDelete}
        message="Clear this history record ?"
      />
      <LoadingDialog visible={isPending} message={t("Deleting...")} />
    </View>
  );
};

export const Date = ({
  date,
  ...props
}: { date: string | Date } & ViewProps) => {
  const theme = useTheme();
  return (
    <View style={{ paddingRight: 20 }} {...props}>
      <ThemedText color={theme.colors.onPrimaryContainer} variant="labelSmall">
        {d(date).fromNow()}
      </ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: DEFAULT_CONTAINER_SPACING,
    paddingRight: 0,
    height: QUESTION_HISTORY_CELL_HEIGHT,
    justifyContent: "space-between",
    margin: 6,
  },
});

export default QuestionHistoryCell;
