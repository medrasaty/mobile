import { ThemedView } from "@/components/ThemedView";
import RatingButton from "./RatingButton";
import { ThemedText } from "@/components/ThemedText";
import { RatingValue } from "@/types/forum.types";
type RatingProps = {
  ratingsValue: number;
  positiveLoading?: boolean;
  negativeLoading?: boolean;
  onPress: (value: RatingValue) => void;
  currentRating: RatingValue;
};

export default function RatingComponent({
  ratingsValue,
  onPress,
  currentRating = 0,
}: RatingProps) {
  return (
    <ThemedView style={{ width: 40 }}>
      <ThemedView style={{ alignItems: "center" }}>
        <RatingButton
          isPressed={currentRating === RatingValue.POSITIVE}
          direction="up"
          onPress={() => {
            onPress(RatingValue.POSITIVE);
          }}
        />
      </ThemedView>
      <ThemedView style={{ alignItems: "center", marginVertical: 8 }}>
        <ThemedText variant="bodyLarge" style={{ fontWeight: "bold" }}>
          {ratingsValue}
        </ThemedText>
      </ThemedView>
      <ThemedView style={{ alignItems: "center" }}>
        <RatingButton
          isPressed={currentRating === RatingValue.NEGATIVE}
          onPress={() => {
            onPress(RatingValue.NEGATIVE);
          }}
          direction="down"
        />
      </ThemedView>
    </ThemedView>
  );
}