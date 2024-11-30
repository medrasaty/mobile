import { View, ViewProps } from "react-native";
import Page from "./Page";
import CenterPage from "./CenterPage";
import { ThemedText } from "./ThemedText";
import { useRouter } from "expo-router";

type PlaceholderPageProps = { title?: string } & ViewProps;

const PlaceholderPage = ({
  title = "TODO",
  ...props
}: PlaceholderPageProps) => {
  const router = useRouter();
  return (
    <Page>
      <CenterPage>
        <ThemedText onPress={router.back} variant="displayMedium">
          {title}
        </ThemedText>
      </CenterPage>
    </Page>
  );
};

export default PlaceholderPage;
