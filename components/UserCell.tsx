import { ThemedText } from "@/components/ThemedText";
import { debugStyle, DEFAULT_CONTAINER_SPACING } from "@/constants/styels";
import { path, users } from "@/lib/routing";
import { BaseUser } from "@/types/user.types";
import SchoolName from "@features/schools/components/SchoolName";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { UserAvatarV2 } from "./UserAvatar";
import UserInfo from "./UserInfo";

type BaseUserCellProps = {
  /**
   * Cell direction, default is horizontal
   */
  direction?: "horizontal" | "vertical";
  user: BaseUser;
  ActionButton?: React.ReactNode;
};

const BaseUserCell = ({
  user,
  ActionButton,
  direction = "horizontal",
}: BaseUserCellProps) => {
  // TODO: create this component
  return (
    <Pressable
      onPress={() => path.users.goToUser(user.id)}
      style={[styles.container]}
    >
      <View style={styles.rowContainer}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          <UserInfo user={user} />
        </View>
        <View>{ActionButton}</View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: DEFAULT_CONTAINER_SPACING,
  },

  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default BaseUserCell;
