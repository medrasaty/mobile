import { ThemedText } from "@/components/ThemedText";
import React from "react";
import { View, ViewProps } from "react-native";

type WithConditionProps = {
  condition: boolean;
} & React.PropsWithChildren;

const WithCondition = ({ condition, ...props }: WithConditionProps) => {
  if (!condition) {
    return null;
  }
  return props.children;
};

export default WithCondition;
