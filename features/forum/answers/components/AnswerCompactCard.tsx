import Row from "@/components/Row";
import { Pressable, View, ViewProps } from "react-native";
import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import UserInfo from "@/components/UserInfo";
import {
  Divider,
  IconButton,
  Menu,
  Surface,
  useTheme,
} from "react-native-paper";
import { DEFAULT_CONTAINER_SPACING } from "@/constants/styels";
import { useCallback, useMemo } from "react";
import { useRouter } from "expo-router";
import { t } from "i18next";
import { Answer } from "@/types/forum.types";
import { Ionicons } from "@expo/vector-icons";
import RelativeDate from "@/components/Date";
import { d } from "@/lib/dates";

type ForumAnswerCompactCardProps = {
  answer: Answer;
};

const ForumAnswerCompactCard = ({ answer }: ForumAnswerCompactCardProps) => {
  const router = useRouter();
  const theme = useTheme();

  const goToQuestion = useCallback(() => {
    router.push({
      pathname: `/questions/details/${answer.question.id}`,
      params: {
        answerId: answer.id ?? undefined,
      },
    });
  }, [answer.id]);

  return (
    <Pressable onPress={goToQuestion}>
      <Surface
        mode="flat"
        elevation={0}
        style={[styles.container, { borderRadius: theme.roundness }]}
      >
        <Row style={{ gap: 20 }}>
          <View style={{ flex: 1 }}>
            <View style={{ marginTop: 14 }}>
              <AnswerText text={answer.text} />
              <QuestionPreview preview={answer.question.title} />
            </View>

            <View style={{ marginTop: 5 }}>
              <Row alignItems="center" style={{ gap: 6 }}>
                <ThemedText color="gray" variant="labelSmall">
                  {d(answer.created).format("DD/MM/YY")}
                </ThemedText>
                <RelativeDate variant="labelMedium" date={answer.created} />
              </Row>
            </View>
          </View>
        </Row>
      </Surface>
    </Pressable>
  );
};

export const AnswerText = ({
  text,
  ...props
}: { text: string } & ViewProps) => {
  return (
    <View {...props}>
      <ThemedText
        style={{ opacity: 0.8 }}
        numberOfLines={2}
        bold
        variant="bodyLarge"
      >
        {text}
      </ThemedText>
    </View>
  );
};

export const Statistics = ({
  views,
  answers,
  rating,
  style,
  ...props
}: ViewProps & { views: number; answers: number; rating: number }) => {
  return (
    <Row style={[style, { gap: 8 }]} alignItems="center" {...props}>
      <ViewsCount views={views} />
      <RatingCount rating={rating} />
    </Row>
  );
};

export const Value = ({ value }: { value: number }) => {
  return <ThemedText variant="labelSmall">{value}</ThemedText>;
};

export const ViewsCount = ({ views }: { views: number }) => {
  const theme = useTheme();
  return (
    <Row style={{ gap: 4 }} alignItems="center">
      <Value value={views} />
      <ThemedText variant="labelMedium">{t("views")}</ThemedText>
    </Row>
  );
};

export const ReplyCounts = ({ replies }: { replies: number }) => {
  return (
    <Row style={{ gap: 4 }} alignItems="center">
      <Value value={replies} />
      <ThemedText variant="labelMedium">{t("replies")}</ThemedText>
    </Row>
  );
};

export const RatingCount = ({ rating }: { rating: number }) => {
  const theme = useTheme();
  return (
    <Row style={{ gap: 4 }} alignItems="center">
      <Value value={rating} />
      <RatingIcon rating={rating} />
    </Row>
  );
};

export const RatingIcon = ({ rating }: { rating: number }) => {
  const theme = useTheme();
  const isPositive = useMemo(() => rating >= 0, [rating]);
  return (
    <Ionicons
      color={isPositive ? theme.colors.tertiary : theme.colors.error}
      name={isPositive ? "arrow-up" : "arrow-down"}
      size={12}
    />
  );
};

export const QuestionPreview = ({ preview }: { preview: string }) => {
  return (
    <ThemedText color="gray" variant="labelSmall">
      {`${t("question")}: ${preview}`}
    </ThemedText>
  );
};

export const ANSWER_CARD_HEIGHT = 100;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: DEFAULT_CONTAINER_SPACING,
    paddingRight: 0,
    height: ANSWER_CARD_HEIGHT,
    margin: 6,
  },
  moreOptionsItem: {
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default ForumAnswerCompactCard;
