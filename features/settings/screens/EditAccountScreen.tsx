import CenterPage from "@/components/CenterPage";
import Page from "@/components/Page";
import { ThemedText } from "@/components/ThemedText";
import { View, ViewProps } from "react-native";

type EditAccountScreenProps = {} & ViewProps;

const EditAccountScreen = ({ ...props }: EditAccountScreenProps) => {
  return (
    <Page {...props}>
      <CenterPage>
        <ThemedText>Edit your account</ThemedText>
      </CenterPage>
    </Page>
  );
};

export default EditAccountScreen;
