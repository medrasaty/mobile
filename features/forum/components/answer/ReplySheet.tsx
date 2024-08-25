import Sheet from "@/components/Sheet";
import { ThemedText } from "@/components/ThemedText";
import { Answer, Reply } from "@/types/forum.types";
import {
  BottomSheetFlatList,
  BottomSheetFooter,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useCallback, useMemo } from "react";
import useReplies from "../../hooks/useReplies";
import { useAnswer } from "../../contexts/AnswerContext";
import {
  TextInput,
  useTheme,
  Button,
  IconButton,
  TextInputProps,
  Divider,
} from "react-native-paper";
import { ThemedView } from "@/components/ThemedView";
import useRoundedTheme from "@/hooks/useRoundedTheme";
import { containerMargins, containerPaddings } from "@/constants/styels";
import ReplyCard from "../reply/ReplyCard";
import { View } from "react-native";

type ReplySheetProps = {
  present: boolean;
  onDismiss: () => void;
};

export default function ReplySheet({ present, onDismiss }: ReplySheetProps) {
  const answer = useAnswer();

  const snapPoints = useMemo(() => ["50%", "95%"], []);

  const renderFooter = useCallback((props: any) => {
    return <ReplySheetFooter {...props} />;
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

const ReplySheetContent = ({ answer }: { answer: Answer }) => {
  const { data, isLoading, isError } = useReplies(answer.id);

  return (
    <BottomSheetFlatList
      data={data}
      renderItem={({ item }) => <ReplyCard />}
      contentContainerStyle={{ paddingBottom: 80, ...containerPaddings }}
      overScrollMode={"always"}
    />
  );
};

export const ReplySheetFooter = (props: any) => {
  const theme = useTheme();
  return (
    <BottomSheetFooter
      style={{ backgroundColor: theme.colors.background }}
      {...props}
    >
      <ThemedView
        style={{
          flexDirection: "row",
          gap: 4,
          margin: 4,
          alignItems: "center",
        }}
      >
        <ReplyTextInput style={{ flex: 1 }} />
        <SendReplyButton />
      </ThemedView>
    </BottomSheetFooter>
  );
};

type ReplyTextInputProps = {} & TextInputProps;

export const ReplyTextInput = ({
  inputMode = "text",
  mode = "outlined",
  placeholder = "اكتب رد",
  ...props
}: ReplyTextInputProps) => {
  const roundedTheme = useRoundedTheme();
  return (
    <TextInput
      inputMode={inputMode}
      mode={mode}
      placeholder={placeholder}
      outlineColor={roundedTheme.colors.primary}
      dense
      {...props}
      theme={roundedTheme}
    />
  );
};

type SendReplyButtonProps = {};

export function SendReplyButton({}: SendReplyButtonProps) {
  const roundedTheme = useRoundedTheme();
  return (
    <IconButton
      icon={"send"}
      style={{ direction: "rtl" }}
      mode="contained"
      onPress={() => {}}
      theme={roundedTheme}
    />
  );
}
