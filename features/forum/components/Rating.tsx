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
    <RatingContainer>
      <RatingButton
        isPressed={currentRating === RatingValue.POSITIVE}
        direction="up"
        onPress={() => {
          onPress(RatingValue.POSITIVE);
        }}
      />
      <RatingValueText value={ratingsValue} />
      <RatingButton
        isPressed={currentRating === RatingValue.NEGATIVE}
        onPress={() => {
          onPress(RatingValue.NEGATIVE);
        }}
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
