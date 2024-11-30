import { View, ViewProps } from "react-native";

type TextFieldProps = {} & ViewProps;

const TextField = ({ ...props }: TextFieldProps) => {
  return <View {...props}></View>;
};

export default TextField;
