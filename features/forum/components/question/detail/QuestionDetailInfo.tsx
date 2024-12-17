import { useSheetViewRef } from "@/components/SheetView";
import Text from "@/components/styled/Text";
import View from "@/components/styled/View";
import Tag from "@/components/Tag";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import ShareContentSheet from "@/features/share/components/ShareContentSheet";
import { d } from "@/lib/dates";
import { translateSubject } from "@/lib/utils";
import { DetailQuestion, Question } from "@/types/forum.types";
import UserInfo from "@components/UserInfo";
import { Image } from "expo-image";
import { t } from "i18next";
import { memo, useMemo } from "react";
import { Pressable, ViewProps } from "react-native";
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
  question: DetailQuestion;
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
    question,
    style,
    ...props
  }: QuestionDetailInfoProps) => {
    return (
      <View style={{ flex: 1, gap: 30 }}>
        <View
          style={{
            flex: 1,
            justifyContent: "space-between",
          }}
          {...props}
        >
          <ThemedView style={{ flex: 1 }}>
            {/* Title */}
            <Text variant="headlineMedium">{question.title}</Text>
            <SubjectInfo subject={subject} />
            <Description description={text} />
            <TagsList
              style={{ marginTop: 5, marginBottom: 5 }}
              tags={question.tags}
            />
          </ThemedView>
          {picture && <Picture image={picture} />}

          <View style={{ flex: 0.1, gap: 9, marginTop: 4 }}>
            <ThemedView
              style={{ gap: 8, flexDirection: "row", alignItems: "center" }}
            >
              <ViewsCount views={views} />
              <AnswersCount answersCount={answersCount} />
              <Share id={id} />
            </ThemedView>
            <TimeInfo created={created} modified={modified} />
          </View>
        </View>
        <UserInfo avatarSize={45} user={question.owner} />
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

const TagsList = ({
  tags,
  style,
  ...props
}: { tags: DetailQuestion["tags"] } & ViewProps) => {
  return (
    <View
      style={[
        style,
        {
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 4,
        },
      ]}
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
        {d(created).toString()} {d(created).fromNow()}
      </Text>
      <Text style={{ color: "gray" }} variant="labelSmall">
        آخر تعديل {d(modified).toString()} {` (${d(modified).fromNow()})`}
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
    [theme]
  );

  return (
    <>
      <Pressable onPress={() => alert("bigger")}>
        <Image
          style={[style, { height: 160 }]}
          source={{
            uri: image,
          }}
          contentFit="cover"
        />
      </Pressable>
    </>
  );
});

export const Share = ({ id }: { id: Question["id"] }) => {
  const shareRef = useSheetViewRef();
  return (
    <View>
      <ThemedText
        style={{ textDecorationLine: "underline" }}
        onPress={() => shareRef.current?.present()}
      >
        {t("share")}
      </ThemedText>
      <ShareContentSheet questionId={id} ref={shareRef} />
    </View>
  );
};

export default QuestionDetailInfo;
