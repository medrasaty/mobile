import { useSession } from "@/auth/ctx";
import View, { Container, SafeAreaView } from "@/components/styled/View";
import { Text, TextInput, useTheme } from "react-native-paper";
import { useState } from "react";
import MedrasatyLogo from "@/components/login/MedrasatyLogo";
import DoNotHaveAccount from "@/components/login/DoNotHaveAccount";
import LoginButton from "@/components/login/LoginButton";
import LoginFailedDialog from "@/components/login/LoginFailedDialog";
import LoadingDialog from "@/components/LoadingDialog";
import { useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";

export default function Index() {
  const { signIn } = useSession();
  const queryClient = useQueryClient();

  const [username, setUsername] = useState<string | undefined>(undefined);
  const [password, setPassword] = useState<string | undefined>(undefined);

  const [isSending, setIsSending] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  function handleLogin() {
    if (username && password && isSending === false) {
      setIsSending(true);

      signIn({ username, password })
        .then((user) => {
          queryClient.setQueryData(["profile"], user);
          router.replace("/home/");
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
            تسجيل الدخول
          </Text>

          {/* TextInputs */}
          <View style={{ gap: 12, flex: 1 }}>
            <TextInput
              value={username}
              onChangeText={(text) => setUsername(text)}
              label="اسم المستخدم"
              mode="outlined"
            />
            <TextInput
              mode="outlined"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry
              label="كلمة السر"
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
