import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import useActionsProps from "../hooks/useIconProps";

export type BaseIconProps = {
  onPress: () => void;
};

type BookmarkProps = {
  isBookmarked?: boolean;
} & BaseIconProps;

export function Bookmark({ isBookmarked = false, onPress }: BookmarkProps) {
  const props = useActionsProps();
  return (
    <MaterialCommunityIcons
      {...props}
      name={isBookmarked ? "bookmark" : "bookmark-outline"}
      onPress={onPress}
    />
  );
}

export type ReplyIconProps = {
  repliesCount: number;
} & BaseIconProps;

export function ReplyIcon({ onPress, repliesCount }: ReplyIconProps) {
  const props = useActionsProps();
  return (
    <ThemedView style={{ alignItems: "center" }}>
      <MaterialCommunityIcons
        onPress={onPress}
        name="comment-text-outline"
        {...props}
      />
      <ThemedText variant="labelSmall" color={props.color}>
        {repliesCount}
      </ThemedText>
    </ThemedView>
  );
}

export const RegisterIcon = ({
  isRegistered,
  onPress,
}: {
  isRegistered: boolean | null;
  onPress: () => void;
}) => {
  const props = useActionsProps();
  const iconName = isRegistered ? "bell" : "bell-outline";
  return (
    <MaterialCommunityIcons onPress={onPress} name={iconName} {...props} />
  );
};
