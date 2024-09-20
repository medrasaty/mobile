import LoadingDialog from "@/components/LoadingDialog";
import { ThemedView } from "@/components/ThemedView";
import { containerMargins, containerPaddings } from "@/constants/styels";
import { DetailQuestion } from "@/types/forum.types";
import { BottomSheetFooter, BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useMemo, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import {
  Button,
  TextInput,
  TextInputProps,
  useTheme,
} from "react-native-paper";
import useCreateAnswerMutation from "../../hooks/useCreateAnswerMutation";
import SheetView from "@/components/SheetView";

export type CreateAnswerSheetProps = {
  question: DetailQuestion;
};
export const CreateAnswerSheet = React.forwardRef<
  typeof SheetView,
  CreateAnswerSheetProps
>(({ question }, ref) => {
  /**
   * Allow user to answer question
   */
  const snapPoints = useMemo(() => ["50%", "75%", "95%"], []);
  const [answerText, setAnswerText] = useState<string>("");

  const { mutate: createAnswer, ...rest } = useCreateAnswerMutation();

  const handleSubmit = () => {
    const newAnswer = { question: question.id, text: answerText };
    createAnswer(newAnswer, { onSuccess: () => reset() });
  };

  const reset = () => {
    setAnswerText("");
  };

  const renderFooter = (props) => {
    return (
      <BottomSheetFooter {...props} bottomInset={8} style={containerPaddings}>
        <Actions onCancle={reset} onSubmit={handleSubmit} />
      </BottomSheetFooter>
    );
  };

  return (
    <SheetView
      ref={ref}
      snapPoints={snapPoints}
      onDismiss={() => reset()}
      footerComponent={renderFooter}
    >
      <BottomSheetView style={styles.sheetContainer}>
        <AnswerTextInput
          value={answerText}
          onChangeText={(text) => setAnswerText(text)}
        />
      </BottomSheetView>
      <LoadingDialog visible={rest.isPending} message="جاري الإرسال..." />
    </SheetView>
  );
});

export type AnswerTextInputProps = {} & TextInputProps;

export const AnswerTextInput = ({ ...props }: AnswerTextInputProps) => {
  const theme = useTheme();
  const Attachment = (
    <TextInput.Icon icon="attachment" onPress={() => alert("soloishere")} />
  );

  return (
    <View
      style={{
        flexDirection: "row",
        gap: 6,
      }}
    >
      <TextInput
        theme={{ ...theme, roundness: 16 }}
        multiline
        keyboardType="default"
        numberOfLines={6}
        style={{ maxHeight: 200, flex: 1 }}
        mode="outlined"
        label={"الإجابة"}
        left={Attachment}
        {...props}
      />
    </View>
  );
};

type ActionsProps = {
  onCancle: () => void;
  onSubmit: () => void;
  submitDisabled?: boolean;
};

export const Actions = ({
  onCancle,
  onSubmit,
  submitDisabled,
}: ActionsProps) => {
  return (
    <ThemedView style={styles.actionsContainer}>
      <Button
        style={{ flex: 1 }}
        disabled={submitDisabled}
        onPress={onSubmit}
        mode="contained"
      >
        ارسال
      </Button>
      <Button style={{ flex: 1 }} onPress={onCancle} mode="text">
        الغاء
      </Button>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  sheetContainer: {
    ...containerMargins,
    gap: 10,
    paddingBottom: 10,
  },
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
