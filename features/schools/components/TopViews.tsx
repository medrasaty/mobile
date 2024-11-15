import { View, ViewProps } from "react-native";
import TopUsers from "./TopUsers";
import { BaseUser } from "@/types/user.types";
import { t } from "i18next";

type TopViewsProps = {
  users: BaseUser[];
} & ViewProps;

const TopViews = ({ users, ...props }: TopViewsProps) => {
  return (
    <View {...props}>
      <TopUsers users={users} title={t("Top_views")} />
    </View>
  );
};

export default TopViews;
