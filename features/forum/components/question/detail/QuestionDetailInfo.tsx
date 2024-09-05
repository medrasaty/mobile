import Text from "@/components/styled/Text";
import View from "@/components/styled/View";
import { DetailQuestion, Question } from "@/types/forum.types";
import { Image } from "expo-image";
import { ViewProps } from "react-native";
import Animated from "react-native-reanimated";

type QuestionDetailInfoProps = {
  question: DetailQuestion;
} & ViewProps;

import Tag from "@/components/Tag";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { API_URL } from "@/constants";
import { translateSubject } from "@/lib/utils";
import { memo, useCallback, useMemo } from "react";
import { useTheme } from "react-native-paper";

export default function QuestionDetailInfo({
  question,
  style,
  ...props
}: QuestionDetailInfoProps) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-between",
      }}
      {...props}
    >
      <ThemedView style={{ flex: 1 }}>
        <Title title={question.title} />
        <SubjectInfo subject={question.subject} />
        <Description description={question.text} />
        <TagsList tags={question.tags} />
      </ThemedView>
      {question.picture && <Picture image={question.picture} />}

      <View style={{ flex: 0.1, gap: 9, marginTop: 4 }}>
        <ThemedView style={{ flexDirection: "row" }}>
          <ViewsCount views={question.views} />
          <AnswersCount answers_count={question.answers_count} />
        </ThemedView>
        <TimeInfo created={question.created} modified={question.modified} />
      </View>
    </View>
  );
}

export const Title = ({ title }: { title: Question["title"] }) => {
  return <Text variant="headlineMedium">{title}</Text>;
};

export const Description = ({
  description,
}: {
  description: Question["text"];
}) => {
  return <ThemedText variant="bodyLarge">{description}</ThemedText>;
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

const ViewsCount = ({ views }: { views: DetailQuestion["views"] }) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <ThemedText variant="labelSmall">{views} مشاهدة, </ThemedText>
    </View>
  );
};

export const AnswersCount = ({
  answers_count,
}: {
  answers_count: DetailQuestion["answers_count"];
}) => {
  return <ThemedText variant="labelSmall">{answers_count} اجابة</ThemedText>;
};

export const SubjectInfo = ({
  subject,
}: {
  subject: DetailQuestion["subject"];
}) => {
  const theme = useTheme();
  return (
    <Text style={{ color: theme.colors.tertiary }} variant="labelMedium">
      {translateSubject(subject.name)}
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

let refreshCounter = 0;

export const Picture = memo(({ image }: { image?: string }) => {
  console.log("solo is here");
  const hash = "";
  const theme = useTheme();
  const style = useMemo(
    () => ({
      height: 190,
      backgroundColor: theme.colors.surfaceVariant,
      borderRadius: theme.roundness + 6,
    }),
    [theme.colors?.surfaceVariant, theme.roundness]
  );

  const source = useCallback(() => {
    return image
      ? image
      : `${API_URL}/media/students/profile_pictures/wallhaven-yx9log.jpg`;
  }, [image]);

  return (
    <Animated.View>
      <Image
        style={style}
        source={source()}
        placeholder={hash}
        contentFit="cover"
        cachePolicy={"memory-disk"}
        transition={300}
      />
    </Animated.View>
  );
});
