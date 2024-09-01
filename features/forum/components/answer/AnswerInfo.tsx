import ReadMoreText from "@/components/ReadMoreText";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { translateDate } from "@/lib/utils";
import { Answer } from "@/types/forum.types";
import { View, ViewProps } from "react-native";
import { useTheme } from "react-native-paper";
import { useAnswer } from "../../contexts/AnswerContext";
import User from "@/components/User";
import { useMemo } from "react";
import { debugStyle } from "@/constants/styels";

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
        <AnswerText text={answer.text} />
        <StatInfo answer={answer} />
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
  return (
    <ThemedView>
      <ThemedView style={{ gap: 3, flexDirection: "row" }}>
        <TimeInfo answer={answer} />
      </ThemedView>
    </ThemedView>
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
    <ThemedView style={{ flexDirection: "row", gap: 6 }}>
      <Created answer={answer} />
    </ThemedView>
  );
};

export const Created = ({ answer }: { answer: Answer }) => {
  const formatedDate = useMemo(() => translateDate(answer.created), [answer]);
  return (
    <ThemedText color="gray" variant="labelSmall">
      {formatedDate}
    </ThemedText>
  );
};

export const Modified = ({ answer }: { answer: Answer }) => {
  return (
    <ThemedText variant="labelSmall">{new Date().toLocaleString()}</ThemedText>
  );
};

function AnswerText({ text }: { text: Answer["text"] }) {
  return <ReadMoreText>{text}</ReadMoreText>;
}
