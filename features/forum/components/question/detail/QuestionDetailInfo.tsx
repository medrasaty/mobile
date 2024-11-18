import { useSheetViewRef } from "@/components/SheetView";
import Text from "@/components/styled/Text";
import View from "@/components/styled/View";
import Tag from "@/components/Tag";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { API_URL } from "@/constants";
import ShareContentSheet from "@/features/share/components/ShareContentSheet";
import { translateSubject } from "@/lib/utils";
import { DetailQuestion, Question } from "@/types/forum.types";
import { memo, useCallback, useMemo } from "react";
import { ViewProps } from "react-native";
import FastImage from "react-native-fast-image";
import { useTheme } from "react-native-paper";

type QuestionDetailInfoProps = {
  id: DetailQuestion["id"];
  title: DetailQuestion["title"];
  subject: DetailQuestion["subject"];
  text: DetailQuestion["text"];
  tags: DetailQuestion["tags"];
  picture?: DetailQuestion["picture"];
  views: DetailQuestion["views"];
  answersCount: DetailQuestion["answers_count"];
  created: DetailQuestion["created"];
  modified: DetailQuestion["modified"];
} & ViewProps;

const QuestionDetailInfo = memo(
  ({
    id,
    title,
    subject,
    text,
    tags,
    picture,
    views,
    answersCount,
    created,
    modified,
    style,
    ...props
  }: QuestionDetailInfoProps) => {
    const shareRef = useSheetViewRef();
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
        }}
        {...props}
      >
        <ThemedView style={{ flex: 1 }}>
          <Title title={title} />
          <SubjectInfo subject={subject} />
          <Description description={text} />
          <TagsList tags={tags} />
        </ThemedView>
        {picture && <Picture image={picture} />}

        <View style={{ flex: 0.1, gap: 9, marginTop: 4 }}>
          <ThemedView style={{ flexDirection: "row" }}>
            <ViewsCount views={views} />
            <AnswersCount answersCount={answersCount} />
            <ThemedText
              style={{ margin: 10 }}
              link
              onPress={() => shareRef.current?.present()}
            >
              share
            </ThemedText>
          </ThemedView>
          <TimeInfo created={created} modified={modified} />
        </View>
        <ShareContentSheet questionId={id} ref={shareRef} />
      </View>
    );
  }
);

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
  answersCount,
}: {
  answersCount: DetailQuestion["answers_count"];
}) => {
  return <ThemedText variant="labelSmall">{answersCount} اجابة</ThemedText>;
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

export const Picture = memo(({ image }: { image?: string }) => {
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

  return (
    <View>
      <FastImage
        style={style}
        source={{
          uri: image,
          priority: FastImage.priority.high,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
    </View>
  );
});

export default QuestionDetailInfo;
