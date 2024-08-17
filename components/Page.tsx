import View, { Container } from "@/components/styled/View";
import { ViewProps } from "react-native";

const Page = ({
  container = false,
  ...props
}: ViewProps & { container?: boolean }) => {
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
