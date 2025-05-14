import { useTheme } from "react-native-paper";

export const RatingButtonSize = 37;
export const ACTION_BUTTON_CONTAINER_WIDTH = 40;

export default function useActionsProps() {
  const theme = useTheme();

  return {
    size: RatingButtonSize / 1.7, // half RatingButton size
    color: theme.colors.primary,
  };
}
