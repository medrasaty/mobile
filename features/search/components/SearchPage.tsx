import Page from "@components/Page";
import { UseQueryResult } from "@tanstack/react-query";
import React from "react";
import { View, ViewProps } from "react-native";

type SearchPageProps = {
  emptyComponent?: React.ReactNode;
  status: UseQueryResult["status"];
} & ViewProps;

const SearchPage = ({ ...props }: SearchPageProps) => {
  return <Page {...props}></Page>;
};

export default SearchPage;
