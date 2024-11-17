import Row from "@/components/Row";
import { Pressable, View, ViewProps } from "react-native";
import { StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";
import UserInfo from "@/components/UserInfo";
import { IconButton, Menu, Surface, useTheme } from "react-native-paper";
import { DEFAULT_CONTAINER_SPACING, debugStyle } from "@/constants/styels";
import { useCallback, useMemo, useRef } from "react";
import { useRouter } from "expo-router";
import { t } from "i18next";
import { Question } from "@/types/forum.types";
import { Ionicons } from "@expo/vector-icons";
import { useVisibleV2 } from "@/hooks/useVisible";
import ReportDialog, {
  BaseReportProps,
} from "@/features/reports/components/ReportDialog";
import ShareContentSheet from "@/features/share/components/ShareContentSheet";
import { useSheetViewRef } from "@/components/SheetView";

type QuestionCardProps = {
  question: Question;
};

const QuestionCard = ({ question }: QuestionCardProps) => {
  const { owner } = question;
  const router = useRouter();
  const theme = useTheme();

  const goToQuestion = useCallback(() => {
    router.push(`/questions/details/` + question.id);
  }, [question.id]);

  return (
    <Pressable onPress={goToQuestion}>
      <Surface
        mode="flat"
        elevation={0}
        style={[styles.container, { borderRadius: theme.roundness }]}
      >
        <Row style={{ gap: 20 }}>
          <View style={{ flex: 1 }}>
            <Title title={question.title} />
            <Subject subject="math" />
            <View style={{ marginTop: 4 }}>
              <Description description={question.text} />
            </View>
            <View style={{ marginTop: 5 }}>
              <Statistics
                views={question.views}
                answers={question.answers_count}
                rating={question.ratings_value}
              />
            </View>
          </View>
          <MoreOptoins question={question} />
        </Row>

        <Row
          alignItems="center"
          style={{ justifyContent: "space-between", marginTop: 10 }}
        >
          <UserInfo
            name={owner.short_name}
            username={owner.username}
            schoolName={owner.family_name}
            avatarUrl={owner.profile_picture}
            avatarSize={45}
          />
        </Row>
      </Surface>
    </Pressable>
  );
};

export const Title = ({ title, ...props }: { title: string } & ViewProps) => {
  return (
    <View {...props}>
      <ThemedText numberOfLines={2} bold variant="titleLarge">
        {title}
      </ThemedText>
    </View>
  );
};

export const Subject = ({
  subject,
  ...props
}: { subject: string } & ViewProps) => {
  const theme = useTheme();
  return (
    <View {...props}>
      <ThemedText color={theme.colors.tertiary} variant="labelSmall">
        {subject}
      </ThemedText>
    </View>
  );
};

export const Description = ({
  description,
  ...props
}: { description: string } & ViewProps) => {
  return (
    <View {...props}>
      <ThemedText
        style={{ opacity: 0.8 }}
        numberOfLines={2}
        variant="bodyMedium"
      >
        {description}
      </ThemedText>
    </View>
  );
};

export const Statistics = ({
  views,
  answers,
  rating,
  style,
  ...props
}: ViewProps & { views: number; answers: number; rating: number }) => {
  return (
    <Row style={[style, { gap: 8 }]} alignItems="center" {...props}>
      <ViewsCount views={views} />
      <AnswersCount answers={answers} />
      <RatingCount rating={rating} />
    </Row>
  );
};

export const Value = ({ value }: { value: number }) => {
  return <ThemedText variant="labelSmall">{value}</ThemedText>;
};

export const ViewsCount = ({ views }: { views: number }) => {
  const theme = useTheme();
  return (
    <Row style={{ gap: 4 }} alignItems="center">
      <Value value={views} />
      <ThemedText variant="labelMedium">{t("views")}</ThemedText>
    </Row>
  );
};

export const AnswersCount = ({ answers }: { answers: number }) => {
  return (
    <Row style={{ gap: 4 }} alignItems="center">
      <Value value={answers} />
      <ThemedText variant="labelMedium">{t("Answers")}</ThemedText>
    </Row>
  );
};

export const RatingCount = ({ rating }: { rating: number }) => {
  const theme = useTheme();
  return (
    <Row style={{ gap: 4 }} alignItems="center">
      <Value value={rating} />
      <RatingIcon rating={rating} />
    </Row>
  );
};

export const RatingIcon = ({ rating }: { rating: number }) => {
  const theme = useTheme();
  const isPositive = useMemo(() => rating >= 0, [rating]);
  return (
    <Ionicons
      color={isPositive ? theme.colors.tertiary : theme.colors.error}
      name={isPositive ? "arrow-up" : "arrow-down"}
      size={12}
    />
  );
};

export const MoreOptoins = ({ question }: { question: Question }) => {
  /**
   * Display a list of options in a menu
   */

  const [visible, show, hide] = useVisibleV2(false);

  return (
    <Menu
      anchor={<IconButton icon={"dots-vertical"} onPress={show} />}
      visible={visible}
      anchorPosition="bottom"
      onDismiss={hide}
    >
      <ReportMenuItem
        contentTypeId={question.contenttype}
        objectId={question.id}
      />
      <ShareQuestionMenuItem />
    </Menu>
  );
};

export const ReportMenuItem = ({
  objectId,
  contentTypeId,
}: BaseReportProps) => {
  const [visible, show, hide] = useVisibleV2(false);
  return (
    <>
      <Menu.Item onPress={show} title="report" />
      <ReportDialog
        visible={visible}
        onDismiss={hide}
        contentTypeId={contentTypeId}
        objectId={objectId}
      />
    </>
  );
};

export const ShareQuestionMenuItem = () => {
  return <></>;
  const sheetRef = useSheetViewRef();
  return (
    <>
      <Menu.Item onPress={() => sheetRef.current?.present()} title="report" />
      <ShareContentSheet solo="Share this content" ref={sheetRef} />
    </>
  );
};

export const ReportQuestion = () => {};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: DEFAULT_CONTAINER_SPACING,
    paddingRight: 0,
    height: 220,
    justifyContent: "space-between",
    margin: 6,
  },
});

export default QuestionCard;
