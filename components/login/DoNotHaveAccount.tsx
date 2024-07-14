import View from "@/components/styled/View";
import { Link } from "expo-router";
import { useTheme } from "react-native-paper";
import { ViewProps } from "react-native";
import { Text } from "react-native-paper";

const DoNotHaveAccount = ({ style, ...props }: ViewProps) => {
  const theme = useTheme();
  return (
    <View style={[{ alignItems: "center" }, style]} {...props}>
      <Link href="/register">
        <Text
          style={{
            color: theme.colors.secondary,
            textDecorationLine: "underline",
            fontFamily: "Cairo",
          }}
          variant="bodyMedium"
        >
          لاتمتلك حساب في مدرستي?
        </Text>
      </Link>
    </View>
  );
};
export default DoNotHaveAccount;
