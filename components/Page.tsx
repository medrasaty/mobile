import View, { Container } from "@/components/styled/View";
import { ViewProps } from "react-native";

type PageProps = ViewProps & {
  container?: boolean;
};

const Page = ({ container = false, style, children, ...rest }: PageProps) => {
  const Wrapper = container ? Container : View;
  return (
    <Wrapper {...rest} style={[{ flex: 1 }, style]}>
      {children}
    </Wrapper>
  );
};

export default Page;
