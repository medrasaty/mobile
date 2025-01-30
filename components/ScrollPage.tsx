import View, { Container, SafeAreaView } from "@/components/styled/View";
import { debugStyle } from "@/constants/styels";
import { ScrollView, ScrollViewProps, ViewProps } from "react-native";

type ScrollPageProps = {
  container?: boolean;
} & ScrollViewProps;

const ScrollPage = ({ container = false, ...props }: ScrollPageProps) => {
  return <ScrollView {...props}>{props.children}</ScrollView>;
};

export default ScrollPage;
