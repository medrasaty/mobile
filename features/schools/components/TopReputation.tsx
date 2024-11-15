import { View, ViewProps } from "react-native";
import { BaseUser } from "@/types/user.types";
import { t } from "i18next";
import TopUsers from "./TopUsers";

type TopReputationProps = { members: BaseUser[] } & ViewProps;

const TopReputation = ({ members, ...props }: TopReputationProps) => {
  return (
    <View {...props}>
      <TopUsers title={t("Top_reputation")} users={members} />
    </View>
  );
};

export default TopReputation;
