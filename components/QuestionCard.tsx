import { Question } from "@/definitions/forum.types";
import { ViewProps } from "react-native";
import { Avatar, Badge, Card, Divider } from "react-native-paper";
import View from "./styled/View";
import Text from "./styled/Text";

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
        padding: 8,
      }}
    >
      <View style={{ gap: 8 }}>
        <CardHeader title={question.title} />
        <CardBody text={question.text} />
        <CardFooter
          owner={question.owner}
          answers={question.answers}
          ratings={question.ratings}
        />
      </View>
    </Card>
  );
}

const CardHeader = ({ title, ...props }: { title: string } & ViewProps) => {
  return (
    <View {...props}>
      <Text numberOfLines={1} variant="bodyLarge">
        {title}
      </Text>
    </View>
  );
};

const CardBody = ({ text, ...props }: { text: string } & ViewProps) => {
  return (
    <View {...props}>
      <Text numberOfLines={2} variant="bodyMedium">
        {text}
      </Text>
    </View>
  );
};

type CardFooterType = {
  owner: Question["owner"];
  answers: Question["answers"];
  ratings: Question["ratings"];
} & ViewProps;

const CardFooter = ({
  owner,
  answers,
  ratings,
  style,
  ...props
}: CardFooterType) => {
  return (
    <View
      style={[
        {
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 10,
          marginBottom: 10,
        },
        style,
      ]}
      {...props}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
        }}
      >
        <Avatar.Text label="S" size={30} />

        <View style={{ gap: 2 }}>
          <Text
            variant="bodySmall"
            style={{
              fontWeight: "400",
            }}
          >
            {owner.short_name}
          </Text>
          <Text variant="bodySmall">{owner.school_name}</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", gap: 8 }}>
        <Text>{answers.length}</Text>
        <Text>{ratings.length}</Text>
      </View>
    </View>
  );
};
