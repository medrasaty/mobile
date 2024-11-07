import Page from "@/components/Page";
import { useBlackListUsers } from "../queries";
import FullPageLoadingIndicator from "@/components/FullPageLoadingIndicator";
import NetworkError from "@/components/NetworkError";
import ScreenList from "@/components/ScreenFlatList";
import { ThemedText } from "@/components/ThemedText";
import BlackListUserCell from "../components/BlackListUserCell";

type BlackListScreenProps = {};

const BlackListScreen = ({}: BlackListScreenProps) => {
  const q = useBlackListUsers();
  return (
    <Page>
      <ScreenList
        renderItem={({ item }) => {
          return <BlackListUserCell user={item} />;
        }}
        data={q.data}
        isPending={q.isPending}
        isError={q.isError}
        onRetry={q.refetch}
      />
    </Page>
  );
};

export const BlackListUsersList = () => {
  return;
};

export default BlackListScreen;
