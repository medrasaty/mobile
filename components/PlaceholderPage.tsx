import { View, ViewProps } from "react-native";
import Page from "./Page";
import CenterPage from "./CenterPage";
import { ThemedText } from "./ThemedText";
import { useRouter } from "expo-router";
import { TextProps } from "react-native-paper";

type PlaceholderPageProps = {
  title?: string;
  titleVariant?: TextProps<any>["variant"];
} & ViewProps;

const PlaceholderPage = ({
  title = "TODO",
  titleVariant = "displaySmall",
  ...props
}: PlaceholderPageProps) => {
  const router = useRouter();
  return (
    <Page>
      <CenterPage>
        <ThemedText onPress={router.back} variant={titleVariant}>
          {title}
        </ThemedText>
      </CenterPage>
    </Page>
  );
};

export default PlaceholderPage;
