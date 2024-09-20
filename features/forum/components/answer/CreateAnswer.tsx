import { useState } from "react";
import { FAB } from "react-native-paper";
import { CreateAnswerSheet } from "./CreateAnswerSheet";
import { DetailQuestion } from "@/types/forum.types";
import { useSheetViewRef } from "@/components/SheetView";

export default function CreateAnswer({
  question,
}: {
  question: DetailQuestion;
}) {
  const sheetRef = useSheetViewRef();
  const show = () => sheetRef.current?.present();

  return (
    <>
      <CreateAnswerFAB onPress={show} />
      <CreateAnswerSheet question={question} ref={sheetRef} />
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
