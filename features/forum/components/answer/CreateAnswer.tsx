import Sheet from "@/components/Sheet";
import { ThemedText } from "@/components/ThemedText";
import { Container } from "@/components/styled";
import { containerMargins } from "@/constants/styels";
import {
  BottomSheetFooter,
  BottomSheetFooterProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useMemo, useState } from "react";
import { Button, FAB, TextInput, useTheme } from "react-native-paper";
import CreateAnswerSheet from "./CreateAnswerSheet";
import { DetailQuestion } from "@/types/forum.types";

export default function CreateAnswer({
  question,
}: {
  question: DetailQuestion;
}) {
  const [present, setPresent] = useState<boolean>(false);
  const show = () => setPresent(true);
  const hide = () => setPresent(false);

  return (
    <>
      <CreateAnswerFAB onPress={show} />
      <CreateAnswerSheet question={question} present={present} hide={hide} />
    </>
  );
}

export const CreateAnswerFAB = ({ onPress }: { onPress: () => void }) => {
  return (
    <>
      <FAB
        onPress={onPress}
        icon="plus"
        size="medium"
        variant="secondary"
        style={{
          position: "absolute",
          margin: 24,
          right: 0,
          bottom: 0,
        }}
      />
    </>
  );
};
