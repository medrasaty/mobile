import { BaseUser } from "@/types/user.types";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewProps,
} from "react-native";
import SchoolMemberCell from "./SchoolMemberCell";
import { Button } from "react-native-paper";
import {
  DEFAULT_CONTAINER_SPACING,
  containerMargins,
} from "@/constants/styels";
import { ThemedText } from "@/components/ThemedText";
import { useTransition } from "react";
import { useTranslation } from "react-i18next";
import { Divider } from "react-native-paper";
import SmallButton from "@/components/SmallButton";

type TopUsersProps = {
  title: string;
  users: BaseUser[];
} & ViewProps;

const TopUsers = ({ title, users, style, ...props }: TopUsersProps) => {
  const { t } = useTranslation();
  return (
    <View style={[style, styles.container]} {...props}>
      <View style={[containerMargins]}>
        <ThemedText variant="titleLarge">{title}</ThemedText>
      </View>
      <FlatList
        horizontal
        renderItem={({ item }) => <SchoolMemberCell member={item} />}
        contentContainerStyle={styles.usersContainer}
        showsHorizontalScrollIndicator={false}
        data={users}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
  usersContainer: {
    gap: 10,
    paddingRight: DEFAULT_CONTAINER_SPACING,
    paddingLeft: DEFAULT_CONTAINER_SPACING,
  },
});

export default TopUsers;
