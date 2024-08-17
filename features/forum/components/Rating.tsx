import { ThemedView } from "@/components/ThemedView";
import RatingButton from "./RatingButton";
import { ThemedText } from "@/components/ThemedText";
import { Rating as RatingType } from "@/types/forum.types";
type RatingProps = {
  value: number;
  onPositivePressed: () => void;
  onNegativePressed: () => void;
  positivePressed?: boolean;
  negativePressed?: boolean;
};

export default function RatingComponent({
  value,
  onPositivePressed,
  onNegativePressed,
  positivePressed = false,
  negativePressed = false,
}: RatingProps) {
  return (
    <RatingContainer>
      <RatingButton
        isPressed={positivePressed}
        direction="up"
        onPress={onPositivePressed}
      />
      <RatingValue value={8} />
      <RatingButton
        isPressed={negativePressed}
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

const RatingValue = ({ value }: { value: number }) => {
  return (
    <ThemedText variant="bodyLarge" style={{ fontWeight: "bold" }}>
      {value}
    </ThemedText>
  );
};
