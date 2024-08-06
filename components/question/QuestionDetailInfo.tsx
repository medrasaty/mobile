import Text from "@/components/styled/Text";
import View, { Container, SafeAreaView } from "@/components/styled/View";
import { Question } from "@/definitions/forum.types";
import { ViewProps } from "react-native";
import { Chip, useTheme } from "react-native-paper";
type QuestionDetailInfoProps = {
  question: Question;
} & ViewProps;

export default function QuestionDetailInfo({
  question,
  style,
  ...props
}: QuestionDetailInfoProps) {
  return (
    <View
      style={{
        gap: 6,
        flex: 1,
      }}
    >
      <Text variant="headlineSmall">{question.title}</Text>
      <Text variant="bodySmall">{question.text}</Text>

      <View
        style={{
          marginTop: 10,
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 4,
        }}
      >
        {question.tags.map((tag) => (
          <Tag key={tag} name={tag} />
        ))}
      </View>
    </View>
  );
}

const Tag = ({ name }: { name: string }) => {
  const theme = useTheme();
  return (
    <Chip
      mode="outlined"
      style={{ borderColor: theme.colors.primary }}
      onPress={() => {}}
      compact
    >
      <Text>{name}</Text>
    </Chip>
  );
};
