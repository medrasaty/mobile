import { ThemedText } from "@/components/ThemedText";
import UserAvatar from "@/components/UserAvatar";
import { BaseUser } from "@/types/user.types";
import { useRouter } from "expo-router";
import { Pressable, View, ViewProps } from "react-native";
import { useTheme, TextProps, TouchableRipple } from "react-native-paper";
import { StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import ReputationInfo from "@/components/ReputationInfo";
import { debugStyle } from "@/constants/styels";

export const MEMBER_CELL_WIDTH = 120;
export const MEMBER_CELL_HEIGHT = 135;
const DEFAULT_BORDER_RADIOUS = 12;

type SchoolMemberCellProps = {
  member: BaseUser;
} & ViewProps;

const SchoolMemberCell = ({ member }: SchoolMemberCellProps) => {
  const router = useRouter();
  const theme = useTheme();
  const goToUser = () => {
    router.push(`/users/${member.username}/detail`);
  };

  return (
    <View style={{ borderRadius: DEFAULT_BORDER_RADIOUS, overflow: "hidden" }}>
      <TouchableRipple
        rippleColor={theme.colors.primaryContainer}
        onPress={goToUser}
      >
        <View
          style={[
            styles.container,
            {
              borderColor: theme.colors.surfaceVariant,
            },
          ]}
        >
          <Avatar url={member.profile_picture} />
          <Name>{member.short_name}</Name>
          <ReputationInfo
            compact
            reputation={member.reputation}
            reach={member.reach}
            views={member.total_views}
          />
        </View>
      </TouchableRipple>
    </View>
  );
};

const Name = ({ children, ...props }: TextProps<string>) => {
  return (
    <ThemedText variant="labelLarge" numberOfLines={1} {...props}>
      {children}
    </ThemedText>
  );
};

const Avatar = ({ url }: { url: string }) => {
  const theme = useTheme();
  return (
    <View style={{ borderRadius: 100, overflow: "hidden" }}>
      <UserAvatar
        style={{ borderWidth: 3, borderColor: theme.colors.surfaceVariant }}
        url={url}
        size={50}
      />
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

const styles = StyleSheet.create({
  container: {
    borderRadius: DEFAULT_BORDER_RADIOUS,
    borderWidth: 1,
    padding: 10,
    width: MEMBER_CELL_WIDTH,
    height: MEMBER_CELL_HEIGHT,
    gap: 12,
    flex: 1,
    alignItems: "center",
  },
});

export default SchoolMemberCell;
