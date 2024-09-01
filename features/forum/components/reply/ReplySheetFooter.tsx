import { Keyboard, StyleSheet } from "react-native";
import { Answer } from "@/types/forum.types";
import {
  BottomSheetFooter,
  BottomSheetFooterProps,
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

export type ReplySheetFooterProps = {
  answer: Answer;
} & BottomSheetFooterProps;

export const ReplySheetFooter = ({
  answer,
  ...props
}: ReplySheetFooterProps) => {
  const theme = useTheme();
  const [replyText, setReplyText] = useState<string>("");

  const isValidReplyText = useMemo(
    () => replyText.trim().length !== 0,
    [replyText]
  );

  const { mutate, isPending, isSuccess, isError } = useCreateReplyMutation();
  const queryClient = useQueryClient();

  useEffect(() => {
    if (isSuccess) {
      setReplyText("");
    }
  }, [isPending]);

  const handleSubmitReply = () => {
    if (isValidReplyText)
      mutate(
        { answer: answer.id, text: replyText },
        {
          onSuccess: (data, variables) => {
            queryClient.invalidateQueries({
              queryKey: ["answers", answer.question],
            });
          },
        }
      );
  };

  return (
    <>
      <BottomSheetFooter
        style={{ backgroundColor: theme.colors.background }}
        {...props}
      >
        <ThemedView style={styles.container}>
          <ReplyTextInput
            disabled={isPending}
            value={replyText}
            onChangeText={(text) => setReplyText(text)}
            style={{ flex: 1 }}
          />
          <SubmitReplyButton
            disabled={isValidReplyText === false || isPending}
            onSubmit={handleSubmitReply}
          />
        </ThemedView>
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
  return (
    <TextInput
      inputMode={inputMode}
      mode={mode}
      placeholder={placeholder}
      dense
      maxLength={150}
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
  disabled = true,
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
