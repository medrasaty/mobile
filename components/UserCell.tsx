import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { BaseUser } from "@/types/user.types";
import React from "react";

type UserCellProps = {
  direction: "horizontal" | "vertical";
  user: BaseUser;
  ActionButton: React.ReactNode;
};

const UserCell = ({}: UserCellProps) => {
  // TODO: create this component
  return <ThemedText>UserCell</ThemedText>;
};

export default UserCell;
