import { ThemedText } from "@/components/ThemedText";
import { containerPaddings } from "@/constants/styels";
import { Reply } from "@/types/forum.types";
import { Answer } from "@forum/answers/types";
import BottomSheet, {
  BottomSheetFlashList,
  BottomSheetFooterProps
} from "@gorhom/bottom-sheet";
import { useLocalSearchParams } from "expo-router";
import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ActivityIndicator, useTheme } from "react-native-paper";
import useReplies from "../../hooks/useReplies";
import ReplyCard from "../reply/ReplyCard";
import { ReplySheetFooter } from "./ReplySheetFooter";
import { Sheet } from "@components/Sheet";
import { useWindowDimensions } from "react-native";
import View from "@components/styled/View";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type ReplySheetProps = {
  answer: Answer;
};

const ReplySheet = forwardRef<BottomSheet, ReplySheetProps>(
  ({ answer }, ref) => {
    const height = useWindowDimensions().height;
    const theme = useTheme();
    const snapPoints = useMemo(() => [height * 0.5, height * 0.9], [height]);

    const renderFooter = useCallback((props: BottomSheetFooterProps) => {
      return <ReplySheetFooter answer={answer} {...props} />;
    }, [answer]);

    return (
      <Sheet
        ref={ref}
        footerComponent={renderFooter}
        enableDynamicSizing={false}
        enablePanDownToClose={true}
        enableOverDrag={false}
        android_keyboardInputMode="adjustResize"
        snapPoints={snapPoints}
      >
        <ReplySheetContent answer={answer} />
      </Sheet>
    );
  }
);

export const ReplySheetLoading = () => {
  const theme = useTheme();
  return (
    <View style={{ marginTop: 40, alignItems: "center", gap: 12 }}>
      <ActivityIndicator animating={true} color={theme.colors.primary} size="large" />
      <ThemedText variant="labelMedium">جاري تحميل الردود...</ThemedText>
    </View>
  );
};

const EmptySheet = () => {
  const theme = useTheme();
  return (
    <View  style={{ marginTop: 40, alignItems: "center", gap: 16, backgroundColor: "transparent" }}>
      <MaterialCommunityIcons 
        name="message-text-outline" 
        size={48} 
        color={theme.colors.outline}
      />
      <ThemedText color="gray" variant="bodyMedium">
        لا توجد ردود على هذه الإجابة بعد.
      </ThemedText>
      <ThemedText 
        color="gray" 
        variant="labelMedium"
        style={{ textAlign: "center", paddingHorizontal: 24 }}
      >
        كن أول من يضيف رداً باستخدام مربع النص أدناه.
      </ThemedText>
    </View>
  );
};

const ErrorSheet = () => {
  const theme = useTheme();
  return (
    <View style={{ marginTop: 40, alignItems: "center", gap: 16 }}>
      <MaterialCommunityIcons 
        name="alert-circle-outline" 
        size={48} 
        color={theme.colors.error}
      />
      <ThemedText color="error" variant="bodyMedium">
        حدث خطأ أثناء تحميل الردود
      </ThemedText>
      <ThemedText 
        color="gray" 
        variant="labelMedium"
        style={{ textAlign: "center", paddingHorizontal: 24 }}
      >
        يرجى التحقق من اتصالك بالإنترنت والمحاولة مرة أخرى.
      </ThemedText>
    </View>
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
  const [hasScrolledToReply, setHasScrolledToReply] = useState(false);

  // optimize the calculation of the index by using useMemo
  const replyIndex = useMemo(() => {
    if (!params.replyId) return -1;
    
    for (let i = 0; i < replies.length; i++) {
      if (replies[i].id === params.replyId) {
        return i;
      }
    }
    return -1;
  }, [replies, params.replyId]);

  useEffect(() => {
    if (listRef.current && params.replyId && !hasScrolledToReply && replyIndex !== -1) {
      // scroll to the reply using its index
      listRef.current?.scrollToIndex({
        index: replyIndex,
        animated: true,
        viewPosition: 0.5,
      });
      setHasScrolledToReply(true);
    }
  }, [replies, params.replyId, replyIndex, hasScrolledToReply]);
}

const ReplySheetContent = ({ answer }: { answer: Answer }) => {
  const { data, isLoading, isError, refetch } = useReplies(answer.id);
  const listRef = useRef<any>();
  const [isRefreshing, setIsRefreshing] = useState(false);
  useScrollToReplyEffect({ replies: data ?? [], listRef });

  const handleRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await refetch();
    setIsRefreshing(false);
  }, [refetch]);

  if (isLoading) return <ReplySheetLoading />;
  if (isError) return <ErrorSheet />;
  if (!data || data.length === 0) return <EmptySheet />;

  return (
    <BottomSheetFlashList
      ref={listRef}
      data={data}
      renderItem={({ item }) => <ReplyCard key={item.id} reply={item} />}
      estimatedItemSize={100}
      contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 80, ...containerPaddings }}
      refreshing={isRefreshing}
      onRefresh={handleRefresh}
    />
  );
};

export default ReplySheet;
