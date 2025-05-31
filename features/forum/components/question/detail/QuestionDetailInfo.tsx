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
import { t } from "i18next";
import { memo, useMemo, useState, useEffect } from "react";
import { ViewProps, Image, Dimensions } from "react-native";
import { useTheme } from "react-native-paper";
import { ResizableImage } from "@components/ResizableImage";

// Module-level cache for image dimensions
const imageDimensionsCache: Record<string, { width: number; height: number }> =
  {};

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
          {hasImage && (
            <PictureOptimized image={question.picture || undefined} />
          )}

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
  ({ tags, style, ...props }: { tags: DetailQuestion["tags"] } & ViewProps) => {
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
  ({ answersCount }: { answersCount: DetailQuestion["answers_count"] }) => {
    return <ThemedText variant="labelSmall">{answersCount} اجابة</ThemedText>;
  }
);

export const SubjectInfo = memo(
  ({ subject }: { subject: DetailQuestion["subject"] }) => {
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
  const [imageHeight, setImageHeight] = useState(160); // Default height
  const [naturalImageSize, setNaturalImageSize] = useState<{
    width: number;
    height: number;
  } | null>(null);

  // Effect 1: Fetch and cache natural image dimensions
  useEffect(() => {
    if (!image) {
      setNaturalImageSize(null);
      setImageHeight(160); // Reset to default if no image
      return;
    }

    if (imageDimensionsCache[image]) {
      setNaturalImageSize(imageDimensionsCache[image]);
    } else {
      Image.getSize(
        image,
        (width, height) => {
          if (width > 0 && height > 0) {
            const dimensions = { width, height };
            imageDimensionsCache[image] = dimensions;
            setNaturalImageSize(dimensions);
          } else {
            // Invalid dimensions, treat as error
            setNaturalImageSize(null);
            console.error(
              `Failed to get valid image size for ${image}: width or height is 0`
            );
          }
        },
        (error) => {
          console.error(`Failed to get image size for ${image}: ${error}`);
          setNaturalImageSize(null); // Indicate failure
        }
      );
    }
  }, [image]); // Only re-run if the image URI changes

  // Effect 2: Calculate and set display height when natural dimensions or screen width change
  useEffect(() => {
    const calculateHeight = (currentScreenWidth: number) => {
      if (naturalImageSize && naturalImageSize.width > 0) {
        const calculatedHeight =
          naturalImageSize.height *
          (currentScreenWidth / naturalImageSize.width);
        // Apply max height and ensure it's a positive number
        setImageHeight(Math.max(1, Math.min(calculatedHeight, 400)));
      } else {
        setImageHeight(160); // Fallback or default height
      }
    };

    // Initial calculation with current screen width
    calculateHeight(Dimensions.get("window").width);

    // Subscribe to dimension changes (e.g., orientation change)
    const handleChange = ({
      window,
    }: {
      window: {
        width: number;
        height: number;
        scale: number;
        fontScale: number;
      };
    }) => {
      calculateHeight(window.width);
    };

    const subscription = Dimensions.addEventListener("change", handleChange);

    return () => {
      subscription?.remove(); // Clean up listener
    };
  }, [naturalImageSize]); // Re-run if naturalImageSize changes (and for initial setup)

  // Memoize styles to prevent recalculation
  const style = useMemo(
    () => ({
      height: 160,
      backgroundColor: theme.colors.surfaceVariant,
      borderRadius: theme.roundness + 6,
    }),
    [theme.colors.surfaceVariant, theme.roundness, imageHeight]
  );

  if (!image) return null;

  return (
    <ResizableImage
      uri={image}
      imageProps={{
        style: style,
        transition: 500,
        cachePolicy: "memory-disk",
        contentFit: "contain",
        recyclingKey: image,
        priority: "low",
      }}
    />
  );
});

// Memoize the Share component
export const ShareMemoized = memo(({ id }: { id: Question["id"] }) => {
  const sheetRef = useSheetRef();

  return (
    <View>
      <ThemedText
        noInteraction={false}
        link
        onPress={() => sheetRef.current?.snapToIndex(0)}
      >
        {t("share")}
      </ThemedText>
      <ShareContentSheet questionId={id} ref={sheetRef} />
    </View>
  );
});

export default QuestionDetailInfo;
