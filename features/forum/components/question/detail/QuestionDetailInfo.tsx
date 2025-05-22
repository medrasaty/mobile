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
import { useSheetRef } from "@components/Sheet";
import UserInfo from "@components/UserInfo";
import { Image } from "expo-image";
import { t } from "i18next";
import { memo, useMemo } from "react";
import { Pressable, ViewProps } from "react-native";
import { useTheme } from "react-native-paper";

type QuestionDetailInfoProps = {
  question: DetailQuestion;
} & ViewProps;

// Wrap entire component with memo to prevent unnecessary re-renders
const QuestionDetailInfo = memo(
  ({ question, style, ...props }: QuestionDetailInfoProps) => {
    // Pre-calculate all needed values
    const hasImage = Boolean(question?.picture);
    
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
            <Text variant="headlineMedium">{question?.title}</Text>
            <SubjectInfo subject={question?.subject} />
            <Description description={question?.text} />
            <TagsList
              style={{ marginTop: 5, marginBottom: 5 }}
              tags={question?.tags}
            />
          </ThemedView>
          {hasImage && <PictureOptimized image={question.picture || undefined} />}

          <View style={{ flex: 0.1, gap: 9, marginTop: 4 }}>
            <ThemedView
              style={{ gap: 8, flexDirection: "row", alignItems: "center" }}
            >
              <ViewsCount views={question?.views} />
              <AnswersCount answersCount={question?.answers_count} />
              <ShareMemoized id={question?.id} />
            </ThemedView>
            <TimeInfo
              created={question?.created}
              modified={question?.modified}
            />
          </View>
        </View>
        <UserInfo avatarSize={45} user={question?.owner} />
      </View>
    );
  }
);

export const Title = memo(({ title }: { title: Question["title"] }) => {
  return <Text variant="headlineMedium">{title}</Text>;
});

export const Description = memo(
  ({ description }: { description: Question["text"] }) => {
    return <ThemedText variant="bodyLarge">{description}</ThemedText>;
  }
);

const TagsList = memo(
  ({
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
  }
);

const ViewsCount = memo(({ views }: { views: DetailQuestion["views"] }) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <ThemedText variant="labelSmall">{views} مشاهدة, </ThemedText>
    </View>
  );
});

export const AnswersCount = memo(
  ({
    answersCount,
  }: {
    answersCount: DetailQuestion["answers_count"];
  }) => {
    return <ThemedText variant="labelSmall">{answersCount} اجابة</ThemedText>;
  }
);

export const SubjectInfo = memo(
  ({
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
  }
);

const TimeInfo = memo(
  ({
    created,
    modified,
    ...props
  }: {
    created: DetailQuestion["created"];
    modified: DetailQuestion["modified"];
  } & ViewProps) => {
    // Pre-compute the formatted date
    const formattedDate = useMemo(() => d(created).fromNow(), [created]);
    
    return (
      <View {...props}>
        <Text variant="labelSmall">{formattedDate}</Text>
      </View>
    );
  }
);

// Optimized Picture component to prevent unnecessary re-renders and load images efficiently
export const PictureOptimized = memo(({ image }: { image?: string }) => {
  const theme = useTheme();
  
  // Memoize styles to prevent recalculation
  const style = useMemo(
    () => ({
      height: 160,
      backgroundColor: theme.colors.surfaceVariant,
      borderRadius: theme.roundness + 6,
    }),
    [theme.colors.surfaceVariant, theme.roundness]
  );

  if (!image) return null;

  return (
    <Pressable onPress={() => alert("bigger")}>
      <Image
        style={style}
        transition={500}
        cachePolicy="memory-disk"
        source={{ uri: image }}
        contentFit="cover"
        placeholder={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==' }}
        recyclingKey={image}
        priority="low"
      />
    </Pressable>
  );
});

// Memoize the Share component
export const ShareMemoized = memo(({ id }: { id: Question["id"] }) => {
  const sheetRef = useSheetRef();

  return (
    <View>
      <ThemedText noInteraction={false} link onPress={() => sheetRef.current?.snapToIndex(0)}>
        {t("share")}
      </ThemedText>
      <ShareContentSheet questionId={id} ref={sheetRef} />
    </View>
  );
});

export default QuestionDetailInfo;
