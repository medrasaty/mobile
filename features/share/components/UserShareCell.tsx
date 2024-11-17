import { ThemedText } from "@/components/ThemedText";
import { UserAvatarV2 } from "@/components/UserAvatar";
import { FriendUser } from "@/features/friendship/types";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Pressable, PressableProps, View } from "react-native";
import { useTheme } from "react-native-paper";
import { useShareContext } from "../contexts/ShareContentSheetContext";
import { useMemo } from "react";
import { d } from "@/lib/dates";

type UserShareCellProps = {
  user: FriendUser;
} & PressableProps;

const UserShareCell = ({ user, ...props }: UserShareCellProps) => {
  const theme = useTheme();
  const { sharedWith, addShare, removeShare } = useShareContext();
  const isSelected = useMemo(
    () => (sharedWith.find((id) => id === user.id) ? true : false),
    [sharedWith]
  );
  const handlePress = () => {
    // if this user is selected, remove it , add it otherwise
    isSelected ? removeShare(user.id) : addShare(user.id);
  };
  console.log(isSelected);

  return (
    <Pressable onPress={handlePress} {...props}>
      <UserAvatarV2 user={user} size={85} />
      <ThemedText bold style={{ letterSpacing: 1 }} variant="titleMedium">
        {user.short_name}
      </ThemedText>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
        <MaterialCommunityIcons
          size={12}
          name="school"
          color={theme.colors.primary}
        />
        <ThemedText
          color="gray"
          style={{
            width: "auto",
            alignItems: "center",
            fontSize: 12,
          }}
          numberOfLines={1}
          variant="labelSmall"
        >
          {user.school_name}
        </ThemedText>
      </View>
    </Pressable>
  );
};

const Avatar = ({ url }: { url: string }) => {
  const theme = useTheme();
  return (
    <View style={{ borderRadius: 100, overflow: "hidden" }}>
      <MaterialIcons
        style={{
          backgroundColor: theme.colors.surfaceVariant,
          borderRadius: 100,
          position: "absolute",
          padding: 2,
          bottom: 4,
          left: 4,
        }}
        size={14}
        color={theme.colors.primary}
        name="verified"
      />
    </View>
  );
};

export default UserShareCell;
