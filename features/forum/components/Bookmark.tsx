import useActionsProps from "../hooks/useIconProps";
import { MaterialCommunityIcons } from "@expo/vector-icons";

type BookmarkProps = {
  onPress: () => void;
  isBookmarked?: boolean;
};

export default function Bookmark({
  isBookmarked = false,
  onPress,
}: BookmarkProps) {
  const props = useActionsProps();
  return (
    <MaterialCommunityIcons
      {...props}
      name={isBookmarked ? "bookmark" : "bookmark-outline"}
      onPress={onPress}
    />
  );
}
