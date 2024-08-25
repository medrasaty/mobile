import { ThemedView } from "@/components/ThemedView";
import RatingButton from "./RatingButton";
import { ThemedText } from "@/components/ThemedText";
import { Rating as RatingType, RatingValue } from "@/types/forum.types";
type RatingProps = {
  ratingsValue: number;
  onPositivePressed: () => void;
  onNegativePressed: () => void;
  currentRating: RatingValue;
};

export default function RatingComponent({
  ratingsValue,
  onPositivePressed,
  onNegativePressed,
  currentRating = 0,
}: RatingProps) {
  return (
    <RatingContainer>
      <RatingButton
        isPressed={currentRating === RatingValue.POSITIVE}
        direction="up"
        onPress={onPositivePressed}
      />
      <RatingValueText value={ratingsValue} />
      <RatingButton
        isPressed={currentRating === RatingValue.NEGATIVE}
        onPress={onNegativePressed}
        direction="down"
      />
    </RatingContainer>
  );
}

const RatingContainer = ({ children, ...props }: React.PropsWithChildren) => {
  return (
    <ThemedView {...props} style={{ alignItems: "center", gap: 8 }}>
      {children}
    </ThemedView>
  );
};

const RatingValueText = ({ value }: { value: number }) => {
  return (
    <ThemedText variant="bodyLarge" style={{ fontWeight: "bold" }}>
      {value}
    </ThemedText>
  );
};
