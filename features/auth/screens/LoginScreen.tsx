import LoadingDialog from "@/components/LoadingDialog";
import MedrasatyLogo from "@/components/MedrasatyLogo";
import View, { Container, SafeAreaView } from "@/components/styled/View";
import { HOME_PAGE } from "@/constants/routes";
import DoNotHaveAccount from "@/features/auth/components/DoNotHaveAccount";
import LoginFailedDialog from "@/features/auth/components/LoginFailedDialog";
import { useQueryClient } from "@tanstack/react-query";
import { Redirect } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Keyboard } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useTranslation } from "react-i18next";
import useRoundedTheme from "@/hooks/useRoundedTheme";
import { useSession } from "@/hooks/useSession";
import { loginSchema } from "../types";

export default function LoginScreen() {
  const { signIn, session } = useSession();
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const theme = useRoundedTheme();

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [hiddenPassword, setHiddenPassword] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
    defaultValues: { email: "", password: "" },
  });

  // Redirect to home page if already logged in.
  if (session !== null) return <Redirect href={HOME_PAGE} />;

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    try {
      Keyboard.dismiss();
      const sessionData = await signIn(data);
      queryClient.setQueryData(["profile"], sessionData.user);
    } catch (error: any) {
      setErrorMessage(error.message || "حدث خطأ أثناء تسجيل الدخول");
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
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  label={t("auth.email_label", "البريد الإلكتروني")}
                  mode="outlined"
                  theme={theme}
                  error={!!errors.email}
                />
              )}
            />
            {errors.email && (
              <Text style={{ color: "red", marginBottom: 4 }}>
                {t(`auth.${errors.email.type}`, errors.email.message as string)}
              </Text>
            )}
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  autoCapitalize="none"
                  secureTextEntry={hiddenPassword}
                  label={t("auth.password_label", "كلمة السر")}
                  mode="outlined"
                  theme={theme}
                  error={!!errors.password}
                  right={
                    <TextInput.Icon
                      onPress={() => setHiddenPassword(!hiddenPassword)}
                      icon={hiddenPassword ? "eye" : "eye-off"}
                    />
                  }
                />
              )}
            />
            {errors.password && (
              <Text style={{ color: "red", marginBottom: 4 }}>
                {t(
                  `auth.${errors.password.type}`,
                  errors.password.message as string
                )}
              </Text>
            )}
          </View>
          {/* end TextInputs */}
        </View>

        <View style={{ paddingBottom: 1 }}>
          <Button
            disabled={isSubmitting}
            onPress={handleSubmit(onSubmit)}
            mode="contained"
          >
            <Text
              style={{ color: theme.colors.onPrimary, fontFamily: "Cairo" }}
            >
              {t("auth.login_title", "تسجيل الدخول")}
            </Text>
          </Button>
          <DoNotHaveAccount style={{ margin: 8 }} />
        </View>
        <LoginFailedDialog
          visible={errorMessage !== ""}
          errorMessage={errorMessage}
          hideDialog={() => setErrorMessage("")}
        />
        <LoadingDialog
          visible={isSubmitting}
          message={t("auth.login_in_progress", "جاري التحقق من البيانات ...")}
        />
      </Container>
    </SafeAreaView>
  );
}
