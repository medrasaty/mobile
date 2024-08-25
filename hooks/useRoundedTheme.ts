import { useTheme } from "react-native-paper";

export default function useRoundedTheme() {
  const theme = useTheme();
  return {
    ...theme,
    roundness: 30,
  };
}
