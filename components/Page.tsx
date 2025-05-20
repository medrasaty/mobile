import View, { ContainerView } from "@/components/styled/View";
import { ViewProps } from "react-native";
import { useTheme } from "react-native-paper";

type PageProps = ViewProps & {
  container?: boolean;
};

const Page = ({ container = false, style, children, ...rest }: PageProps) => {
  const Wrapper = container ? ContainerView : View;
  const theme = useTheme();
  return (
    <Wrapper
      {...rest}
      style={[styles.page, { backgroundColor: theme.colors.surface }, style]}
    >
      {children}
    </Wrapper>
  );
};

import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
});

export default Page;
