import { View as BaseView, ViewProps } from "react-native";
import { useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function View({ style, ...props }: ViewProps) {
  const { colors } = useTheme();

  return (
    <BaseView style={[{ backgroundColor: colors.surface }, style]} {...props}>
      {props.children}
    </BaseView>
  );
}

type PageContainerProps = {} & ViewProps;

export function SafeAreaView({
  children,
  style,
  ...props
}: PageContainerProps) {
  const insets = useSafeAreaInsets();

  const safeStyles = {
    paddingTop: insets.top,
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  };

  return (
    <View style={[{ flex: 1, ...safeStyles }, style]} {...props}>
      {children}
    </View>
  );
}

export function Container({ children, style, ...props }: ViewProps) {
  const { colors } = useTheme();

  return (
    <BaseView
      style={[
        {
          flex: 1,
          backgroundColor: colors.surface,
          marginStart: 16,
          marginEnd: 16,
        },
        style,
      ]}
      {...props}
    >
      {children}
    </BaseView>
  );
}
