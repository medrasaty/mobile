import Page from "./Page";
import { ActivityIndicator, useTheme } from "react-native-paper";

export default function FullPageLoadingIndicator() {
  return (
    <Page style={{ justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator color="gray" size={"large"} />
    </Page>
  );
}
