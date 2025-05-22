import View, { ContainerView } from "@/components/styled/View";
import { StatusBar, ViewProps } from "react-native";
import { useTheme } from "react-native-paper";

type PageProps = ViewProps & {
  container?: boolean;
  statusBar?: boolean;
};

const Page = ({ container = false, style, children, statusBar = false, ...rest }: PageProps) => {
  const Wrapper = container ? ContainerView : View;
  const statusBarHeight = StatusBar.currentHeight;
  const theme = useTheme();
  return (
    <Wrapper
      {...rest}
      style={[styles.page, { backgroundColor: theme.colors.surface, padding: statusBar ? statusBarHeight : 0 }, style]}
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
