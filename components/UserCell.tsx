import { ThemedText } from "@/components/ThemedText";
import { BaseUser } from "@/types/user.types";
import React from "react";
import { Pressable, View, StyleSheet } from "react-native";
import { UserAvatarV2 } from "./UserAvatar";
import SchoolName from "@features/schools/components/SchoolName";
import { DEFAULT_CONTAINER_SPACING } from "@/constants/styels";
import { router } from "expo-router";
import { users } from "@/lib/routing";

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
    <View style={[styles.container]}>
      <View style={styles.rowContainer}>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
          {/* Avatar section */}
          <UserAvatarV2 user={user} size={60} />

          {/* User info section */}
          <Pressable
            onPress={() => router.push(users.details(user.username))}
            style={{ gap: 5 }}
          >
            <ThemedText>{user.short_name}</ThemedText>
            <SchoolName iconSize={10} name={user.school_name} />
          </Pressable>
        </View>

        <View>{ActionButton}</View>
      </View>
    </View>
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
