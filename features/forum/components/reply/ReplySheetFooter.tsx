import { Keyboard, StyleSheet } from "react-native";
import { Answer } from "@features/forum/answers/types";
import {
  BottomSheetFooter,
  BottomSheetFooterProps,
  useBottomSheet,
} from "@gorhom/bottom-sheet";
import { useEffect, useMemo, useState } from "react";
import {
  TextInput,
  useTheme,
  IconButton,
  TextInputProps,
  IconButtonProps,
} from "react-native-paper";
import { ThemedView } from "@/components/ThemedView";
import useRoundedTheme from "@/hooks/useRoundedTheme";
import useCreateReplyMutation from "../../hooks/useCreateReplyMutation";
import { useQueryClient } from "@tanstack/react-query";
import View from "@components/styled/View";

export type ReplySheetFooterProps = {
  answer: Answer;
} & BottomSheetFooterProps;

export const ReplySheetFooter = ({
  answer,
  ...props
}: ReplySheetFooterProps) => {
  const [replyText, setReplyText] = useState<string>("");

  const isValidReplyText = useMemo(
    () => replyText.trim().length !== 0,
    [replyText]
  );

  const { expand } = useBottomSheet();

  const { mutate, isPending } = useCreateReplyMutation();

  const handleSubmitReply = () => {
    if (isValidReplyText)
      mutate(
        { answer: answer.id, text: replyText },
        {
          onSuccess: () => {
            setReplyText("");
          },
        }
      );
  };

  return (
    <>
      <BottomSheetFooter {...props} >
        <View style={styles.container}>
          <ReplyTextInput
            onFocus={() => expand()}
            disabled={isPending}
            value={replyText}
            onChangeText={(text) => setReplyText(text)}
            style={{ flex: 1 }}
          />
          <SubmitReplyButton
            disabled={!isValidReplyText || isPending}
            onSubmit={handleSubmitReply}
          />
        </View>
      </BottomSheetFooter>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 4,
    margin: 4,
    alignItems: "center",
    backgroundColor: "transparent",
  },
});

type ReplyTextInputProps = {} & TextInputProps;

export const ReplyTextInput = ({
  inputMode = "text",
  mode = "outlined",
  placeholder = "رد",
  ...props
}: ReplyTextInputProps) => {
  const roundedTheme = useRoundedTheme();
  const maxLength = useMemo(() => 150, []);
  return (
    <TextInput
      inputMode={inputMode}
      mode={mode}
      placeholder={placeholder}
      dense
      right={
        props.value && props.value.length > 0 
          ? <TextInput.Affix text={`${props.value.length}/${maxLength}`} />
          : null
      }
      maxLength={maxLength}
      {...props}
      theme={roundedTheme}
    />
  );
};

type SendReplyButtonProps = {
  onSubmit: () => void;
  disabled?: IconButtonProps["disabled"];
};

export function SubmitReplyButton({
  onSubmit,
  disabled = false,
}: SendReplyButtonProps) {
  const roundedTheme = useRoundedTheme();
  return (
    <IconButton
      icon={"plus"}
      mode="contained-tonal"
      theme={roundedTheme}
      onPress={onSubmit}
      disabled={disabled}
    />
  );
}
