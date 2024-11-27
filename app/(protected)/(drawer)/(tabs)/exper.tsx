import CenterPage from "@components/CenterPage";
import Page from "@components/Page";
import { ThemedText } from "@components/ThemedText";
import { t } from "i18next";
import { View, ViewProps, Text } from "react-native";
import { Divider, Text as PText, useTheme } from "react-native-paper";

const Exper = () => {
  const theme = useTheme();
  return (
    <Page>
      <CenterPage>
        <Text
          style={{ color: theme.colors.onSurface, fontFamily: "Cairo" }}
        ></Text>
        <Text
          style={{
            color: theme.colors.onSurface,
            fontFamily: "NotoSansArabic",
          }}
        >
          {"رياكت نيتفلالا noto"}
        </Text>
        <Divider />
      </CenterPage>
    </Page>
  );
};
