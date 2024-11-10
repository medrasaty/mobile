import Row from "@/components/Row";
import { HistoryQuestion, WatchHistory } from "../types";
import { Pressable, TouchableOpacity, View, ViewProps } from "react-native";
import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import UserInfo from "@/components/UserInfo";
import { Card, IconButton, Surface, useTheme } from "react-native-paper";
import { DEFAULT_CONTAINER_SPACING } from "@/constants/styels";
import { Container } from "@/components/styled";
import { useCallback } from "react";
import { useRouter } from "expo-router";

type QuestionHistoryCellProps = {
  history: WatchHistory;
};

const QuestionHistoryCell = ({ history }: QuestionHistoryCellProps) => {
  const { question } = history;
  const { owner } = question;
  const router = useRouter();

  const goToQuestion = useCallback(() => {
    router.push(`/questions/details/` + question.id);
  }, []);

  return (
    <Pressable onPress={goToQuestion}>
      <Surface style={styles.container}>
        <Row style={{ gap: 20 }}>
          <View style={{ flex: 1 }}>
            <Title title={question.title} />
            <Subject subject="math" />
            <View style={{ marginTop: 10 }}>
              <Description description={question.text} />
            </View>
          </View>
          <MoreOptoins />
        </Row>

        <Row alignItems="center" style={{ justifyContent: "space-between" }}>
          <UserInfo
            name={owner.short_name}
            username={owner.username}
            schoolName={owner.family_name}
            avatarUrl={owner.profile_picture}
            avatarSize={40}
          />
          <TimeInfo time={history.watched_at.toLocaleDateString()} />
        </Row>
      </Surface>
    </Pressable>
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

export const MoreOptoins = () => {
  return (
    <View>
      <IconButton icon={"dots-vertical"} onPress={() => alert("Options")} />
    </View>
  );
};

export const TimeInfo = ({ time, ...props }: { time: string } & ViewProps) => {
  const theme = useTheme();
  return (
    <View style={{ paddingRight: 20 }} {...props}>
      <ThemedText color={theme.colors.onPrimaryContainer} variant="labelSmall">
        {time}
      </ThemedText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: DEFAULT_CONTAINER_SPACING,
    paddingRight: 0,
    height: 210,
    justifyContent: "space-between",
    margin: 6,
    borderRadius: 20,
  },
});

export default QuestionHistoryCell;
