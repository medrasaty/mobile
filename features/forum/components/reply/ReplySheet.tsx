import Sheet from "@/components/Sheet";
import { ThemedText } from "@/components/ThemedText";
import { Answer } from "@/types/forum.types";
import {
  BottomSheetFlatList,
  BottomSheetFooterProps,
} from "@gorhom/bottom-sheet";
import { useCallback, useMemo } from "react";
import useReplies from "../../hooks/useReplies";
import { useTheme } from "react-native-paper";
import { ThemedView } from "@/components/ThemedView";
import { containerPaddings } from "@/constants/styels";
import ReplyCard from "../reply/ReplyCard";
import LoadingIndicator from "@/components/LoadingIndicator";
import { ReplySheetFooter } from "./ReplySheetFooter";

type ReplySheetProps = {
  answer: Answer;
  present: boolean;
  onDismiss: () => void;
};

export default function ReplySheet({
  answer,
  present,
  onDismiss,
}: ReplySheetProps) {
  const snapPoints = useMemo(() => ["50%", "95%"], []);

  const renderFooter = useCallback((props: BottomSheetFooterProps) => {
    return <ReplySheetFooter answer={answer} {...props} />;
  }, []);

  return (
    <Sheet
      footerComponent={renderFooter}
      snapPoints={snapPoints}
      present={present}
      onDismiss={onDismiss}
    >
      <ReplySheetContent answer={answer} />
    </Sheet>
  );
}

export const ReplySheetLoading = () => {
  const theme = useTheme();
  return (
    <ThemedView style={{ marginTop: 30, alignItems: "center", gap: 5 }}>
      <LoadingIndicator size={"small"} />
      <ThemedText variant="labelMedium">جاري تجميل الردود...</ThemedText>
    </ThemedView>
  );
};
const EmptySheet = () => {
  return (
    <ThemedView style={{ marginTop: 30, alignItems: "center" }}>
      <ThemedText color="gray" variant="bodyMedium">
        لا ردود.
      </ThemedText>
    </ThemedView>
  );
};

const ReplySheetContent = ({ answer }: { answer: Answer }) => {
  const { data, isLoading, isError } = useReplies(answer.id);

  if (answer.replies_count === 0) return <EmptySheet />;
  if (isLoading) return <ReplySheetLoading />;

  if (data)
    return (
      <BottomSheetFlatList
        data={data}
        renderItem={({ item }) => <ReplyCard key={item.id} reply={item} />}
        contentContainerStyle={{ paddingBottom: 80, ...containerPaddings }}
        overScrollMode={"always"}
      />
    );
};
