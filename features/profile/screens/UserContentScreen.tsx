import CenterPage from "@/components/CenterPage";
import Page from "@/components/Page";
import { ThemedText } from "@/components/ThemedText";
import { useRouter } from "expo-router";
import { View, ViewProps } from "react-native";

type UserContentScreenProps = {} & ViewProps;

const UserContentScreen = ({ ...props }: UserContentScreenProps) => {
  const router = useRouter();
  return (
    <Page {...props}>
      <CenterPage>
        <ThemedText onPress={router.back} variant="displaySmall">
          Content
        </ThemedText>
      </CenterPage>
    </Page>
  );
};

export default UserContentScreen;
