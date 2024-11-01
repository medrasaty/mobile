import View, { Container, SafeAreaView } from "@/components/styled/View";
import { ViewProps } from "react-native";

type PageProps = {
  container?: boolean;
} & ViewProps;

const Page = ({ container = false, ...props }: PageProps) => {
  if (container) {
    return (
      <Container {...props} style={[{ flex: 1 }, props.style]}>
        {props.children}
      </Container>
    );
  }

  return (
    <View {...props} style={[{ flex: 1 }, props.style]}>
      {props.children}
    </View>
  );
};

export default Page;
