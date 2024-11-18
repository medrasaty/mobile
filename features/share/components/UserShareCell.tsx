import { ThemedText } from "@/components/ThemedText";
import { UserAvatarV2 } from "@/components/UserAvatar";
import { FriendUser } from "@/features/friendship/types";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Pressable, PressableProps, View } from "react-native";
import { useTheme } from "react-native-paper";
import { useMemo } from "react";
import { useShareStore } from "../store";

type UserShareCellProps = {
  user: FriendUser;
} & PressableProps;

const UserShareCell = ({ user, style, ...props }: UserShareCellProps) => {
  const theme = useTheme();

  const { selectedUsers, addUser, removeUser } = useShareStore();

  const isSelected = useMemo(
    () => (selectedUsers.find((u) => u.id === user.id) ? true : false),
    [selectedUsers]
  );

  const handlePress = () => {
    isSelected ? removeUser(user) : addUser(user);
  };

  return (
    <Pressable
      onPress={handlePress}
      style={{ opacity: isSelected ? 1 : 0.5, flex: 1, alignItems: "center" }}
      {...props}
    >
      <UserAvatarV2
        borderColor={isSelected ? theme.colors.primaryContainer : undefined}
        user={user}
        size={70}
      />
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

export default UserShareCell;
