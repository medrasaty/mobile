import { t } from "i18next";
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
        {t("login")}
      </Text>
    </Button>
  );
};

export default LoginButton;
