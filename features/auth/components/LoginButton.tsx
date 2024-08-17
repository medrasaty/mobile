import { Button, Text, useTheme } from "react-native-paper";

const LoginButton = ({
  onPress,
  disabled = false,
}: {
  onPress: () => void;
  disabled?: boolean;
}) => {
  const theme = useTheme();
  return (
    <Button disabled={disabled} onPress={onPress} mode="contained">
      <Text style={{ color: theme.colors.onPrimary, fontFamily: "Cairo" }}>
        سجل الدخول
      </Text>
    </Button>
  );
};

export default LoginButton;
