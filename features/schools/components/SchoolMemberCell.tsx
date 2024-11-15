import { ThemedText } from "@/components/ThemedText";
import UserAvatar from "@/components/UserAvatar";
import { BaseUser } from "@/types/user.types";
import { useRouter } from "expo-router";
import { Pressable, View, ViewProps } from "react-native";
import { useTheme, TextProps, Icon } from "react-native-paper";
import { StyleSheet } from "react-native";
import SmallButton from "@/components/SmallButton";
import { MaterialIcons } from "@expo/vector-icons";
import { t } from "i18next";
import WithCondition from "@/components/WithCondition";

export const MEMBER_CELL_WIDTH = 120;

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
    <Pressable onPress={goToUser}>
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
        <WithCondition condition={false}>
          <View style={{ marginTop: 6 }}>
            <SmallButton onPress={goToUser} mode="ripple">
              {t("view_user")}
            </SmallButton>
          </View>
        </WithCondition>
      </View>
    </Pressable>
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
    borderRadius: 12,
    borderWidth: 1,
    padding: 10,
    width: MEMBER_CELL_WIDTH,
    gap: 10,
    flex: 1,
    alignItems: "center",
  },
});

export default SchoolMemberCell;
