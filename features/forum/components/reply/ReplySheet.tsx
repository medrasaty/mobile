import Sheet from "@/components/Sheet";
import { ThemedText } from "@/components/ThemedText";
import { Answer, Reply } from "@/types/forum.types";
import {
  BottomSheetFlatList,
  BottomSheetFooterProps,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import { forwardRef, useCallback, useEffect, useMemo, useRef } from "react";
import useReplies from "../../hooks/useReplies";
import { useTheme } from "react-native-paper";
import { ThemedView } from "@/components/ThemedView";
import { containerPaddings } from "@/constants/styels";
import ReplyCard from "../reply/ReplyCard";
import LoadingIndicator from "@/components/LoadingIndicator";
import { ReplySheetFooter } from "./ReplySheetFooter";
import SheetView from "@/components/SheetView";
import { BottomSheetFlatListProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetScrollable/types";
import { useLocalSearchParams } from "expo-router";
import { FlatList } from "react-native";

type ReplySheetProps = {
  answer: Answer;
};

const ReplySheet = forwardRef<BottomSheetModal, ReplySheetProps>(
  ({ answer }, ref) => {
    const snapPoints = useMemo(() => ["50%", "95%"], []);

    const renderFooter = useCallback((props: BottomSheetFooterProps) => {
      return <ReplySheetFooter answer={answer} {...props} />;
    }, []);

    return (
      <SheetView
        ref={ref}
        footerComponent={renderFooter}
        snapPoints={snapPoints}
      >
        <ReplySheetContent answer={answer} />
      </SheetView>
    );
  }
);

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

function useScrollToReplyEffect({
  replies,
  listRef,
}: {
  replies: Reply[];
  listRef: any;
}) {
  const params = useLocalSearchParams<{ replyId?: string }>();

  // optemize the calculation of the index by using useMemo
  const replyIndex = useMemo(() => {
    for (let i = 0; i < replies.length; i++) {
      if (replies[i].id === params.replyId) {
        return i;
      }
    }
  }, [replies, params.replyId]);

  useEffect(() => {
    if (listRef.current && params.replyId) {
      // scroll to the reply using its index
      if (replyIndex !== -1) {
        listRef.current?.scrollToIndex({
          index: replyIndex,
          animated: true,
          viewPosition: 1,
        });
      }
    }
  }, [replies, params.replyId]);
}

const ReplySheetContent = ({ answer }: { answer: Answer }) => {
  const { data, isLoading } = useReplies(answer.id);
  const listRef = useRef<any>();
  useScrollToReplyEffect({ replies: data ?? [], listRef });

  if (answer.replies_count === 0) return <EmptySheet />;
  if (isLoading) return <ReplySheetLoading />;

  if (data)
    return (
      <BottomSheetFlatList
        ref={listRef}
        data={data}
        renderItem={({ item }) => <ReplyCard key={item.id} reply={item} />}
        contentContainerStyle={{ paddingBottom: 80, ...containerPaddings }}
        overScrollMode={"always"}
      />
    );
};

export default ReplySheet;
