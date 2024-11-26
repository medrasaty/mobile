import { View, ViewProps } from "react-native";

type MainSearchBarProps = {} & ViewProps;

const MainSearchBar = ({ ...props }: MainSearchBarProps) => {
  return <View {...props}></View>;
};

export default MainSearchBar;
