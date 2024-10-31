import Text from "@/components/styled/Text";
import View from "@/components/styled/View";
import { Question } from "@/types/forum.types";
import { ViewProps } from "react-native";
import { Card } from "react-native-paper";

import { ProfilePicture } from "@/components/Avatar";
import { containerPaddings } from "@/constants/styels";
import { translateDate, translateSubject } from "@/lib/translators";
import { getSubjectColor } from "@/lib/utils";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useTheme } from "react-native-paper";

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
          borderRadius: 0,
        },
        containerPaddings,
      ]}
    >
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text variant="bodySmall">{translateDate(question.created)}</Text>
      </View>

      <View style={{ marginTop: 12 }}>
        <Text variant="titleMedium" style={{ fontWeight: "bold" }}>
          {question.title}
        </Text>
        <Text numberOfLines={3} variant="bodySmall" style={{ marginTop: 8 }}>
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
      <ProfilePicture size={26} source={owner.avatar_thumbnail} />
      <Text>{owner.short_name}</Text>
    </View>
  );
};
