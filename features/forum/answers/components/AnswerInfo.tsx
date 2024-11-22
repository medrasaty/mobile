import ReadMoreText from "@/components/ReadMoreText";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Answer } from "@/types/forum.types";
import { View, ViewProps } from "react-native";
import { useTheme } from "react-native-paper";
import User from "@/components/User";
import { d } from "@/lib/dates";
import { Picture } from "@forum/components/question/detail/QuestionDetailInfo";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";

export default function Info({
  answer,
  style,
  ...props
}: { answer: Answer } & ViewProps) {
  return (
    <ThemedView
      style={[style, { flex: 1, justifyContent: "space-between" }]}
      {...props}
    >
      <View>
        <View style={{ gap: 8 }}>
          <AnswerText text={answer.text} />
          {answer.picture && <Picture image={answer.picture} />}
          <StatInfo answer={answer} />
        </View>
      </View>
      <View
        style={{
          gap: 10,
          marginTop: 20,
        }}
      >
        <User user={answer.owner} />
      </View>
    </ThemedView>
  );
}

export const StatInfo = ({ answer }: { answer: Answer }) => {
  const router = useRouter();
  const { t } = useTranslation();
  const goToEditAnswerPage = () => {
    router.push({
      pathname: "/answers/edit",
      params: {
        questionId: answer.question.id ?? answer.question,
        answerId: answer.id,
      },
    });
  };
  return (
    <>
      <TimeInfo answer={answer} />
      <ThemedText onPress={goToEditAnswerPage} link variant="labelSmall">
        {t("edit")}
      </ThemedText>
    </>
  );
};

export const ReplyText = ({
  replies_count,
  onPress,
}: {
  replies_count: Answer["replies_count"];
  onPress: () => void;
}) => {
  /**
   * if replies count === 0
   * return "no replies"
   * else if replies count === 1
   * return "1 reply"
   * else
   * return `${replies_count} replies`
   */

  const theme = useTheme();

  const BaseText = ({ text }: { text: string }) => (
    <ThemedView>
      <ThemedText
        onPress={onPress}
        color={theme.colors.primary}
        variant="labelSmall"
      >
        {text}
      </ThemedText>
    </ThemedView>
  );

  if (replies_count === 0) {
    return <BaseText text={"رد"} />;
  } else if (replies_count >= 1 && replies_count <= 10) {
    return <BaseText text={`${replies_count} ردود`} />;
  } else {
    return <BaseText text={`${replies_count} رد`} />;
  }
};

export const TimeInfo = ({ answer }: { answer: Answer }) => {
  // TODO: add modified time
  return (
    <ThemedView style={{ gap: 6 }}>
      <Created created={answer.created} />
      <Modified modified={answer.modified} />
    </ThemedView>
  );
};

export const Created = ({ created }: { created: Answer["created"] }) => {
  return (
    <ThemedText color="gray" variant="labelSmall">
      {d(created).format("DD-MM-YY")} {d(created).fromNow()}
    </ThemedText>
  );
};

export const Modified = ({ modified }: { modified: Answer["modified"] }) => {
  // TODO: fix the direction
  return (
    <ThemedText color="gray" variant="labelSmall">
      last modified: ({d(modified).fromNow()})
    </ThemedText>
  );
};

function AnswerText({ text }: { text: Answer["text"] }) {
  return <ReadMoreText>{text}</ReadMoreText>;
}
