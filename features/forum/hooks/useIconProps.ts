import { useTheme } from "react-native-paper";

export const RatingButtonSize = 37;

export default function useActionsProps() {
  const theme = useTheme();

  return {
    size: RatingButtonSize / 2, // half RatingButton size
    color: theme.colors.primary,
  };
}
