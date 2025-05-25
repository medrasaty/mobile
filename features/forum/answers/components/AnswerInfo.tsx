import ReadMoreText from "@/components/ReadMoreText";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Answer } from "@features/forum/answers/types"; 
import { View, ViewProps } from "react-native";
import { useTheme } from "react-native-paper";
import { d } from "@/lib/dates";
import { PictureOptimized } from "@forum/components/question/detail/QuestionDetailInfo";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import UserInfo from "@components/UserInfo";
import { memo, useMemo } from "react";
import { useAuthSession } from "@features/auth/store";

// Memoize the main component
const Info = memo(function Info({
  answer,
  style,
  ...props
}: { answer: Answer } & ViewProps) {
  // Store this to avoid re-renders with the same data
  const hasPicture = Boolean(answer.picture);
  
  return (
    <View
      style={[style, { flex: 1, justifyContent: "space-between" }]}
      {...props}
    >
      <View>
        <View style={{ gap: 8 }}>
          <AnswerText text={answer.text} />
          {hasPicture && <PictureOptimized image={answer.picture || undefined} />}
          <StatInfo answer={answer} />
        </View>
      </View>
      <View
        style={{
          gap: 10,
          marginTop: 20,
        }}
      >
        <UserInfo avatarSize={40} user={answer.owner} />
      </View>
    </View>
  );
});

// Memoize the StatInfo component
export const StatInfo = memo(({ answer }: { answer: Answer }) => {
  const router = useRouter();
  const { t } = useTranslation();
  
  // Memoize this function
  const goToEditAnswerPage = useMemo(() => () => {
    router.push({
      pathname: "/answers/edit",
      params: {
        questionId: answer.question.id ?? answer.question,
        answerId: answer.id,
      },
    });
  }, [router, answer.question.id, answer.question, answer.id]);
  const user = useAuthSession(state => state.session?.user);

  const isOwner = useMemo(() => answer.owner.id === user?.id, [answer.owner.id, user?.id]);
  
  return (
    <View style={{ gap: 6 }}>
      <TimeInfo answer={answer} />
      {isOwner && (
        <ThemedText onPress={goToEditAnswerPage} link variant="labelSmall">
          {t("edit")}
        </ThemedText>
      )}
    </View>
  );
});

// Memoize the ReplyText component
export const ReplyText = memo(({
  replies_count,
  onPress,
}: {
  replies_count: Answer["replies_count"];
  onPress: () => void;
}) => {
  const theme = useTheme();

  // Extract the inner component
  const BaseText = memo(({ text }: { text: string }) => (
    <View>
      <ThemedText
        onPress={onPress}
        color={theme.colors.primary}
        variant="labelSmall"
      >
        {text}
      </ThemedText>
    </View>
  ));

  // Determine text based on replies count
  let displayText = 'رد';
  if (replies_count >= 1 && replies_count <= 10) {
    displayText = `${replies_count} ردود`;
  } else if (replies_count > 10) {
    displayText = `${replies_count} رد`;
  }

  return <BaseText text={displayText} />;
});

// Memoize the TimeInfo component
export const TimeInfo = memo(({ answer }: { answer: Answer }) => {
  return (
    <View style={{ gap: 6 }}>
      <Created created={answer.created} />
      <Modified modified={answer.modified} />
    </View>
  );
});

// Memoize and optimize date formatting
export const Created = memo(({ created }: { created: Answer["created"] }) => {
  // Pre-compute formatted dates to avoid repeated calculation
  const formattedDate = useMemo(() => {
    // Calculate both formats at once to avoid calling dayjs twice
    const day = d(created);
    return {
      formatted: day.format("DD-MM-YY"),
      fromNow: day.fromNow()
    };
  }, [created]);
  
  return (
    <ThemedText color="gray" variant="labelSmall">
      {formattedDate.formatted} {formattedDate.fromNow}
    </ThemedText>
  );
});

// Memoize and optimize date formatting
export const Modified = memo(({ modified }: { modified: Answer["modified"] }) => {
  // Pre-compute formatted date
  const fromNow = useMemo(() => d(modified).fromNow(), [modified]);
  
  return (
    <ThemedText color="gray" variant="labelSmall">
      last modified: ({fromNow})
    </ThemedText>
  );
});

// Memoize the AnswerText component
const AnswerText = memo(({ text }: { text: Answer["text"] }) => {
  return <ReadMoreText>{text}</ReadMoreText>;
});

export default Info;
