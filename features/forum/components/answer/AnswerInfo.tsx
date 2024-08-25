import ReadMoreText from "@/components/ReadMoreText";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { translateDate } from "@/lib/utils";
import { Answer } from "@/types/forum.types";
import { useState } from "react";
import { View, ViewProps } from "react-native";
import { useTheme } from "react-native-paper";
import { useAnswer } from "../../contexts/AnswerContext";
import ReplySheet from "./ReplySheet";
import User from "@/components/User";

export default function Info({ style, ...props }: ViewProps) {
  const answer = useAnswer();
  return (
    <ThemedView
      style={[style, { flex: 1, gap: 4, justifyContent: "space-between" }]}
      {...props}
    >
      <View>
        <AnswerText text={answer.text} />
        <StatInfo />
      </View>
      <View style={{ gap: 10, marginTop: 20 }}>
        <User user={answer.owner} />
        <Reply />
      </View>
    </ThemedView>
  );
}

export const StatInfo = () => {
  return (
    <ThemedView>
      <ThemedView style={{ gap: 3, flexDirection: "row" }}>
        <TimeInfo />
      </ThemedView>
    </ThemedView>
  );
};

export const Reply = () => {
  const answer = useAnswer();
  const [present, setPresent] = useState<boolean>(false);
  const presentSheet = () => setPresent(true);
  const hideSheet = () => setPresent(false);

  return (
    <>
      <ReplyText onPress={presentSheet} replies_count={answer.replies_count} />
      <ReplySheet present={present} onDismiss={hideSheet} />
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

export const TimeInfo = () => {
  // TODO: add modified time
  return (
    <ThemedView style={{ flexDirection: "row", gap: 6 }}>
      <Created />
    </ThemedView>
  );
};

export const Created = () => {
  const { created } = useAnswer();

  return (
    <ThemedText color="gray" variant="labelSmall">
      {translateDate(created)}
    </ThemedText>
  );
};

export const Modified = () => {
  return (
    <ThemedText variant="labelSmall">{new Date().toLocaleString()}</ThemedText>
  );
};

function AnswerText({ text }: { text: Answer["text"] }) {
  return <ReadMoreText text={text} />;
}
