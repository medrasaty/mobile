import { containerPaddings, debugStyle } from "@/constants/styels";
import { Answer } from "@/types/forum.types";
import { useTheme, Surface, MD2LightTheme } from "react-native-paper";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { View } from "react-native";
import RatingButton from "@/features/forum/components/RatingButton";
import { memo, useEffect, useMemo, useState } from "react";
import { Container } from "@/components/styled";
import { QUESTION_LAYOUT_GAP } from "../question/detail/QuestionDetail";
import Rating from "../Rating";
import AnswerText from "./AnswerText";

export default function AnswerCard({ answer }: { answer: Answer }) {
  const theme = useTheme();

  return (
    <Container style={{ marginBottom: 10, marginTop: 10 }}>
      <View>
        <View style={{ flexDirection: "row", gap: QUESTION_LAYOUT_GAP }}>
          <Actions answer={answer} />
          <Info answer={answer} />
        </View>
      </View>
    </Container>
  );
}

const Actions = ({ answer }: { answer: Answer }) => {
  return (
    <ThemedView>
      <RatingActions answer={answer} />
    </ThemedView>
  );
};

const RatingActions = memo(({ answer }: { answer: Answer }) => {
  return (
    <Rating
      value={8}
      onPositivePressed={() => alert("solo is POSITIVE")}
      onNegativePressed={() => alert("solo is NEGATIVE")}
    />
  );
});

const Info = ({ answer }: { answer: Answer }) => {
  return (
    <ThemedView style={{ flex: 1 }}>
      <AnswerText defaultText="كلا في قديم الزمان، في بلاد بعيدة، كان هناك قرية صغيرة تعيش في سلام وهدوء. كانت القرية محاطة بالجبال العالية والغابات الكثيفة، وكان سكانها يعيشون حياة بسيطة ومتواضعة. كانوا يزرعون الحقول ويربون الحيوانات، ويعيشون على ما تنتجه الأراتهم إلى الأبد.كلا في قديم الزمان، في بلاد بعيدة، كان هناك قرية صغيرة تعيش في سلام وهدوء. كانت القرية محاطة بالجبال العالية والغابات الكثيفة، وكان سكانها يعيشون حياة بسيطة ومتواضعة. كانوا يزرعون الحقول ويربون الحيوانات، ويعيشون على ما تنتجه الأراتهم إلى الأبد.  " />
    </ThemedView>
  );
};
