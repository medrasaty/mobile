import View, { ContainerView } from "@/components/styled/View";
import { ViewProps } from "react-native";

type PageProps = ViewProps & {
  container?: boolean;
};

const Page = ({ container = false, style, children, ...rest }: PageProps) => {
  const Wrapper = container ? ContainerView : View;
  return (
    <Wrapper {...rest} style={[{ flex: 1 }, style]}>
      {children}
    </Wrapper>
  );
};

export default Page;
