import Row from "@/components/Row";
import { Pressable, View, ViewProps } from "react-native";
import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import UserInfo from "@/components/UserInfo";
import { Surface, useTheme } from "react-native-paper";
import { DEFAULT_CONTAINER_SPACING } from "@/constants/styels";
import { useCallback, useMemo, memo } from "react";
import { useRouter } from "expo-router";
import { t } from "i18next";
import { Question } from "@/types/forum.types";
import { Ionicons } from "@expo/vector-icons";
import Date from "@/components/Date";
import MoreOptions from "./QuestionCardOptionsMenu";
import { questionDetail } from "@/lib/routing";

export const FORUM_QUESTION_CARD_HEIGHT = 240;
export const COMPACT_QUESTION_CARD_HEIGHT = 200;

type QuestionCardProps = {
  question: Question;
  compact?: boolean;
};

const ForumQuestionCard = memo(
  ({ question, compact = false }: QuestionCardProps) => {
    const router = useRouter();
    const theme = useTheme();

    const goToQuestion = useCallback(() => {
      router.push(questionDetail({ questionId: question.id }));
    }, [question.id]);

    const cardHeight = useMemo(
      () => ({
        height: compact
          ? COMPACT_QUESTION_CARD_HEIGHT
          : FORUM_QUESTION_CARD_HEIGHT,
      }),
      [compact]
    );

    const surfaceStyle = useMemo(
      () => [
        styles.container,
        {
          borderRadius: theme.roundness,
          width: compact ? FORUM_QUESTION_CARD_HEIGHT : "100%",
        } as const,
      ],
      [theme.roundness, compact]
    );

    const titleVariant = useMemo(
      () => ({
        numberOfLines: compact ? 1 : 2,
        bold: true,
        variant: "titleLarge" as const,
      }),
      [compact]
    );

    const descriptionStyle = useMemo(
      () => ({
        opacity: 0.8,
        numberOfLines: compact ? 1 : 2,
        variant: compact ? ("bodySmall" as const) : ("bodyMedium" as const),
      }),
      [compact]
    );

    const dateStyle = useMemo(
      () => ({
        marginRight: DEFAULT_CONTAINER_SPACING,
        marginTop: 6,
      }),
      []
    );

    return (
      <Pressable style={cardHeight} onPress={goToQuestion}>
        <Surface mode="flat" elevation={compact ? 1 : 0} style={surfaceStyle}>
          <Row style={styles.contentRow}>
            <View style={styles.flex}>
              <ThemedText {...titleVariant}>{question.title}</ThemedText>

              <ThemedText color={theme.colors.tertiary} variant="labelSmall">
                {question.subject.name}
              </ThemedText>

              <View style={styles.descriptionContainer}>
                <ThemedText {...descriptionStyle}>{question.text}</ThemedText>
              </View>

              <View style={styles.statsContainer}>
                <Statistics
                  views={question.views}
                  answers={question.answers_count}
                  rating={question.ratings_value}
                />
                <Date
                  variant={compact ? "labelSmall" : "labelMedium"}
                  style={dateStyle}
                  date={question.created}
                />
              </View>
            </View>
            {!compact && (
              <MoreOptions
                question={question}
                ownerUsername={question.owner.username}
                contentTypeId={question.contenttype}
                questionId={question.id}
              />
            )}
          </Row>

          <Row alignItems="center" style={styles.userInfoRow}>
            <UserInfo user={question.owner} avatarSize={compact ? 35 : 45} />
          </Row>
        </Surface>
      </Pressable>
    );
  }
);

const Statistics = memo(
  ({
    views,
    answers,
    rating,
    style,
    ...props
  }: ViewProps & { views: number; answers: number; rating: number }) => {
    const combinedStyle = useMemo(() => [style, styles.statsRow], [style]);

    return (
      <Row style={combinedStyle} alignItems="center" {...props}>
        <ViewsCount views={views} />
        <AnswersCount answers={answers} />
        <RatingCount rating={rating} />
      </Row>
    );
  }
);

const Value = memo(({ value }: { value: number }) => (
  <ThemedText variant="labelSmall">{value}</ThemedText>
));

const ViewsCount = memo(({ views }: { views: number }) => (
  <Row style={styles.countRow} alignItems="center">
    <Value value={views} />
    <ThemedText variant="labelMedium">{t("views")}</ThemedText>
  </Row>
));

const AnswersCount = memo(({ answers }: { answers: number }) => (
  <Row style={styles.countRow} alignItems="center">
    <Value value={answers} />
    <ThemedText variant="labelMedium">{t("Answers")}</ThemedText>
  </Row>
));

const RatingCount = memo(({ rating }: { rating: number }) => (
  <Row style={styles.countRow} alignItems="center">
    <Value value={rating} />
    <RatingIcon rating={rating} />
  </Row>
));

const RatingIcon = memo(({ rating }: { rating: number }) => {
  const theme = useTheme();
  const isPositive = rating >= 0;

  return (
    <Ionicons
      color={isPositive ? theme.colors.tertiary : theme.colors.error}
      name={isPositive ? "arrow-up" : "arrow-down"}
      size={12}
    />
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: DEFAULT_CONTAINER_SPACING,
    paddingRight: 0,
    height: FORUM_QUESTION_CARD_HEIGHT,
    justifyContent: "space-between",
    margin: 6,
  },
  flex: {
    flex: 1,
  },
  contentRow: {
    gap: 20,
  },
  descriptionContainer: {
    marginTop: 4,
  },
  statsContainer: {
    marginTop: 5,
  },
  userInfoRow: {
    justifyContent: "space-between",
    marginTop: 10,
  },
  statsRow: {
    gap: 8,
  },
  countRow: {
    gap: 4,
  },
  moreOptionsItem: {
    paddingLeft: 10,
    paddingRight: 10,
  },
});

ForumQuestionCard.displayName = "ForumQuestionCard";

export default ForumQuestionCard;
