import { ActivityIndicator, ActivityIndicatorProps } from "react-native";
import { useTheme } from "react-native-paper";

type LoadingIndicatorProps = ActivityIndicatorProps;

export default function LoadingIndicator({
  color,
  ...props
}: LoadingIndicatorProps) {
  const { colors } = useTheme();
  return (
    <ActivityIndicator color={color ? color : colors.primary} {...props} />
  );
}
