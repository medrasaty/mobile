import { ThemedText } from "@/components/ThemedText";
import { ActivityIndicator, ActivityIndicatorProps } from "react-native";
import { Props } from "react-native-image-zoom-viewer/built/image-viewer.type";
import { useTheme } from "react-native-paper";

type LoadingIndicatorProps = ActivityIndicatorProps;

export default function LoadingIndicator({
  color,
  ...props
}: LoadingIndicatorProps) {
  const { colors } = useTheme();
  return <ActivityIndicator color={color ? color : "gray"} {...props} />;
}
