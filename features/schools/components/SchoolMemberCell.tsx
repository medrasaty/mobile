import { ThemedText } from "@/components/ThemedText";
import UserAvatar from "@/components/UserAvatar";
import { BaseUser } from "@/types/user.types";
import { Link, useRouter } from "expo-router";
import { Pressable, Text, View, ViewProps } from "react-native";
import { Button, Surface, useTheme } from "react-native-paper";

type SchoolMemberCellProps = {
  member: BaseUser;
} & ViewProps;

const SchoolMemberCell = ({ member }: SchoolMemberCellProps) => {
  const router = useRouter();
  const theme = useTheme();
  const goToUser = () => {
    router.push(`/users/${member.username}`);
  };
  return (
    <Pressable style={{ flex: 1 }} onPress={goToUser}>
      <Surface
        style={{
          borderRadius: 19,
          margin: 7,
          padding: 10,
          backgroundColor: theme.colors.surface,
          gap: 7,
          flex: 1,
          alignItems: "center",
        }}
      >
        <UserAvatar url={member.profile_picture} size={70} />
        <ThemedText
          variant="labelMedium"
          numberOfLines={1}
          style={{ color: "red" }}
        >
          {member.short_name}
        </ThemedText>
        <ThemedText color="gray" variant="labelSmall" style={{ color: "red" }}>
          @{member.username}
        </ThemedText>
      </Surface>
    </Pressable>
  );
};

export default SchoolMemberCell;
