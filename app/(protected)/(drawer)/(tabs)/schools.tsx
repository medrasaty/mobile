import MainSchoolScreen from "@/features/schools/screens/MainSchoolScreen";
import PlaceholderPage from "@components/PlaceholderPage";
import { useSettingStore } from "@features/settings/store";
import * as Local from "expo-localization";

const SchoolsPage = () => {
  return (
    <PlaceholderPage
      titleVariant="labelSmall"
      title={JSON.stringify(Local.getLocales())}
    />
  );
};

export default SchoolsPage;
