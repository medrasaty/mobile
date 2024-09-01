import LoadingDialog from "@/components/LoadingDialog";
import Sheet from "@/components/Sheet";
import { containerMargins } from "@/constants/styels";
import { DetailQuestion } from "@/types/forum.types";
import {
  BottomSheetFooter,
  BottomSheetFooterProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useEffect, useMemo, useState } from "react";
import { Keyboard, View } from "react-native";
import {
  Button,
  IconButton,
  TextInput,
  TextInputProps,
  useTheme,
} from "react-native-paper";
import useCreateAnswerMutation from "../../hooks/useCreateAnswerMutation";
import { debugStyle } from "@/constants/styels";

export type CreateAnswerSheetProps = {
  question: DetailQuestion;
  present: boolean;
  hide: () => void;
};

export default function CreateAnswerSheet({
  question,
  present,
  hide,
}: CreateAnswerSheetProps) {
  /**
   * Allow user to answer question
   */
  const snapPoints = useMemo(() => ["50%", "75%", "95%"], []);
  const [answerText, setAnswerText] = useState<string>("");

  const {
    mutate: createAnswer,
    isPending,
    isSuccess,
  } = useCreateAnswerMutation();

  useEffect(() => {
    // hide sheet when mutation succeed
    hide();
  }, [isSuccess]);

  const renderFooter = (props: BottomSheetFooterProps) => {
    const buttonDisabled = useMemo(() => {
      return answerText.trim().length === 0;
    }, [answerText]);

    const handleSubmit = () => {
      Keyboard.dismiss();
      const newAnswer = { question: question.id, text: answerText };
      createAnswer(newAnswer);
    };
    return (
      <BottomSheetFooter bottomInset={8} {...props}>
        <View
          style={{
            ...containerMargins,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Button
            style={{ flex: 1 }}
            disabled={buttonDisabled}
            onPress={handleSubmit}
            mode="contained"
          >
            ارسال
          </Button>
        </View>
      </BottomSheetFooter>
    );
  };

  return (
    <Sheet
      snapPoints={snapPoints}
      footerComponent={renderFooter}
      present={present}
      onDismiss={hide}
    >
      <BottomSheetView style={containerMargins}>
        <AnswerTextInput
          value={answerText}
          onChangeText={(text) => setAnswerText(text)}
        />
        <View style={{ flexDirection: "row" }}></View>
      </BottomSheetView>
      <LoadingDialog visible={isPending} message="جاري الإرسال..." />
    </Sheet>
  );
}

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
