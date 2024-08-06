import { Question } from "@/definitions/forum.types";
import { ViewProps } from "react-native";
import { Avatar, Card, TouchableRipple } from "react-native-paper";
import Text from "./styled/Text";
import View from "./styled/View";

import { containerPaddings } from "@/constants/styels";
import { translateDate, translateSubject } from "@/lib/translators";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useTheme } from "react-native-paper";
import { getSubjectColor } from "@/lib/utils";
import { BottomSheet } from "./BottomSheet";

export type QuestionProps = {
  question: Question;
} & ViewProps;

export default function QuestionCard({ question, ...props }: QuestionProps) {
  const theme = useTheme();

  return (
    <Card
      onPress={() => router.push(`/questions/details/${question.id}`)}
      elevation={0}
      style={[
        {
          padding: 18,
          backgroundColor: theme.colors.surface,
          borderRadius: theme.roundness,
        },
        containerPaddings,
      ]}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text
          variant="bodySmall"
          style={{
            color: getSubjectColor(question.subject.name),
            fontWeight: "bold",
          }}
        >
          {translateSubject(question.subject.name)}
        </Text>
        <Text variant="bodySmall">{translateDate(question.created)}</Text>
      </View>

      <View style={{ marginTop: 12 }}>
        <Text variant="titleMedium" style={{ fontWeight: "bold" }}>
          {question.title}
        </Text>
        <Text numberOfLines={1} variant="bodySmall" style={{ marginTop: 8 }}>
          {question.text}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 30,
        }}
      >
        <QuestionOwnerInfo owner={question.owner} />
        <QuestionStatInfo question={question} />
      </View>
    </Card>
  );
}

type QuestionStatInfoProps = {
  question: Question;
};

const QuestionStatInfo = ({ question }: QuestionStatInfoProps) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 9 }}>
      <IconWithInfo icon="comment-outline" value={question.answers_count} />
      <IconWithInfo icon="eye-outline" value={question.views} />
      <RatingsInfo ratings_value={question.ratings_value} />
    </View>
  );
};

const RatingsInfo = ({ ratings_value }: { ratings_value: number }) => {
  const theme = useTheme();
  if (ratings_value >= 0) {
    return (
      <IconWithInfo icon="trending-up" color={"green"} value={ratings_value} />
    );
  } else {
    return (
      <IconWithInfo icon="trending-down" color={"red"} value={ratings_value} />
    );
  }
};

const IconWithInfo = ({
  icon,
  value = 0,
  color,
}: {
  icon: string;
  value: number;
  color?: string;
}) => {
  const theme = useTheme();
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
      <Text variant="labelSmall">{value}</Text>
      <MaterialCommunityIcons
        name={icon}
        size={14}
        color={color || theme.colors.secondary}
      />
    </View>
  );
};

const QuestionOwnerInfo = ({ owner }: { owner: Question["owner"] }) => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
      <Avatar.Text label={"M"} size={26} />
      <Text>{owner.short_name}</Text>
    </View>
  );
};
