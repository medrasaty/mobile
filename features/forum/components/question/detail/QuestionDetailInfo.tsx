import Text from "@/components/styled/Text";
import View from "@/components/styled/View";
import { DetailQuestion, Question } from "@/types/forum.types";
import { ViewProps } from "react-native";
import { Image } from "expo-image";
import Animated from "react-native-reanimated";

type QuestionDetailInfoProps = {
  question: DetailQuestion;
} & ViewProps;

import Tag from "@/components/Tag";
import { useTheme } from "react-native-paper";
import { ZoomableImage } from "@/app/(protected)/(tabs)/leader_board";
import { API_URL, HOST } from "@/constants";

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
      {...props}
    >
      <View style={{ flex: 1, gap: 6 }}>
        <Title title={question.title} />
        <SubjectInfo subject={question.subject} />
        <Description description={question.text} />
        <TagsList tags={question.tags} />
      </View>
      {<Picture />}

      <View style={{ flex: 0.1, gap: 9, marginTop: 4 }}>
        <StatInfo question={question} />
        <TimeInfo created={question.created} modified={question.modified} />
      </View>
    </View>
  );
}

const Title = ({ title }: { title: Question["title"] }) => {
  return <Text variant="headlineMedium">{title}</Text>;
};

const Description = ({ description }: { description: Question["text"] }) => {
  return <Text variant="bodyMedium">{description}</Text>;
};

const TagsList = ({ tags }: { tags: DetailQuestion["tags"] }) => {
  return (
    <View
      style={{
        marginTop: 10,
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 4,
      }}
    >
      {tags.map((tag) => (
        <Tag key={tag} name={tag} />
      ))}
    </View>
  );
};

const StatInfo = ({ question }: { question: DetailQuestion }) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <Text variant="labelSmall">{question.views} مشاهدة, </Text>

      <Text variant="labelSmall">
        {question.answers_count === 0
          ? "لا اجابات"
          : `${question.answers_count} اجابة`}
      </Text>
    </View>
  );
};

const SubjectInfo = ({ subject }: { subject: DetailQuestion["subject"] }) => {
  const theme = useTheme();
  return (
    <Text style={{ color: theme.colors.primary }} variant="labelMedium">
      رياضيات
    </Text>
  );
};

const TimeInfo = ({
  created,
  modified,
  ...props
}: {
  created: DetailQuestion["created"];
  modified: DetailQuestion["modified"];
} & ViewProps) => {
  return (
    <View {...props}>
      <Text style={{ color: "gray" }} variant="labelSmall">
        {created.toDateString()}
      </Text>
      <Text style={{ color: "gray" }} variant="labelSmall">
        آخر تعديل {modified.toDateString()}
      </Text>
    </View>
  );
};

const Picture = () => {
  const hash = "";
  const theme = useTheme();

  return (
    <Animated.View>
      <Image
        style={{
          height: 200,
          borderRadius: theme.roundness,
        }}
        source={`${API_URL}/media/students/profile_pictures/wallhaven-yx9log.jpg`}
        placeholder={hash}
      />
    </Animated.View>
  );
};
