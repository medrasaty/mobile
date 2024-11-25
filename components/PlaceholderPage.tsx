import { View, ViewProps } from "react-native";
import Page from "./Page";
import CenterPage from "./CenterPage";
import { ThemedText } from "./ThemedText";

type PlaceholderPageProps = { title?: string } & ViewProps;

const PlaceholderPage = ({
  title = "TODO",
  ...props
}: PlaceholderPageProps) => {
  return (
    <Page>
      <CenterPage>
        <ThemedText variant="displayMedium">{title}</ThemedText>
      </CenterPage>
    </Page>
  );
};

export default PlaceholderPage;
