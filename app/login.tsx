import LoadingDialog from "@/components/LoadingDialog";
import MedrasatyLogo from "@/components/MedrasatyLogo";
import View, { Container, SafeAreaView } from "@/components/styled/View";
import { HOME_PAGE } from "@/constants/routes";
import DoNotHaveAccount from "@/features/auth/components/DoNotHaveAccount";
import LoginButton from "@/features/auth/components/LoginButton";
import LoginFailedDialog from "@/features/auth/components/LoginFailedDialog";
import { Session } from "@/features/auth/ctx";
import { useQueryClient } from "@tanstack/react-query";
import { Redirect } from "expo-router";
import { useState } from "react";
import { Keyboard } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { useTranslation } from "react-i18next";
import useRoundedTheme from "@/hooks/useRoundedTheme";
import { useSession } from "@/hooks/useSession";

export default function LoginPage() {
  const { signIn, session } = useSession();
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const theme = useRoundedTheme();

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [hiddentPassword, setHiddentPassword] = useState(true);

  // Redirect to home page if already logged in.
  if (session !== null) return <Redirect href={HOME_PAGE} />;

  function handleLogin() {
    if (username && password && isSending === false) {
      setIsSending(true);
      // Remove keyboard from screen
      Keyboard.dismiss();

      signIn({ username, password })
        .then((session: Session) => {
          queryClient.setQueryData(["profile"], session.user);
        })
        .catch((error: Error) => {
          setErrorMessage(error.message);
        })
        .finally(() => setIsSending(false));
    }
  }

  return (
    <SafeAreaView>
      <Container>
        <View style={{ flex: 1 }}>
          <MedrasatyLogo
            style={{
              flex: 0.7,
              alignItems: "center",
              justifyContent: "center",
            }}
          />
          <Text
            style={{
              marginBottom: 14,
              textAlign: "center",
              fontFamily: "Cairo",
            }}
            variant="headlineMedium"
          >
            {t("login")}
          </Text>

          {/* TextInputs */}
          <View style={{ gap: 12, flex: 1 }}>
            <TextInput
              value={username}
              keyboardType="email-address"
              onChangeText={(text) => setUsername(text)}
              label="البريد الإلكتروني"
              mode="outlined"
              theme={theme}
            />
            <TextInput
              mode="outlined"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={hiddentPassword}
              label="كلمة السر"
              theme={theme}
              right={
                <TextInput.Icon
                  onPress={() => setHiddentPassword(!hiddentPassword)}
                  icon={hiddentPassword ? "eye" : "eye-off"}
                />
              }
            />
          </View>
          {/* end TextInputs */}
        </View>

        <View style={{ paddingBottom: 1 }}>
          <LoginButton onPress={handleLogin} />
          <DoNotHaveAccount style={{ margin: 8 }} />
        </View>
        <LoginFailedDialog
          visible={errorMessage !== ""}
          errorMessage={errorMessage}
          hideDialog={() => setErrorMessage("")}
        />
        <LoadingDialog
          visible={isSending}
          message="جاري التحقق من البيانات ... "
        />
      </Container>
    </SafeAreaView>
  );
}
