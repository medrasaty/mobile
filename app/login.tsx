import View, { Container, SafeAreaView } from "@/components/styled/View";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { Button, Text, TextInput, useTheme } from "react-native-paper";

export default function Index() {
  const theme = useTheme();
  return (
    <SafeAreaView>
      <Container>
        <View style={{ flex: 1 }}>
          <MedrasatyLogo />
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
          <CredentialsInput />
        </View>
        <View style={{ paddingBottom: 1 }}>
          <Button onPress={() => alert("solo is logging")} mode="contained">
            <Text
              style={{ color: theme.colors.onPrimary, fontFamily: "Cairo" }}
            >
              سجل الدخول
            </Text>
          </Button>
          <View style={{ alignItems: "center", margin: 8 }}>
            <Link href="/">
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
        </View>
      </Container>
    </SafeAreaView>
  );
}

const CredentialsInput = () => {
  return (
    <View style={{ gap: 12, flex: 1 }}>
      <TextInput label="البريد الالكتروني" />
      <TextInput secureTextEntry label="كلمة السر" />
    </View>
  );
};

const MedrasatyLogo = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        source={require("@/assets/images/logo_dark.png")}
        contentFit="contain"
        style={{ width: 200, height: 100 }}
      />
    </View>
  );
};
