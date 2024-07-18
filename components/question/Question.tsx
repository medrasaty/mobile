import { Question } from "@/definitions/forum.types";
import { ViewProps } from "react-native";
import { Card, Divider, Text } from "react-native-paper";
import View from "../styled/View";
import { useTheme } from "react-native-paper";

export type QuestionProps = {
  question: Question;
} & ViewProps;

export default function QuestionCard({ question, ...props }: QuestionProps) {
  const theme = useTheme();
  return (
    <Card
      elevation={0}
      style={{
        padding: 10,
        marginTop: 12,
        borderWidth: 0.5,
        borderStyle: "dashed",
        borderRadius: theme.roundness,
        borderColor: theme.colors.secondary,
      }}
    >
      <CardHeader />
      <CardBody />
      <CardFooter />
    </Card>
  );
}

const CardHeader = () => {
  return <Text variant="bodyLarge">header</Text>;
};

const CardBody = () => {
  return <Text variant="bodySmall">body</Text>;
};

const CardFooter = () => {
  return (
    <View
      style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}
    >
      <View>
        <Text>user</Text>
      </View>
      <View style={{ flexDirection: "row", gap: 8 }}>
        <Text>9</Text>
        <Text>200</Text>
        <Text>40</Text>
      </View>
    </View>
  );
};
