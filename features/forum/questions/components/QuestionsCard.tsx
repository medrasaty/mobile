import Row from "@/components/Row";
import { Pressable, View, ViewProps } from "react-native";
import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import UserInfo from "@/components/UserInfo";
import { Surface, TouchableRipple, useTheme } from "react-native-paper";
import { DEFAULT_CONTAINER_SPACING } from "@/constants/styels";
import { useCallback, useMemo, useState } from "react";
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

const ForumQuestionCard = ({
  question,
  compact = false,
}: QuestionCardProps) => {
  const router = useRouter();
  const theme = useTheme();

  const goToQuestion = useCallback(() => {
    router.push(questionDetail({ questionId: question.id }));
  }, [question.id]);

  return (
    <Pressable
      style={{
        height: compact
          ? COMPACT_QUESTION_CARD_HEIGHT
          : FORUM_QUESTION_CARD_HEIGHT,
      }}
      onPress={goToQuestion}
    >
      <Surface
        mode="flat"
        elevation={compact ? 1 : 0}
        style={[
          styles.container,
          {
            borderRadius: theme.roundness,
            // rectangular card when compact
            width: compact ? FORUM_QUESTION_CARD_HEIGHT : "auto",
          },
        ]}
      >
        <Row style={{ gap: 20 }}>
          <View style={{ flex: 1 }}>
            {/* Title */}
            <ThemedText
              numberOfLines={compact ? 1 : 2}
              bold
              variant={"titleLarge"}
            >
              {question.title}
            </ThemedText>

            {/* Subject */}
            <ThemedText color={theme.colors.tertiary} variant="labelSmall">
              {question.subject.name}
            </ThemedText>

            {/* Description */}
            <View style={{ marginTop: 4 }}>
              <ThemedText
                style={{ opacity: 0.8 }}
                numberOfLines={compact ? 1 : 2}
                variant={compact ? "bodySmall" : "bodyMedium"}
              >
                {question.text}
              </ThemedText>
            </View>

            <View style={{ marginTop: 5 }}>
              <Statistics
                views={question.views}
                answers={question.answers_count}
                rating={question.ratings_value}
              />
              <Date
                variant={compact ? "labelSmall" : "labelMedium"}
                style={{
                  marginRight: DEFAULT_CONTAINER_SPACING,
                  marginTop: 6,
                }}
                date={question.created}
              />
            </View>
          </View>
          {!compact && (
            <MoreOptions
              ownerUsername={question.owner.username}
              contentTypeId={question.contenttype}
              questionId={question.id}
            />
          )}
        </Row>

        <Row
          alignItems="center"
          style={{ justifyContent: "space-between", marginTop: 10 }}
        >
          <UserInfo user={question.owner} avatarSize={compact ? 35 : 45} />
        </Row>
      </Surface>
    </Pressable>
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
      <AnswersCount answers={answers} />
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

export const AnswersCount = ({ answers }: { answers: number }) => {
  return (
    <Row style={{ gap: 4 }} alignItems="center">
      <Value value={answers} />
      <ThemedText variant="labelMedium">{t("Answers")}</ThemedText>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: DEFAULT_CONTAINER_SPACING,
    paddingRight: 0,
    height: FORUM_QUESTION_CARD_HEIGHT,
    justifyContent: "space-between",
    margin: 6,
  },
  moreOptionsItem: {
    paddingLeft: 10,
    paddingRight: 10,
  },
});

export default ForumQuestionCard;
