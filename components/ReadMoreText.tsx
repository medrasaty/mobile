import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "./ThemedView";
import { useTheme } from "react-native-paper";
import useReadMoreText from "@/features/forum/hooks/useReadMoreText";
import { debugStyle } from "@/constants/styels";

type ReadMoreTextProps = {
  text: string;
  max_length?: number;
  trailing?: string;
};

const DEFAULT_MAX_LENGTH = 250;

export default function ReadMoreText({
  text,
  max_length = DEFAULT_MAX_LENGTH,
  trailing = "...",
}: ReadMoreTextProps) {
  const { isReadMore, modifiedText, toggleIsReadMore, isOverFlow } =
    useReadMoreText({
      defaultText: text,
      max_length: max_length,
      trailing: trailing,
    });

  const theme = useTheme();

  return (
    <ThemedView
      style={{ borderWidth: 0.3, borderColor: theme.colors.background }}
    >
      <ThemedText variant="bodyMedium">
        {modifiedText}
        {isOverFlow && (
          <ReadMore
            text={isReadMore ? " المزيد " : " أقل"}
            onPress={toggleIsReadMore}
          />
        )}
      </ThemedText>
    </ThemedView>
  );
}

export const ReadMore = ({
  onPress,
  text = "المزيد",
}: {
  onPress: () => void;
  text?: string;
}) => {
  const theme = useTheme();
  return (
    <ThemedText
      color={theme.colors.primary}
      variant="labelSmall"
      onPress={onPress}
    >
      {text}
    </ThemedText>
  );
};
